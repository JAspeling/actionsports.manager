import { Component, OnInit, ViewChild } from '@angular/core';
import { PlayerInfo } from "../../models/player-info";
import { CdkDragDrop, CdkDragStart } from "@angular/cdk/drag-drop";
import { Player } from "../../models/player";
import { FieldComponent } from "../../shared/field/field.component";
import { Action, Actions } from "../../models/action";

@Component({
    selector: 'app-desktop-positioning',
    templateUrl: './desktop-positioning.component.html'
})
export class DesktopPositioningComponent implements OnInit {
    @ViewChild('fieldComponent') fieldComponent: FieldComponent;

    players: PlayerInfo[] = [
        new PlayerInfo({
            name: 'Rudi Marais',
            bowlingStyles: [ 'Spin', 'Medium paced' ],
            imageSrc: 'assets/images/players/rudi.png',
            rightHanded: false
        }),
        new PlayerInfo({
            name: 'Marco Munnik',
            bowlingStyles: [ 'Fast paced' ],
            imageSrc: 'assets/images/players/marco.png'
        }),
        new PlayerInfo({
            name: 'Johan Foley',
            bowlingStyles: [ 'Fast paced' ],
            imageSrc: 'assets/images/players/foley.png'
        }),
        new PlayerInfo({
            name: 'Johan Aspeling',
            bowlingStyles: [ 'Spin', 'Medium paced' ],
            imageSrc: 'assets/images/players/aspeling.png'
        }),
        new PlayerInfo({
            name: 'Gerhard Fourie',
            bowlingStyles: [ 'Fast paced' ],
            imageSrc: 'assets/images/players/gerhard.png'
        }),
        new PlayerInfo({
            name: 'Ben Geldenhuis',
            bowlingStyles: [ 'Fast paced' ],
            imageSrc: 'assets/images/players/ben.png'
        }),
        new PlayerInfo({
            name: 'Johann Nel',
            bowlingStyles: [ 'Fast paced' ],
            imageSrc: 'assets/images/players/nel.png'
        }),
        new PlayerInfo({
            name: 'Ethan Jamieson',
            bowlingStyles: [ 'Medium paced' ],
            imageSrc: 'assets/images/players/ethan.png'
        }),
        new PlayerInfo({
            name: 'Oliver Dwyer',
            bowlingStyles: [ 'Medium paced' ],
            imageSrc: 'assets/images/players/oliver.png'
        }),
        new PlayerInfo({
            name: 'Kyle Vorster',
            bowlingStyles: [ 'Fast paced' ],
            imageSrc: 'assets/images/players/kyle.png'
        }),
    ]

    actions: Actions = [
        new Action({
            callback: (data) => {
                this.scrollToPlayers(data)
            }, icon: 'arrow_upward'
        })
    ]

    constructor() {
    }

    ngOnInit(): void {
    }

    public scrollToField($event: CdkDragStart): void {
        const field = document.getElementById('field');
        field!.scrollIntoView();
    }

    public assignPlayer(event: CdkDragDrop<any>): void {
        const props = this.fieldComponent.props;
        const element = document.elementFromPoint(event.dropPoint.x, event.dropPoint.y);
        const player: Player = props.find(p => p.element === element) as Player;
        const data = event.item.data as PlayerInfo;

        if (player && player.droppable) {
            player.assigned = true;
            player.assignedSrc = data.imageSrc;
        }
    }

    private scrollToPlayers(data: any): void {
        const field = document.getElementById('players');
        field!.scrollIntoView();
    }
}
