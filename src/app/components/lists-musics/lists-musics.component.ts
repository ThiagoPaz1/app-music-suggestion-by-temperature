import { Component, OnInit } from '@angular/core';

import { ListMusic } from 'src/app/types';

@Component({
  selector: 'app-lists-musics',
  templateUrl: './lists-musics.component.html',
  styleUrls: ['./lists-musics.component.css']
})
export class ListsMusicsComponent implements OnInit {
  emptyMusicLists: boolean = false
  listsMusicsData: ListMusic[] = []
  showMusics = {
    listId: ''
  }

  constructor() { }

  ngOnInit(): void {
    this.getListsMusics()
  }

  getListsMusics() {
    const listsMusicsStoraged: ListMusic[] = JSON.parse(localStorage.getItem('playlistMusics') as string)

    if (listsMusicsStoraged) {
      if (listsMusicsStoraged.length) {
        this.emptyMusicLists = false
        this.listsMusicsData = listsMusicsStoraged
      }
    } else {
      this.emptyMusicLists = true
    }
  }

  show(listId: string) {
    if (!this.showMusics.listId) {
      this.showMusics = {
        listId: listId
      }
    } else {
      this.showMusics = {
        listId: ''
      }
    }
  }

  deleteListMusic(listId: string) {
    const updateListMusic = this.listsMusicsData.filter(i => i.id !== listId)

    localStorage.setItem('playlistMusics', JSON.stringify(updateListMusic))
    this.listsMusicsData = updateListMusic
  }
}
