import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { CharacterDetailComponent } from './character-detail/character-detail.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'list', 
  loadChildren: () => 
  import(
    './character-list/character-list.module'
    ).then(m => m.CharacterListModule) },
  { path: ':id', component: CharacterDetailComponent }
];

@NgModule({
  declarations: [
    CharacterDetailComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
  ]
})
export class CharactersModule { }
