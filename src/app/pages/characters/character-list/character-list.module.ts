import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharacterListRoutingModule } from './character-list-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { CharacterListComponent } from './character-list.component';

@NgModule({
  declarations: [
    CharacterListComponent
  ],
  imports: [
    CommonModule,
    CharacterListRoutingModule,
    SharedModule,
  ]
})
export class CharacterListModule { }
