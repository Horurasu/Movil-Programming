import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EventoscursosPageRoutingModule } from './eventoscursos-routing.module';

import { EventoscursosPage } from './eventoscursos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EventoscursosPageRoutingModule
  ],
  declarations: [EventoscursosPage]
})
export class EventoscursosPageModule {}
