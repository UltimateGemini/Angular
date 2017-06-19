import {NgModule}                   from '@angular/core';
import {BrowserModule}              from '@angular/platform-browser';
import {AppComponent}               from './app.component';
import {WeatherComponent}           from './weather-widget/component/weather.component';
import {JsonpModule, HttpModule}    from '@angular/http';
import {SpeedUnitPipe}              from './weather-widget/pipe/speed-unit.pipe';

@NgModule({
    imports: [BrowserModule, JsonpModule, HttpModule],
    declarations: [AppComponent, WeatherComponent, SpeedUnitPipe],
    bootstrap: [AppComponent]
})

export class AppModule { }