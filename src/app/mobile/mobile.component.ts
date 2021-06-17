import { Component, Input } from "@angular/core";
import { PlayerInfo } from "../models/player-info";

@Component({
    selector: 'app-mobile',
    templateUrl: './mobile.component.html'
})
export class MobileComponent {
    @Input() players: PlayerInfo[] = [];
}
