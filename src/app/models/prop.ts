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

    constructor(init?: Partial<Prop>) {
        Object.assign(this, init);
    }
}
