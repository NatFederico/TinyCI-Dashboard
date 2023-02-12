
export class LogEntryModel implements ILogEntry { 
    constructor() { 
        this.entryDate = new Date(); 
        this.message = ''; 
        this.level = LogLevel.Debug; 
        this.extraInfo = []; } 
        
    entryDate: Date;
    message: string;
    level: LogLevel;
    extraInfo: any[];
       
    buildLogString(): string { 
        let ret: string = ""; 
        ret += "[" + LogLevel[this.level] + "]"; ret += " " + this.message;
         if (this.extraInfo.length) { 
             ret += " <" + this.formatParams(this.extraInfo) + ">"; 
        } return ret;
    }

    private formatParams(params: any[]): string {
         let ret: string = params.join(","); 
         // Is there at least one object in the array? 
         if (params.some(p => typeof p == "object")) { 
             ret = ""; 
            // Build comma-delimited string 
            for (let item of params) { ret += JSON.stringify(item) + ","; } 
        }
    return ret; }
}

export enum LogLevel {
    All = 0,
    Debug = 1,
    Info = 2,
    Warn = 3,
    Error = 4,
    Fatal = 5,
    Off = 6
}

export interface ILogEntry {
    entryDate: Date ;
    message: string;
    level: LogLevel;
    extraInfo: any[];
    buildLogString(): string;
}