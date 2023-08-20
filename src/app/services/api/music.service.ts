import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { apiKeyMusic } from 'src/environments/apiKey';
import { GenresResponse, Music } from 'src/app/types';

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

  getGenres(): Observable<GenresResponse> {
    return this.http.get<GenresResponse>(`${this.baseUrl}/list`, {
      headers: this.headers
    })
  }

  getListMusicByGenre(genreId: string): Observable<Music> {
    return this.http.get<Music>(`${this.baseUrl}/track`, {
      headers: this.headers,
      params: {
        listId: genreId,
        pageSize: 10
      }
    })
  }
}
