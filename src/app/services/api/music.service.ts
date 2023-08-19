import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { apiKeyMusic } from 'src/environments/apiKey';
import { Genres } from 'src/app/types';

@Injectable({
  providedIn: 'root'
})
export class MusicService {
  private baseUrl = 'https://shazam.p.rapidapi.com/charts'
  private headers = {
    'X-RapidAPI-Key': apiKeyMusic,
    'X-RapidAPI-Host': 'shazam.p.rapidapi.com'
  }

  constructor(private http: HttpClient) { }

  getGenres() {
    this.http.get(`${this.baseUrl}/list`, {
      headers: this.headers
    })
  }
}
