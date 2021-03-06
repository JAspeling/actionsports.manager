import { Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { Prop, Props } from "../../models/prop";
import { Player } from "../../models/player";
import { Actions } from "../../models/action";
import { PropType } from "../../models/PropType";

@Component({
    selector: 'app-field',
    templateUrl: './field.component.html'
})
export class FieldComponent implements OnInit {
    @Input() actions: Actions = [];

    public props: Props = [];

    @ViewChild('field') field: ElementRef<HTMLImageElement>;
    fieldDimensions: { x: number, y: number, height: number, width: number } = { x: 0, y: 0, height: 0, width: 0 };


    constructor() {
    }

    get fieldRect(): DOMRect {
        return this.field.nativeElement.getBoundingClientRect();
    }

    ngOnInit(): void {
    }

    @HostListener('window:resize', [ '$event' ])
    onResize(event): void {
        this.setFieldDimensions(this.field.nativeElement);

        // TODO: Still a bug here where the players dont resize correctly
        this.props.forEach(player => this.setInitialPosition(player));
    }

    assignedToLeft(prop: Prop): string {
        const player = prop as Player;
        return `calc(${player.headPos.x}% - ${player.width}px`;
    }

    assignedToTop(prop: Prop): string {
        const player = prop as Player;
        return `calc(${player.headPos.y}% - ${player.height}px)`;
    }

    public unassign(prop: Prop): void {
        const player = prop as Player;
        player.assigned = false;
        player.assignedSrc = null;
    }


    public fieldLoaded(event: Event): void {
        const img = event.composedPath()[0] as HTMLImageElement;

        this.setFieldDimensions(img);

        // initialize the players, now that we know the size of the field.
        this.props = [
            new Player({
                propType: PropType.receiver,
                source: 'assets/svg/receiver.svg',
                baseHeight: 276,
                initial: { x: 38, y: 20 },
                headPos: { x: 69.74, y: 7.42 }
            }),
            new Player({
                propType: PropType.sweeper_left,
                source: 'assets/svg/sweeper_left.svg',
                baseHeight: 276,
                initial: { x: 61, y: 26 },
                headPos: { x: 26.04, y: 8.12 }
            }),
            new Player({
                propType: PropType.sweeper_right,
                source: 'assets/svg/sweeper_right.svg',
                baseHeight: 306,
                initial: { x: 34, y: 29 },
                headPos: { x: 42.15, y: 9.06 }
            }),
            new Player({
                propType: PropType.cover,
                source: 'assets/svg/cover.svg',
                baseHeight: 216,
                initial: { x: 65, y: 46 },
                headPos: { x: 44.92, y: 9.24 }
            }),
            new Player({
                propType: PropType.legside,
                source: 'assets/svg/legside.svg',
                baseHeight: 200,
                initial: { x: 21, y: 57 },
                headPos: { x: 66.07, y: 7.23 }
            }),
            new Player({
                propType: PropType.point,
                source: 'assets/svg/point.svg',
                baseHeight: 211,
                initial: { x: 68, y: 61 },
                headPos: { x: 29.30, y: 8.77 }
            }),
            new Player({
                propType: PropType.keeper,
                source: 'assets/svg/keeper.svg',
                baseHeight: 221,
                initial: { x: 50, y: 68 },
                headPos: { x: 60.72, y: 6.68 }
            }),
            new Player({
                propType: PropType.bowler,
                source: 'assets/svg/bowler.svg',
                baseHeight: 395,
                initial: { x: 51, y: 20 },
                headPos: { x: 80.71, y: 34.71 }
            }),
            new Player({
                propType: PropType.batsman,
                source: 'assets/svg/batsman1.svg',
                baseHeight: 304,
                initial: { x: 44, y: 57 },
                headPos: { x: 49.08, y: 4.75 },
                droppable: false
            }),
            new Player({
                propType: PropType.batsman,
                source: 'assets/svg/batsman2.svg',
                baseHeight: 304,
                initial: { x: 28, y: 39 },
                headPos: { x: 33.44, y: 3.66 },
                droppable: false
            }),
            new Prop({ propType: PropType.stumps, source: 'assets/svg/stumps.svg', baseHeight: 150, initial: { x: 47, y: 68 }, draggable: false }),
            new Prop({ propType: PropType.stumps, source: 'assets/svg/stumps.svg', baseHeight: 150, initial: { x: 49, y: 28 }, draggable: false }),
        ]
    }

    public draggingPlayer(event, prop: Prop): void {
        const target = event.source.element.nativeElement as HTMLImageElement;

        this.determineRatioHeight(prop);
        // this.determineAssignedRatio(prop);
        this.determineZIndex(prop);
    }

    public playerClicked(event: MouseEvent): void {
        console.log(event.target, event.x, event.y);
        const rect = (event.target as HTMLElement).getBoundingClientRect()
        var x = event.pageX - rect.x;
        var y = event.pageY - rect.y;

        console.log(x, y);
        console.log(x / rect.width, y / rect.height);
    }

    public playerLoaded(event: Event, player: Prop): void {
        player.actualHeight = player.getInitialHeight(this.fieldDimensions.height);
        player.element = event.target as HTMLImageElement;
        this.setInitialPosition(player);
    }

    public determineAssignedRatio(prop: Prop): void {
        const player = prop as Player;
        const val = Math.round(this.fieldRect.height * 0.05);

        requestAnimationFrame(() => {
            player.assignHeight = player.assignWidth = val;
        })
    }

    private setInitialPosition(player: Prop): void {
        player.getInitialHeight(this.fieldDimensions.height)
        setTimeout(() => {
            player.setInitialPosition(this.field.nativeElement);
            setTimeout(() => {
                this.determineRatioHeight(player);
            })
        })
    }

    private determineRatioHeight(prop: Prop): void {

        const rect = prop.element.getBoundingClientRect();

        // console.log(Math.round((rect.x - this.fieldRect.x) / this.fieldDimensions.width * 100),
        //     Math.round((rect.y - this.fieldRect.y) / this.fieldDimensions.height * 100))

        // No need to calculate this on dragMode, can be on the field init.
        const upperBounds = 0.83 * this.fieldDimensions.height;
        const middle = 0.51 * this.fieldDimensions.height;
        const lowerBounds = 0.25 * this.fieldDimensions.height;

        const _upper = upperBounds - lowerBounds;
        const _middle = _upper / 2;

        // Might have to use the height here instead of the bottom.
        const bottom = rect.bottom - this.fieldRect.top;

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

    private determineZIndex(prop: Prop): void {
        this.props.sort((p1, p2) => {
            const p1Rect = p1.element.getBoundingClientRect();
            const p2Rect = p2.element.getBoundingClientRect();
            if (p1Rect.bottom < p2Rect.bottom) {
                return -1;
            } else if (p1Rect.bottom > p2Rect.bottom) {
                return 1
            } else {
                return 0
            }
        }).forEach((p, index) => p.zIndex = index + 1);
    }

    private setFieldDimensions(img: HTMLImageElement) {
        const rect = img.getBoundingClientRect();

        this.fieldDimensions.x = rect.x;
        this.fieldDimensions.y = rect.y;
        this.fieldDimensions.height = rect.height;
        this.fieldDimensions.width = rect.width;
    }
}
