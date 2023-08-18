import { Component, OnInit } from '@angular/core';

import { WeatherService } from 'src/app/services/api/weather.service';
import { WeatherData } from 'src/app/types';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  currentTempData: WeatherData = {
    results: {
      temp: '',
      city: ''
    }
  }

  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {
    this.getWeatherData()
  }

  getWeatherData() {
    this.weatherService.getDataByCity('maceio')
      .subscribe(w => this.currentTempData = w)
  }
}
