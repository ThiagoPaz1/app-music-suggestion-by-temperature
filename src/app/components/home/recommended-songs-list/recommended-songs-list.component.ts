import { Component, OnInit, Input } from '@angular/core';

import { ListMusic } from 'src/app/types';

@Component({
  selector: 'app-recommended-songs-list',
  templateUrl: './recommended-songs-list.component.html',
  styleUrls: ['./recommended-songs-list.component.css']
})
export class RecommendedSongsListComponent implements OnInit {
  @Input() loading: boolean = false
  @Input() musics: ListMusic = {
    id: '',
    city: '',
    temp: 0,
    genre: '',
    tracks: []
  }

  playlistSave: boolean = false 

  constructor() { }

  ngOnInit(): void {
  }

  savePlaylist() {
    const playlistMusics = localStorage.getItem('playlistMusics')
    const { musics } = this
    if (!playlistMusics) {
      localStorage.setItem('playlistMusics', JSON.stringify(musics))
    } else {
      const updatePlaylistMusics = [...JSON.parse(playlistMusics), musics]
      localStorage.setItem('playlistMusics', JSON.stringify(updatePlaylistMusics))
    }

    this.playlistSave = true
  }
}
