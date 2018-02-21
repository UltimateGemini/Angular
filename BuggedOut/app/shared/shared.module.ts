import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {StatusPipe} from "./pipe/status.pipe";

@NgModule({
    imports: [CommonModule],
    declarations: [
        StatusPipe
    ],
    exports: [
        CommonModule,
        StatusPipe
    ]
})

export class SharedModule {
}