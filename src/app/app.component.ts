import {
    AfterContentInit,
    ChangeDetectorRef,
    Component,
    ElementRef, HostListener,
    OnInit,
    ViewChild,
    ViewChildren
} from '@angular/core';
import { Player, Players } from "./models/player";
import { Prop, Props } from "./models/prop";
import { CdkDragDrop } from "@angular/cdk/drag-drop";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent {

    @ViewChild('field') field: ElementRef<HTMLImageElement>;
    fieldDimensions: { x: number, y: number, height: number, width: number } = { x: 0, y: 0, height: 0, width: 0 };

    props: Props = []
    names: string[] = [
        'assets/images/players/aspeling.png',
        'assets/images/players/ben.png',
        'assets/images/players/foley.png',
        'assets/images/players/gerhard.png',
        'assets/images/players/ethan.png',
        'assets/images/players/kyle.png',
        'assets/images/players/marco.png',
        'assets/images/players/nel.png',
        'assets/images/players/oliver.png',
        'assets/images/players/rudi.png',
    ];

    constructor(private readonly cdr: ChangeDetectorRef) {
    }

    @HostListener('window:resize', [ '$event' ])
    onResize(event): void {
        this.setFieldDimensions(this.field.nativeElement);

        // TODO: Still a bug here where the players dont resize correctly
        this.props.forEach(player => this.setInitialPosition(player));
    }

    dragMove(event, prop: Prop): void {
        const target = event.source.element.nativeElement as HTMLImageElement;

        this.determineRatioHeight(prop);
        this.determineZIndex(prop);
    }

    fieldLoaded(event: Event) {
        const img = event.composedPath()[0] as HTMLImageElement;

        this.setFieldDimensions(img);

        // initialize the players, now that we know the size of the field.
        this.props = [
            new Player({ source: 'assets/svg/receiver.svg', baseHeight: 276, initial: { x: 38, y: 20 }, headPos: {x: 69.74, y: 7.42} }),
            new Player({ source: 'assets/svg/sweeper_left.svg', baseHeight: 276, initial: { x: 61, y: 26 }, headPos: {x: 26.04, y: 8.12} }),
            new Player({ source: 'assets/svg/sweeper_right.svg', baseHeight: 306, initial: { x: 34, y: 29 }, headPos: {x: 42.15, y: 9.06} }),
            new Player({ source: 'assets/svg/cover.svg', baseHeight: 216, initial: { x: 65, y: 46 }, headPos: {x: 44.92, y: 9.24} }),
            new Player({ source: 'assets/svg/legside.svg', baseHeight: 200, initial: { x: 21, y: 57 }, headPos: {x: 66.07, y: 7.23} }),
            new Player({ source: 'assets/svg/point.svg', baseHeight: 211, initial: { x: 68, y: 61 }, headPos: {x: 29.30, y: 8.77} }),
            new Player({ source: 'assets/svg/keeper.svg', baseHeight: 221, initial: { x: 50, y: 68 }, headPos: {x: 60.72, y: 6.68} }),
            new Player({ source: 'assets/svg/bowler.svg', baseHeight: 395, initial: { x: 51, y: 20 }, headPos: {x: 80.71, y: 34.71} }),
            new Player({ source: 'assets/svg/batsman1.svg', baseHeight: 304, initial: { x: 44, y: 57 }, headPos: {x: 49.08, y: 4.75} }),
            new Player({ source: 'assets/svg/batsman2.svg', baseHeight: 304, initial: { x: 28, y: 39 }, headPos: {x: 33.44, y: 3.66} }),
            new Prop({ source: 'assets/svg/stumps.svg', baseHeight: 150, initial: { x: 47, y: 68 }, draggable: false}),
            new Prop({ source: 'assets/svg/stumps.svg', baseHeight: 150, initial: { x: 49, y: 28 }, draggable: false}),
        ]
    }

    playerLoaded(event: Event, player: Prop): void {
        player.actualHeight = player.getInitialHeight(this.fieldDimensions.height);
        player.element = event.target as HTMLImageElement;
        this.setInitialPosition(player);
    }

    assignPlayer(event: CdkDragDrop<any>) {
        const element = document.elementFromPoint(event.dropPoint.x, event.dropPoint.y);
        const player: Player = this.props.find(p => p.element === element) as Player;

        if (player) {
            player.assigned = true;
            player.assignedSrc = event.item.data;
            console.log(element);
            console.log(player);
        }
    }

    private setFieldDimensions(img: HTMLImageElement) {
        this.fieldDimensions.x = img.x;
        this.fieldDimensions.y = img.y;
        this.fieldDimensions.height = img.height;
        this.fieldDimensions.width = img.width;
    }

    private determineRatioHeight(prop: Prop) {
        const rect = prop.element.getBoundingClientRect();

        // const fieldRect = this.field.nativeElement.getBoundingClientRect();
        // console.log(Math.round((rect.x - fieldRect.x) / this.fieldDimensions.width * 100),
        //     Math.round((rect.y - fieldRect.y) / this.fieldDimensions.height * 100))

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
        player.getInitialHeight(this.fieldDimensions.height)
        setTimeout(() => {
            player.setInitialPosition(this.field.nativeElement);
            setTimeout(() => {
                this.determineRatioHeight(player);
            })
        })
    }

    playerClicked(event: MouseEvent) {
        console.log(event.target, event.x, event.y);
        const rect = (event.target as HTMLElement).getBoundingClientRect()
        var x = event.pageX - rect.x;
        var y = event.pageY - rect.y;

        console.log(x, y);
        console.log(x / rect.width, y / rect.height);
    }

    unassign(prop: Prop) {
        const player = prop as Player;
        player.assigned = false;
        player.assignedSrc = null;
    }

    private determineZIndex(prop: Prop) {
        this.props.sort((p1, p2) => {
            const p1Rect = p1.element.getBoundingClientRect();
            const p2Rect = p2.element.getBoundingClientRect();
           if (p1Rect.bottom < p2Rect.bottom) {
               return -1;
           }  else if (p1Rect.bottom > p2Rect.bottom) {
               return 1
           } else {
               return 0
           }
        }).forEach((p, index) => p.zIndex = index + 1);
    }
}
