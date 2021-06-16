import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PlayerInfo } from "../../models/player-info";
import { Player } from "../../models/player";
import { Prop, Props } from "../../models/prop";

@Component({
    selector: 'app-desktop-positioning',
    templateUrl: './desktop-positioning.component.html'
})
export class DesktopPositioningComponent implements OnInit {
    players: PlayerInfo[] = [
        new PlayerInfo({ name: 'Rudi Marais', bowlingStyles: ['Spin', 'Medium paced'], imageSrc: 'assets/images/players/rudi.png', rightHanded: false }),
        new PlayerInfo({ name: 'Marco Munnik', bowlingStyles: ['Fast paced'], imageSrc: 'assets/images/players/marco.png' }),
        new PlayerInfo({ name: 'Johan Foley', bowlingStyles: ['Fast paced'], imageSrc: 'assets/images/players/foley.png' }),
        new PlayerInfo({ name: 'Johan Aspeling', bowlingStyles: ['Spin', 'Medium paced'], imageSrc: 'assets/images/players/aspeling.png' }),
        new PlayerInfo({ name: 'Gerhard Fourie', bowlingStyles: ['Fast paced'], imageSrc: 'assets/images/players/gerhard.png' }),
        new PlayerInfo({ name: 'Ben Geldenhuis', bowlingStyles: ['Fast paced'], imageSrc: 'assets/images/players/ben.png' }),
        new PlayerInfo({ name: 'Johann Nel', bowlingStyles: ['Fast paced'], imageSrc: 'assets/images/players/nel.png' }),
        new PlayerInfo({ name: 'Ethan Jamieson', bowlingStyles: ['Medium paced'], imageSrc: 'assets/images/players/ethan.png' }),
        new PlayerInfo({ name: 'Oliver Dwyer', bowlingStyles: ['Medium paced'], imageSrc: 'assets/images/players/oliver.png' }),
        new PlayerInfo({ name: 'Kyle Vorster', bowlingStyles: ['Fast paced'], imageSrc: 'assets/images/players/kyle.png' }),
    ]


    constructor() {
    }

    ngOnInit(): void {
    }

}
