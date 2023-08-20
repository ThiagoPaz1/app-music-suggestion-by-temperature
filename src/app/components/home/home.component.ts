import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { catchError, finalize } from 'rxjs';

import { WeatherService } from 'src/app/services/api/weather.service';
import { WeatherData } from 'src/app/types';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  loading: boolean = false
  cityName: string = ''
  invalidCityName: boolean = false
  currentTempData: WeatherData = {
    name: '',
    main: {
      temp: '',
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
      this.loading = true

      this.weatherService.getDataByCity(this.cityName)
        .pipe(
          finalize(() => this.loading = false)
        )
        .subscribe(
          (weather) => {
            this.cityName = ''
            this.invalidCityName = false
            this.currentTempData = weather
          },
          (error) => {
            this.cityName = ''
            this.currentTempData.name = ''
            this.invalidCityName = true
          }
        )
    } else {
      this.currentTempData.name = ''
      this.invalidCityName = true
    }
  }
}
