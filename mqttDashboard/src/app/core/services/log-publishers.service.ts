import {Injectable} from '@angular/core';
import {AbstractLogPublisher} from '../publishers/abstract-log.publisher';
import {LogConsolePublisher} from '../publishers/log-console.publisher';

@Injectable({
    providedIn: 'root'
})
export class LogPublishersService {
    // Public properties
    publishers: AbstractLogPublisher[] = [];

    constructor() {
        // Build publishers arrays
        this.buildPublishers();
    }

    // Build publishers array
    buildPublishers(): void {
        // Create instance of LogConsole Class
        this.publishers.push(new LogConsolePublisher());
    }
}
