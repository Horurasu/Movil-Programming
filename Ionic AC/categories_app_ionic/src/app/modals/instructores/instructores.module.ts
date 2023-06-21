import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InstructoresPageRoutingModule } from './instructores-routing.module';

import { InstructoresPage } from './instructores.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InstructoresPageRoutingModule
  ],
  declarations: [InstructoresPage]
})
export class InstructoresPageModule {}
