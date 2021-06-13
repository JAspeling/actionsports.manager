import {
    AfterContentInit,
    ChangeDetectorRef,
    Component,
    ElementRef,
    OnInit,
    ViewChild,
    ViewChildren
} from '@angular/core';
import { Player } from "./models/player";
import { Prop, Props } from "./models/prop";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, AfterContentInit {

    @ViewChild('field') field: ElementRef<HTMLImageElement>;
    fieldPos: { x: number, y: number, height: number } = { x: 0, y: 0, height: 0 };

    players: Props = [
        // new Prop({source: 'assets/images/keeper.png'}),
        // new Prop({source: 'assets/images/keeper.png'}),
    ]

    constructor(private readonly cdr: ChangeDetectorRef) {
    }

    public ngOnInit(): void {
        this.cdr.detectChanges()

    }

    ngAfterViewInit(): void {
        this.cdr.detectChanges();

        const fieldRect = this.field.nativeElement.getBoundingClientRect();
        console.log('Field Rect', fieldRect);
    }

    ngAfterContentInit(): void {
        this.cdr.detectChanges();
    }

    calculateWidth(field: HTMLImageElement): number {
        return field.offsetWidth / 8;
    }

    log(event): void {
        // console.log(event);
        const target = event.source.element.nativeElement;
        const rect = target.getBoundingClientRect();
        console.log(`${rect.left}, ${rect.top}`);
    }

    fieldLoaded(event: Event) {
        const img = event.composedPath()[0] as HTMLImageElement;

        this.fieldPos.x = img.x;
        this.fieldPos.y = img.y;
        this.fieldPos.height = img.height;

        this.players = [
            new Player({ source: 'assets/svg/receiver.svg', baseHeight: 276 }),
            new Player({ source: 'assets/svg/sweeper_left.svg', baseHeight: 276 }),
            new Player({ source: 'assets/svg/sweeper_right.svg', baseHeight: 306 }),
            new Player({ source: 'assets/svg/cover.svg', baseHeight: 216 }),
            new Player({ source: 'assets/svg/legside.svg', baseHeight: 200 }),
            new Player({ source: 'assets/svg/point.svg', baseHeight: 211 }),
            new Player({ source: 'assets/svg/keeper.svg', baseHeight: 221 }),
            new Player({ source: 'assets/svg/bowler.svg', baseHeight: 395 }),
            new Player({ source: 'assets/svg/batsman1.svg', baseHeight: 304 }),
            new Player({ source: 'assets/svg/batsman2.svg', baseHeight: 304 }),
        ]

        console.log(`Image loaded`, this.fieldPos);
    }

    playerLoaded(event: Event, player: Prop): void {
        const img = event.currentTarget as HTMLImageElement;
        img.height = player.getInitialHeight(this.fieldPos.height);

        console.log(img.height);
    }
}
