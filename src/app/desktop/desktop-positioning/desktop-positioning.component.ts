import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { PlayerInfo } from "../../models/player-info";
import { CdkDragDrop, CdkDragStart } from "@angular/cdk/drag-drop";
import { Player } from "../../models/player";
import { FieldComponent } from "../../shared/field/field.component";
import { Action, Actions } from "../../models/action";
import { saveAs } from 'file-saver';

import * as html2canvas from 'html2canvas/dist/html2canvas.js';

@Component({
    selector: 'app-desktop-positioning',
    templateUrl: './desktop-positioning.component.html'
})
export class DesktopPositioningComponent implements OnInit {
    @ViewChild('fieldComponent') fieldComponent: FieldComponent;
    @Input() playerInfo: PlayerInfo[] = [];

    actions: Actions = [
        new Action({
            callback: (data) => {
                this.scrollToPlayers(data)
            }, icon: 'arrow_upward'
        }),
        new Action({
            callback: (data) => {
                void this.takeScreenshot(data)
            },
            icon: 'download'
        })
    ]

    constructor() {
    }

    downloadBase64Data(base64String, fileName) {
        let file = this.convertBase64ToFile(base64String, fileName);
        saveAs(file, fileName);
    }

    convertBase64ToFile(base64String, fileName) {
        let arr = base64String.split(',');
        let mime = arr[0].match(/:(.*?);/)[1];
        let bstr = atob(arr[1]);
        let n = bstr.length;
        let uint8Array = new Uint8Array(n);
        while (n--) {
            uint8Array[n] = bstr.charCodeAt(n);
        }
        let file = new File([ uint8Array ], fileName, { type: mime });
        return file;
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

            this.fieldComponent.determineAssignedRatio(player);
        }
    }

    private async takeScreenshot(data: any): Promise<void> {
        const element: HTMLDivElement = document.getElementById('field-area') as HTMLDivElement;

        await this.scrollToTop();
        const canvas = await html2canvas(element)
        const base64 = canvas.toDataURL();
        this.downloadBase64Data(base64, 'Test.png');
    }

    private scrollToTop(): Promise<void> {
        return new Promise((resolve) => {
            window.scrollTo({ top: 0 });
            setTimeout(() => {
                resolve();
            }, 500)
        })
    }

    private scrollToPlayers(data: any): void {
        const field = document.getElementById('players');
        field!.scrollIntoView();
    }
}
