import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { apiKeyWeather } from 'src/environments/apiKey';
import { WeatherData } from 'src/app/types';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private baseUrl = `https://api.hgbrasil.com/weather?key=${apiKeyWeather}`

  constructor(private http: HttpClient) { }

  getDataByCity(cityName: string): Observable<WeatherData> {
    const endpoint = `${this.baseUrl}&city_name=${cityName}`
    return this.http.get<WeatherData>(endpoint)
  } 
}
