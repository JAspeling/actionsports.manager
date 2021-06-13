import { Prop } from "./prop";

export type Players = Player[];
export class Player extends Prop {

    constructor(init?: Partial<Player>) {
        super(init);
        Object.assign(this, init);
    }
}
