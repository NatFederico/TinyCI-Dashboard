import {Observable} from 'rxjs';
import {LogEntryModel} from '../models/logger/log-entry.model';

export abstract class AbstractLogPublisher {
    location: string;

    abstract log(entry: LogEntryModel): Observable<boolean>

    abstract clear(): Observable<boolean>;
}
