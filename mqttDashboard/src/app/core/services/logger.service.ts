import {Injectable} from "@angular/core";
import {environment} from "src/environments/environment";
import {LogEntryModel, LogLevel} from "../models/logger/log-entry.model";
import {AbstractLogPublisher} from "../publishers/abstract-log.publisher";
import {LogPublishersService} from "./log-publishers.service";

@Injectable({
    providedIn: 'root'
})
export class LoggerService {
    publishers: AbstractLogPublisher[];
    level: LogLevel = environment.loggerLevel;

    constructor(private publishersService: LogPublishersService) {
        // Set publishers
        this.publishers = this.publishersService.publishers;
    }

    debug(msg: string, ...optionalParams: any[]) {
        this.writeToLog(msg, LogLevel.Debug, optionalParams);
    }

    info(msg: string, ...optionalParams: any[]) {
        this.writeToLog(msg, LogLevel.Info, optionalParams);
    }

    warn(msg: string, ...optionalParams: any[]) {
        this.writeToLog(msg, LogLevel.Warn, optionalParams);
    }

    error(msg: string, ...optionalParams: any[]) {
        this.writeToLog(msg, LogLevel.Error, optionalParams);
    }

    fatal(msg: string, ...optionalParams: any[]) {
        this.writeToLog(msg, LogLevel.Fatal, optionalParams);
    }

    log(msg: string, ...optionalParams: any[]) {
        this.writeToLog(msg, LogLevel.All, optionalParams);
    }

    setLevel(level: LogLevel) {
        this.level = level;
    }

    private writeToLog(msg: string, level: LogLevel, params: any[]) {
        if (this.shouldLog(level)) {
            let entry: LogEntryModel = new LogEntryModel();
            entry.message = msg;
            entry.level = level;
            entry.extraInfo = params;
            for (let logger of this.publishers) {
                logger.log(entry).subscribe();
            }
        }
    }

    private shouldLog(level: LogLevel): boolean {
        let ret: boolean = false;
        if ((level >= this.level && level !== LogLevel.Off) || this.level === LogLevel.All) {
            ret = true;
        }
        return ret;
    }
}
