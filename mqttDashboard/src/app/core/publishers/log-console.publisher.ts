import { Observable, of } from "rxjs";
import { LogEntryModel } from "../models/logger/log-entry.model";
import { AbstractLogPublisher } from "./abstract-log.publisher";

export class LogConsolePublisher extends AbstractLogPublisher {
    log(entry: LogEntryModel): Observable<boolean> {
        console.log(entry.buildLogString());
        return of(true);
    }
    clear(): Observable<boolean> {
        console.clear();
        return of(true);
    }
}