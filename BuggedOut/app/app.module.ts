import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BugModule} from "./bugs/bug.module";

import {AppComponent} from './app.component';
import {AppRoutingModule} from "./app-routing.module";
import {NavbarComponent} from "./navbar/navbar.component";
import {CoreModule} from "./core/core.module";


@NgModule({
    imports: [
        BrowserModule,
        BugModule,
        AppRoutingModule,
        CoreModule.forRoot()
    ],
    declarations: [
        AppComponent,
        NavbarComponent
    ],
    bootstrap: [AppComponent]
})

export class AppModule {
}