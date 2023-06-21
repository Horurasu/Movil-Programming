import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InstructoresPage } from './instructores.page';

const routes: Routes = [
  {
    path: '',
    component: InstructoresPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InstructoresPageRoutingModule {}
