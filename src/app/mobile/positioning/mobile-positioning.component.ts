import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { PlayerInfo } from "../../models/player-info";
import { Position, Positions } from "../../models/position";
import { FieldComponent } from "../../shared/field/field.component";

@Component({
    selector: 'app-mobile-positioning',
    templateUrl: './mobile-positioning.component.html'
})
export class MobilePositioningComponent implements OnInit {
    @ViewChild('fieldComponent') fieldComponent: FieldComponent;
    @Input() players: PlayerInfo[] = [];

    positions: Positions = [
        new Position({name: 'Receiver', imageSrc: 'assets/svg/receiver.svg'}),
        new Position({name: 'Sweeper (left)', imageSrc: 'assets/svg/sweeper_left.svg'}),
        new Position({name: 'Sweeper (right)', imageSrc: 'assets/svg/sweeper_right.svg'}),
        new Position({name: 'Cover', imageSrc: 'assets/svg/cover.svg'}),
        new Position({name: 'Point', imageSrc: 'assets/svg/point.svg'}),
        new Position({name: 'Legside', imageSrc: 'assets/svg/legside.svg'}),
        new Position({name: 'Wicket Keeper', imageSrc: 'assets/svg/keeper.svg'})
    ]

    constructor() {
    }

    ngOnInit(): void {
    }

    assignPlayer(player: PlayerInfo, position: Position) {
        console.log(player, position);
    }
}
