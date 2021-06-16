import { HostListener, Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ApplicationStateService {

    isMobileView$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    // @HostListener('window:resize', [ '$event' ])
    // onResize(event): void {
    //     this.checkSize();
    // }

    constructor() {
        window.addEventListener('resize', (event) => {
            this.checkSize();
        })
    }

    public isMobileView(): boolean {
        return this.isMobileView$.getValue();
    }

    private checkSize(): void {
        if (window.innerWidth < 768) {
            this.isMobileView$.next(true);
        } else {
            this.isMobileView$.next(false);
        }
    }
}
