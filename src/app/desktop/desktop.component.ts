import { Component, Input } from "@angular/core";
import { PlayerInfo } from "../models/player-info";

@Component({
    selector: 'app-desktop',
    templateUrl: 'desktop.component.html'
})
export class DesktopComponent {
    @Input() players: PlayerInfo[] = []
}
