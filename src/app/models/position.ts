import { PropType } from "./PropType";

export type Positions = Position[];
export class Position {
    name: string;
    imageSrc: string;
    propType: PropType;
    assigned: boolean = false;

    constructor(init?: Partial<Position>) {
        Object.assign(this, init);
    }

}
