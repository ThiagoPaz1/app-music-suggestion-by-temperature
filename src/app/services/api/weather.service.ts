import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { apiKeyWeather } from 'src/environments/apiKey';
import { WeatherData } from 'src/app/types';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private baseUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&appid=${apiKeyWeather}&lang=pt_br`

  constructor(private http: HttpClient) { }

  getDataByCity(cityName: string): Observable<WeatherData> {
    const endpoint = `${this.baseUrl}&q=${cityName}`

    return this.http.get<WeatherData>(endpoint)
  }
}
