import { Component, OnInit } from '@angular/core';

import { WeatherService } from 'src/app/services/api/weather.service';
import { WeatherData } from 'src/app/types';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  cityName: string = ''
  invalidCityName: boolean = false
  currentTempData: WeatherData = {
    by: '',
    results: {
      temp: '',
      city: ''
    }
  }

  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {
  }

  checkCityName(): boolean {
    return Boolean(this.cityName)
  }

  getWeatherData() {
    if (this.checkCityName()) {
      this.weatherService.getDataByCity(this.cityName)
        .subscribe((weather) => {
          if (weather.by === 'default') {
            this.currentTempData.results.city = ''
            this.invalidCityName = true
          } else {
            this.invalidCityName = false
            this.currentTempData = weather
          }
        })
    } else {
      this.currentTempData.results.city = ''
      this.invalidCityName = true
    }
  }
}
