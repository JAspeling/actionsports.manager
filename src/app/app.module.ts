import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from "@angular/cdk/drag-drop";
import { DesktopModule } from "./desktop/desktop.module";
import { MobileModule } from "./mobile/mobile.module";

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        DragDropModule,

        DesktopModule,
        MobileModule
    ],
    providers: [],
    bootstrap: [ AppComponent ]
})
export class AppModule {
}
