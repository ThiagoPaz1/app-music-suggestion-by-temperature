import { Component, OnInit, Input } from '@angular/core';

import { Music } from 'src/app/types';

@Component({
  selector: 'app-recommended-songs-list',
  templateUrl: './recommended-songs-list.component.html',
  styleUrls: ['./recommended-songs-list.component.css']
})
export class RecommendedSongsListComponent implements OnInit {
  @Input() loading: boolean = false
  @Input() musics: Music = {
    genre: '',
    tracks: []
  }

  playlistSave: boolean = false 

  constructor() { }

  ngOnInit(): void {
  }

  savePlaylist() {
    const playlistMusics = localStorage.getItem('playlistMusics')

    if (!playlistMusics) {
      localStorage.setItem('playlistMusics', JSON.stringify(this.musics))
    } else {
      const updatePlaylistMusics = [JSON.parse(playlistMusics), this.musics]
      localStorage.setItem('playlistMusics', JSON.stringify(updatePlaylistMusics))
    }

    this.playlistSave = true
  }
}
