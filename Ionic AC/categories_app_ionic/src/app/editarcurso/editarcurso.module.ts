import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditarcursoPageRoutingModule } from './editarcurso-routing.module';

import { EditarcursoPage } from './editarcurso.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditarcursoPageRoutingModule
  ],
  declarations: [EditarcursoPage]
})
export class EditarcursoPageModule {}
