import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MobilePositioningComponent } from './positioning/mobile-positioning.component';

@NgModule({
    declarations: [
        MobilePositioningComponent
    ],
    exports: [
        MobilePositioningComponent
    ],
    imports: [
        CommonModule
    ]
})
export class MobileModule { }
