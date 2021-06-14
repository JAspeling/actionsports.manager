import { Prop } from "./prop";

export type Players = Player[];
export class Player extends Prop {
    name: string;
    assignedSrc: string | null;
    assigned: boolean = false;

    constructor(init?: Partial<Player>) {
        super(init);
        Object.assign(this, init);
    }

}
