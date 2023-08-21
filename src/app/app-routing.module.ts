import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ListsMusicsComponent } from './components/lists-musics/lists-musics.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'lists-musics', component: ListsMusicsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
