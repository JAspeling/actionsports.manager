import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DesktopPositioningComponent } from './desktop-positioning/desktop-positioning.component';
import { DesktopPredefinedPositioningComponent } from './desktop-predefined-positioning/desktop-predefined-positioning.component';
import { DesktopComponent } from "./desktop.component";
import { TabsModule } from "ngx-bootstrap/tabs";
import { DragDropModule } from "@angular/cdk/drag-drop";

@NgModule({
    declarations: [
        DesktopComponent,
        DesktopPositioningComponent,
        DesktopPredefinedPositioningComponent
    ],
    exports: [
        DesktopPositioningComponent,
        DesktopComponent
    ],
    imports: [
        CommonModule,

        TabsModule,
        DragDropModule
    ]
})
export class DesktopModule {
}
