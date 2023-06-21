import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UbicacionesPage } from './ubicaciones.page';

const routes: Routes = [
  {
    path: '',
    component: UbicacionesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UbicacionesPageRoutingModule {}
