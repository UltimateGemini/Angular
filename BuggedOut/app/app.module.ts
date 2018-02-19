import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BugModule} from "./bugs/bug.module";

import {AppComponent} from './app.component';
import {AppRoutingModule} from "./app-routing.module";


@NgModule({
    imports: [
        BrowserModule,
        BugModule,
        AppRoutingModule],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})

export class AppModule {
}