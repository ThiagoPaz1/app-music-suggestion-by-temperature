import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

import { WeatherService } from 'src/app/services/api/weather.service';
import { MusicService } from 'src/app/services/api/music.service';
import { WeatherData, Genre, ListMusic } from 'src/app/types';
import { dateFormat } from 'src/app/utils/dateFormat';

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
      temp: 0,
    }
  }

  loadingMusics: boolean = false
  genresMusics: Genre[] = []
  listMusicData: ListMusic = {
    id: '',
    city: '',
    temp: 0,
    genre: '',
    date: '',
    tracks: []
  }

  constructor(
    private weatherService: WeatherService,
    private musicService: MusicService
  ) { }

  ngOnInit(): void {
    this.saveGenresMusics()
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
            this.currentTempData = { name: weather.name, main: weather.main }
            this.getListMusicByTemp(weather.main.temp)
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

  checkGenres(genre: string): boolean {
    return genre === 'pop' ||
      genre === 'rock' ||
      genre === 'alternative' ||
      genre === 'country'
  }

  saveGenresMusics() {
    const checkGenresMusicsInStorage = localStorage.getItem('storagedGenresMusics')

    if (!checkGenresMusicsInStorage) {
      this.musicService.getGenres().subscribe(
        (music) => {
          this.genresMusics = music.global.genres.filter(i => this.checkGenres(i.urlPath))
          localStorage.setItem('storagedGenresMusics', JSON.stringify(this.genresMusics))
        }
      )
    }
  }

  getListMusicByTemp(temp: number) {
    if (temp > 32) this.addListMusicData('rock')

    else if (temp > 24) this.addListMusicData('pop')

    else if (temp > 16) this.addListMusicData('alternative')

    else this.addListMusicData('country')
  }

  addListMusicData(genre: string) {
    const getGenresMusicsInStorage: Genre[] = JSON.parse(localStorage.getItem('storagedGenresMusics') as string)
    const getGenreMusic = getGenresMusicsInStorage.find(i => i.urlPath === genre) as Genre
    const { listid, urlPath } = getGenreMusic

    this.loadingMusics = true
    this.musicService.getListMusicByGenre(listid)
      .pipe(
        finalize(() => this.loadingMusics = false)
      )
      .subscribe(
        (m) => this.listMusicData = {
          id: uuidv4(),
          city: this.currentTempData.name,
          temp: this.currentTempData.main.temp,
          date: dateFormat(new Date()),
          tracks: m.tracks,
          genre: urlPath
        }
      )
  }
}