import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'ubicaciones',
    loadChildren: () => import('./modals/ubicaciones/ubicaciones.module').then( m => m.UbicacionesPageModule)
  },
  {
    path: 'instructores',
    loadChildren: () => import('./modals/instructores/instructores.module').then( m => m.InstructoresPageModule)
  },
  {
    path: 'cursos',
    loadChildren: () => import('./modals/cursos/cursos.module').then( m => m.CursosPageModule)
  },
  {
    path: 'alumnos',
    loadChildren: () => import('./modals/alumnos/alumnos.module').then( m => m.AlumnosPageModule)
  },
  {
    path: 'eventos',
    loadChildren: () => import('./modals/eventos/eventos.module').then( m => m.EventosPageModule)
  },
  {
    path: 'eventoscursos',
    loadChildren: () => import('./eventoscursos/eventoscursos.module').then( m => m.EventoscursosPageModule)
  },
  {
    path: 'editarcurso',
    loadChildren: () => import('./editarcurso/editarcurso.module').then( m => m.EditarcursoPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
