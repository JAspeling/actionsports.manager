import { Player } from "./player";

export class PlayerInfo {
    name: string;
    imageSrc: string;
    rightHanded: boolean = true;
    bowlingStyles: string[];
    assignedPlayer: Player;

    constructor(init?: Partial<PlayerInfo>) {
        Object.assign(this, init);
    }
}
