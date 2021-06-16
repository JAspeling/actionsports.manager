import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MobilePositioningComponent } from './positioning/mobile-positioning.component';
import { MobileComponent } from "./mobile.component";

@NgModule({
    declarations: [
        MobileComponent,
        MobilePositioningComponent
    ],
    exports: [
        MobileComponent
    ],
    imports: [
        CommonModule
    ]
})
export class MobileModule { }
