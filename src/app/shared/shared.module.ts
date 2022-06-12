import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchBoxComponent } from './component/search-box/search-box.component';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { FormsModule } from '@angular/forms';
import { CharacterComponent } from '../pages/characters/character/character.component';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { CharacterService } from '../pages/characters/services/character.service';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';

@NgModule({
  declarations: [
    SearchBoxComponent,
    CharacterComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NzPaginationModule,
    NzInputModule,
    NzLayoutModule,
    NzGridModule,
    NzCardModule,
    NzSpinModule,
    NzButtonModule,
    NzIconModule
  ],
  exports: [
    NzPaginationModule,
    NzInputModule,
    NzLayoutModule,
    NzGridModule,
    NzCardModule,
    NzSpinModule,
    NzButtonModule,
    NzIconModule,
    SearchBoxComponent,
    CharacterComponent,
  ],
  providers: [
    CharacterService
  ]
})
export class SharedModule { }
