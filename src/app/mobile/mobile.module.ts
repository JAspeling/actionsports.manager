import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MobilePositioningComponent } from './positioning/mobile-positioning.component';
import { MobileComponent } from "./mobile.component";
import { SharedModule } from "../shared/shared.module";
import { PopoverModule } from "ngx-bootstrap/popover";
import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { MatMenuModule } from "@angular/material/menu";
import { MatButtonModule } from "@angular/material/button";

@NgModule({
    declarations: [
        MobileComponent,
        MobilePositioningComponent
    ],
    exports: [
        MobileComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        PopoverModule.forRoot(),
        BsDropdownModule.forRoot(),
        MatMenuModule,
        MatButtonModule,
    ]
})
export class MobileModule { }
