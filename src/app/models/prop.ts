export type Props = Prop[];

export class Prop {
    source: string;
    element: HTMLImageElement;

    // Original 'height' to use as a resize basis
    originalRatio: number;
    height: number;
    width: number;

    draggable: boolean = true;
    droppable: boolean = true;

    // initial positions, percentage-based from the field ratio
    initial: {
        x: number,
        y: number;
    } = { x: 0, y: 0 }

    headPos: { x: number, y: number } = { x: 0, y: 0 };

    x: number;
    y: number;
    zIndex: number;

    // Height that is in proportion with the middle of the pitch.
    baseHeight: number;
    initialBaseHeight: number;

    // The rendered height given all the other variables.
    actualHeight: number;

    // The (base) ratio to use when moving up/down the pitch.
    ratio: number = 1.28;

    // from designs
    originalFieldHeight: number = 2368;

    constructor(init?: Partial<Prop>) {
        Object.assign(this, init);
    }

    getInitialHeight(fieldHeight: number): number {
        const fieldRatio = fieldHeight / this.originalFieldHeight;
        this.initialBaseHeight = this.baseHeight * fieldRatio;

        return this.initialBaseHeight;
    }

    setInitialPosition(fieldElement: HTMLImageElement): void {
        const parentTop: number = fieldElement.offsetTop;
        const parentLeft: number = fieldElement.offsetLeft;
        const fieldHeight = fieldElement.offsetHeight;
        const fieldWidth = fieldElement.offsetWidth;

        this.x = (fieldWidth * this.initial.x / 100) + parentLeft;
        this.y = (fieldHeight * this.initial.y / 100) + parentTop;
    }
}

