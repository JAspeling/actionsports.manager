import { AfterContentInit, ChangeDetectorRef, Component, OnInit, QueryList, ViewChildren } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, AfterContentInit {

    players: string[] = [
        'assets/images/keeper.png',
        'assets/images/batsman1.png',
        'assets/images/batsman2.png',
        'assets/images/bowler.png',
        'assets/images/cover.png',
        'assets/images/legside.png',
        'assets/images/point.png',
        'assets/images/receiver.png',
        'assets/images/sweeper_left.png',
        'assets/images/sweeper_right.png',
    ]

    constructor(private readonly cdr: ChangeDetectorRef) {
    }

    public ngOnInit(): void {
        this.cdr.detectChanges()

    }

    ngAfterViewInit(): void {
        this.cdr.detectChanges()
    }

    ngAfterContentInit(): void {
        this.cdr.detectChanges()
    }

    calculateWidth(field: HTMLImageElement): number {
        return field.offsetWidth / 8;
    }
}
