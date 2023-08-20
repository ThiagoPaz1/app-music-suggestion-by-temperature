import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs';

import { WeatherService } from 'src/app/services/api/weather.service';
import { MusicService } from 'src/app/services/api/music.service';
import { WeatherData, Genre, Music } from 'src/app/types';
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
      temp: '',
    }
  }

  genresMusics: Genre[] = []
  listMusicData: Music = {
    searchDate: new Date,
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
            console.log(this.currentTempData)
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
    let verifyTemp: boolean = false

    switch (verifyTemp) {
      case temp > 32:
        this.addListMusicData('rock')
        break;
      case temp > 24:
        this.addListMusicData('pop')
        break;
      case temp > 16:
        this.addListMusicData('alternative')
        break;
      default:
        this.addListMusicData('country')
    }
  }

  addListMusicData(genre: string) {
    const getGenresMusicsInStorage: Genre[] = JSON.parse(localStorage.getItem('storagedGenresMusics') as string)
    const getGenreMusic = getGenresMusicsInStorage.find(i => i.urlPath === genre) as Genre
    const listIdRock = getGenreMusic.urlPath as string

    this.musicService.getListMusicByGenre(listIdRock).subscribe(
      (m) => this.listMusicData = { searchDate: new Date(), tracks: m.tracks }
    )
  }
}