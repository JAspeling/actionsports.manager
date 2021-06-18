import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { PlayerInfo } from "../../models/player-info";
import { Position, Positions } from "../../models/position";
import { FieldComponent } from "../../shared/field/field.component";
import { CdkDragDrop } from "@angular/cdk/drag-drop";
import { Player } from "../../models/player";
import { PropType } from "../../models/PropType";

@Component({
    selector: 'app-mobile-positioning',
    templateUrl: './mobile-positioning.component.html'
})
export class MobilePositioningComponent implements OnInit {
    @ViewChild('fieldComponent') fieldComponent: FieldComponent;
    @Input() players: PlayerInfo[] = [];

    positions: Positions = [
        new Position({ name: 'Receiver', imageSrc: 'assets/svg/receiver.svg', propType: PropType.receiver }),
        new Position({
            name: 'Sweeper (left)',
            imageSrc: 'assets/svg/sweeper_left.svg',
            propType: PropType.sweeper_left
        }),
        new Position({
            name: 'Sweeper (right)',
            imageSrc: 'assets/svg/sweeper_right.svg',
            propType: PropType.sweeper_right
        }),
        new Position({ name: 'Cover', imageSrc: 'assets/svg/cover.svg', propType: PropType.cover }),
        new Position({ name: 'Point', imageSrc: 'assets/svg/point.svg', propType: PropType.point }),
        new Position({ name: 'Legside', imageSrc: 'assets/svg/legside.svg', propType: PropType.legside }),
        new Position({ name: 'Wicket Keeper', imageSrc: 'assets/svg/keeper.svg', propType: PropType.keeper })
    ]

    constructor() {
    }

    ngOnInit(): void {
    }

    assignPlayer(event: MouseEvent, playerInfo: PlayerInfo, position: Position): boolean {
        if (position.assigned === false) {
            this.unAssignPlayer(playerInfo, position);
            const player = this.fieldComponent.props.find(prop => prop.propType === position.propType) as Player;

            this.assign(playerInfo, player);

            position.assigned = true;
            this.fieldComponent.determineAssignedRatio(player);
            return true;
        } else {
            event.preventDefault();
            event.stopPropagation();
            return false;
        }

    }

    unAssignPlayer(playerInfo: PlayerInfo, position?: Position) {
        // The position is the prop on the field.
        const pos = position || this.positions.find(pos => pos.propType === playerInfo.assignedPlayer.propType);
        pos.assigned = false;

        // Player info is the list of players.
        if (playerInfo.assignedPlayer) {
            // Unassign the previous position
            const previousPos = this.positions.find(pos => pos.propType === playerInfo.assignedPlayer.propType);
            previousPos.assigned = false;

            playerInfo.assignedPlayer.assigned = false;
            playerInfo.assignedPlayer.assignedSrc = null;
        }
    }

    private assign(playerInfo: PlayerInfo, player: Player) {
        playerInfo.assignedPlayer = player;

        player.assigned = true;
        player.assignedSrc = playerInfo.imageSrc;
    }
}
