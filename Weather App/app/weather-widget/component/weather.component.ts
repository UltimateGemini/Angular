/**
 * Created by noelfranceschi on 6/15/17.
 */

import {Component, OnInit} from '@angular/core';
import {WeatherService} from '../service/weather.service';
import {Weather} from '../model/weather';
import {WEATHER_COLORS} from "../constants/constants";
import {el} from "@angular/platform-browser/testing/browser_util";

declare let Skycons: any;

@Component({
    moduleId: module.id,
    selector:   'weather-widget',
    templateUrl: 'weather.component.html',
    styleUrls: ['weather.component.css'],
    providers: [WeatherService]
})

export class WeatherComponent implements OnInit{

    pos: Position;
    weatherData = new Weather(null, null, null, null, null);
    currentSpeedUnit = 'mph';
    currentLocation = '';
    icons = new Skycons();
    dataReceived = false;

    constructor(private service: WeatherService) {

    };

    ngOnInit() {
        this.getCurrentLocation();
    };

    getCurrentLocation() {
        this.service.getCurrentLocation().subscribe(position => {
                this.pos = position;
                this.getCurrentWeather();
                this.getLocationName();
            },
            err => console.error(err));
    };

    getCurrentWeather() {
        this.service.getCurrentWeather(this.pos.coords.latitude, this.pos.coords.longitude)
            .subscribe(weather => {
                    this.weatherData.temp =     weather['currently']['temperature'],
                    this.weatherData.summary =  weather['currently']['summary'],
                    this.weatherData.wind =     weather['currently']['windSpeed'],
                    this.weatherData.humidity = weather['currently']['humidity'],
                    this.weatherData.icon =     weather['currently']['icon'];
                    this.setIcon();
                    this.dataReceived = true;

                    console.log('Weather:', this.weatherData);

            }, err => console.error(err));
    };

    getLocationName() {
        this.service.getLocationName(this.pos.coords.latitude, this.pos.coords.longitude).subscribe(location => {
                console.log(location);
                this.currentLocation = location['results'][4]['formatted_address'];
                console.log('Location Name: ', this.currentLocation);
            });
    };

    setIcon() {
        this.icons.add('icon', this.weatherData.icon);
        this.icons.play();
    };

    setStyles(): Object {
       if (this.weatherData.icon) {
           this.icons.color = WEATHER_COLORS[this.weatherData.icon]['color'];
           return WEATHER_COLORS[this.weatherData.icon];
       } else {
           this.icons.color = WEATHER_COLORS['default']['color'];
           return WEATHER_COLORS['default'];
       }
    }
}
