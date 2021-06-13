import { AfterContentInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Player } from "./models/player";
import { Props } from "./models/prop";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, AfterContentInit {

    players: Props = [
        new Player({ source: 'assets/svg/receiver.svg' }),
        new Player({ source: 'assets/svg/sweeper_left.svg' }),
        new Player({ source: 'assets/svg/sweeper_right.svg' }),
        new Player({ source: 'assets/svg/cover.svg' }),
        new Player({ source: 'assets/svg/legside.svg' }),
        new Player({ source: 'assets/svg/point.svg' }),
        new Player({ source: 'assets/svg/keeper.svg' }),
        new Player({ source: 'assets/svg/bowler.svg' }),
        new Player({ source: 'assets/svg/batsman1.svg' }),
        new Player({ source: 'assets/svg/batsman2.svg' }),
        // new Prop({source: 'assets/images/keeper.png'}),
        // new Prop({source: 'assets/images/keeper.png'}),
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
