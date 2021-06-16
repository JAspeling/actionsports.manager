export class PlayerInfo {
    name: string;
    imageSrc: string;
    rightHanded: boolean = true;
    bowlingStyles: string[];

    constructor(init?: Partial<PlayerInfo>) {
        Object.assign(this, init);
    }
}
