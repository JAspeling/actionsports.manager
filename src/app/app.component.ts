import { ChangeDetectorRef, Component } from '@angular/core';
import { ApplicationStateService } from "./services/application-state.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent {
    isMobile: boolean = false;

    constructor(private readonly cdr: ChangeDetectorRef, private readonly appState: ApplicationStateService) {
        appState.isMobileView$.subscribe((isMobile) => {
            this.isMobile = isMobile
        });
    }
}
