import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EventoscursosPage } from './eventoscursos.page';

const routes: Routes = [
  {
    path: '',
    component: EventoscursosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EventoscursosPageRoutingModule {}
