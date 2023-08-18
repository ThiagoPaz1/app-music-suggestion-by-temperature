import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { apiKeyWeather } from 'src/environments/apiKey';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private baseUrl = `https://api.hgbrasil.com/weather?key=${apiKeyWeather}`

  constructor(private http: HttpClient) { }

  getDataByCity() {

  } 
}
