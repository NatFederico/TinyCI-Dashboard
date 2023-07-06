
import { Injectable } from '@angular/core';
import { AbstractLogPublisher } from '../publishers/abstract-log.publisher';
import { LogConsolePublisher } from '../publishers/log-console.publisher';

@Injectable({
    providedIn: 'root'
})
export class LogPublishersService {
    constructor() {
        // Build publishers arrays
        this.buildPublishers();
    }
    
    // Public properties
    publishers: AbstractLogPublisher[] = [];
    
    // Build publishers array
    buildPublishers(): void {
        // Create instance of LogConsole Class
        this.publishers.push(new LogConsolePublisher());
    }
}
