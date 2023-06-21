import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditarcursoPage } from './editarcurso.page';

const routes: Routes = [
  {
    path: '',
    component: EditarcursoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditarcursoPageRoutingModule {}
