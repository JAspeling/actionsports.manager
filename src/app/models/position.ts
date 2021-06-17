export type Positions = Position[];
export class Position {
    name: string;
    imageSrc: string;

    constructor(init?: Partial<Position>) {
        Object.assign(this, init);
    }

}
