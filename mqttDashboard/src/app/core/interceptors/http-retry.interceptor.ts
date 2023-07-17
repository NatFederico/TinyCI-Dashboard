import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable, throwError, timer} from "rxjs";
import {mergeMap, retryWhen} from "rxjs/operators";

@Injectable()
export class HttpRetryInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const {shouldRetry} = this;
        return next.handle(request)
            .pipe(
                retryWhen(genericRetryStrategy({shouldRetry}))
            );
    }

    private shouldRetry = (error) => error.status === 502;
}

export interface RetryParams {
    maxAttempts?: number;
    scalingDuration?: number;
    shouldRetry?: ({status: number}) => boolean;
}

const defaultParams: RetryParams = {
    maxAttempts: 3,
    scalingDuration: 1000,
    shouldRetry: ({status}) => status >= 400
}

export const genericRetryStrategy = (params: RetryParams = {}) => (attempts: Observable<any>) => attempts.pipe(
    mergeMap((error, i) => {
        const {maxAttempts, scalingDuration, shouldRetry} = {...defaultParams, ...params}
        const retryAttempt = i + 1;
        // if maximum number of retries have been met
        // or response is a status code we don't wish to retry, throw error
        if (retryAttempt > maxAttempts || !shouldRetry(error)) {
            return throwError(error);
        }
        // retry after 1s, 2s, etc...
        return timer(retryAttempt * scalingDuration);
    })
);
