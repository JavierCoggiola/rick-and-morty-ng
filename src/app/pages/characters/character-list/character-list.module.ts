import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharacterListRoutingModule } from './character-list-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { CharactersModule } from '../characters.module';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    CharacterListRoutingModule,
    SharedModule,
    CharactersModule
  ]
})
export class CharacterListModule { }
