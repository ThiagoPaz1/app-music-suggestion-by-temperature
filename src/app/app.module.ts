import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { RecommendedSongsListComponent } from './components/home/recommended-songs-list/recommended-songs-list.component';
import { ListsMusicsComponent } from './components/lists-musics/lists-musics.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RecommendedSongsListComponent,
    ListsMusicsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatProgressSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
