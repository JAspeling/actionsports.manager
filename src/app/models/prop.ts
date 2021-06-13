export type Props = Prop[];
export class Prop {
    source: string;

    // Original 'height' to use as a resize basis
    originalRatio: number;
    height: number;
    width: number;
    x: number;
    y: number;
    zIndex: number;

    // Height that is in proportion with the middle of the pitch.
    baseHeight: number;

    // The (base) ratio to use when moving up/down the pitch.
    ratio: number = 1.28;

    // from designs
    originalFieldHeight: number = 2368;

    constructor(init?: Partial<Prop>) {
        Object.assign(this, init);
    }

    getInitialHeight(fieldHeight: number): number {
        const fieldRatio = fieldHeight / this.originalFieldHeight;

        return this.baseHeight * fieldRatio;
    }
}

