import { noop } from "rxjs";

export type Actions = Action[];
export class Action {
    theme: string = 'btn-default'

    callback: (data) => void = noop;
    icon: string;

    constructor(init?: Partial<Action>) {
        Object.assign(this, init);
    }
}
