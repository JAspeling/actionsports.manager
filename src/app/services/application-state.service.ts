import { HostListener, Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ApplicationStateService {

    isMobileView$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    constructor() {
        this.confirmUserAgent();
    }

    public isMobileView(): boolean {
        return this.isMobileView$.getValue();
    }

    private confirmUserAgent() {
        $(document).ready(() => {
            const userAgent = navigator.userAgent;

            if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(userAgent)) {
                this.isMobileView$.next(true);
            } else {
                this.isMobileView$.next(true);
            }
        });
    }
}
