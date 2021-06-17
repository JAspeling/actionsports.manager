import { ChangeDetectorRef, Component } from '@angular/core';
import { ApplicationStateService } from "./services/application-state.service";
import { PlayerInfo } from "./models/player-info";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent {
    isMobile: boolean = false;

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

    constructor(private readonly appState: ApplicationStateService) {
        appState.isMobileView$.subscribe((isMobile) => {
            console.log('Is Mobile', isMobile);
            this.isMobile = isMobile
        });
    }
}
