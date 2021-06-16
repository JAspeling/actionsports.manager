import { ChangeDetectorRef, Component } from '@angular/core';
import { ApplicationStateService } from "./services/application-state.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent {
    isMobile: boolean = false;

    constructor(private readonly appState: ApplicationStateService) {
        appState.isMobileView$.subscribe((isMobile) => {
            console.log('Is Mobile', isMobile);
            this.isMobile = isMobile
        });
    }
}
