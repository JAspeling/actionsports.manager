import {
    AfterContentInit,
    ChangeDetectorRef,
    Component,
    ElementRef, HostListener,
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
export class AppComponent {

    @ViewChild('field') field: ElementRef<HTMLImageElement>;
    fieldDimensions: { x: number, y: number, height: number, width: number } = { x: 0, y: 0, height: 0, width: 0 };

    props: Props = []

    constructor(private readonly cdr: ChangeDetectorRef) {
    }

    @HostListener('window:resize', [ '$event' ])
    onResize(event): void {
        // TODO: Still a bug here where the players dont resize correctly
        this.props.forEach(player => this.setInitialPosition(player));
    }

    dragMove(event, prop: Prop): void {
        const target = event.source.element.nativeElement as HTMLImageElement;

        this.determineRatioHeight(prop);
    }

    fieldLoaded(event: Event) {
        const img = event.composedPath()[0] as HTMLImageElement;

        this.fieldDimensions.x = img.x;
        this.fieldDimensions.y = img.y;
        this.fieldDimensions.height = img.height;
        this.fieldDimensions.width = img.width;

        // initialize the players, now that we know the size of the field.
        this.props = [
            new Player({ source: 'assets/svg/receiver.svg', baseHeight: 276, initial: { x: 38, y: 20 } }),
            new Player({ source: 'assets/svg/sweeper_left.svg', baseHeight: 276, initial: { x: 61, y: 26 } }),
            new Player({ source: 'assets/svg/sweeper_right.svg', baseHeight: 306, initial: { x: 34, y: 29 } }),
            new Player({ source: 'assets/svg/cover.svg', baseHeight: 216, initial: { x: 65, y: 46 } }),
            new Player({ source: 'assets/svg/legside.svg', baseHeight: 200, initial: { x: 21, y: 57 } }),
            new Player({ source: 'assets/svg/point.svg', baseHeight: 211, initial: { x: 68, y: 61 } }),
            new Player({ source: 'assets/svg/keeper.svg', baseHeight: 221, initial: { x: 50, y: 68 } }),
            new Player({ source: 'assets/svg/bowler.svg', baseHeight: 395, initial: { x: 51, y: 20 } }),
            new Player({ source: 'assets/svg/batsman1.svg', baseHeight: 304, initial: { x: 44, y: 57 } }),
            new Player({ source: 'assets/svg/batsman2.svg', baseHeight: 304, initial: { x: 28, y: 39 } }),
            new Prop({ source: 'assets/svg/stumps.svg', baseHeight: 150, initial: { x: 47, y: 68 } }),
            new Prop({ source: 'assets/svg/stumps.svg', baseHeight: 150, initial: { x: 49, y: 28 } }),
        ]
    }

    playerLoaded(event: Event, player: Prop): void {
        player.actualHeight = player.getInitialHeight(this.fieldDimensions.height);
        player.element = event.target as HTMLImageElement;
        this.setInitialPosition(player);
    }

    private determineRatioHeight(prop: Prop) {
        const rect = prop.element.getBoundingClientRect();
        const fieldRect = this.field.nativeElement.getBoundingClientRect();

        console.log(Math.round((rect.x - fieldRect.x) / this.fieldDimensions.width * 100),
            Math.round((rect.y - fieldRect.y) / this.fieldDimensions.height * 100))

        // No need to calculate this on dragMode, can be on the field init.
        const upperBounds = 0.83 * this.fieldDimensions.height;
        const middle = 0.51 * this.fieldDimensions.height;
        const lowerBounds = 0.25 * this.fieldDimensions.height;

        const _upper = upperBounds - lowerBounds;
        const _middle = _upper / 2;

        // Might have to use the height here instead of the bottom.
        const bottom = rect.bottom;

        if (bottom >= lowerBounds && bottom <= upperBounds) {
            let topRange: number = 0;
            let position: number = 0;
            let ratio: number = 0;

            if (bottom > middle) {
                topRange = _upper - _middle;
                position = bottom - _middle - lowerBounds;
            } else {
                topRange = _middle;
                position = bottom - _middle - lowerBounds;
            }

            ratio = 1 + (position / topRange * 0.28);

            prop.element.height = prop.initialBaseHeight * ratio;
        }
    }

    private setInitialPosition(player: Prop) {
        setTimeout(() => {
            player.setInitialPosition(this.field.nativeElement);
            setTimeout(() => {
                this.determineRatioHeight(player);
            })
        })
    }
}
