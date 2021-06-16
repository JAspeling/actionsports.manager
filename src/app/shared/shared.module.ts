import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FieldComponent } from './field/field.component';
import { DragDropModule } from "@angular/cdk/drag-drop";


@NgModule({
    declarations: [
        FieldComponent
    ],
    exports: [
        FieldComponent
    ],
    imports: [
        CommonModule,
        DragDropModule
    ]
})
export class SharedModule {
}
