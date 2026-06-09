import { Service } from '@angular/core';

@Service()
export class ConfigService {

    get apiUrl(): string {
        return window.env.apiUrl;
    }
    
}
