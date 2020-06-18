import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CharacterRoutingModule} from './character-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {CharacterComponent} from './character.component';
import {MomentModule} from 'ngx-moment';



@NgModule({
  declarations: [CharacterComponent],
  imports: [
    CommonModule,
    CharacterRoutingModule,
    HttpClientModule,
    MomentModule.forRoot({
      relativeTimeThresholdOptions: {
        m: 59
      }
    })
  ]
})
export class CharacterModule { }
