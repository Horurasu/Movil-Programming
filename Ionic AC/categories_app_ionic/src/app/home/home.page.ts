import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';


import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';

import { UbicacionesPage } from '../modals/ubicaciones/ubicaciones.page';
import { InstructoresPage } from '../modals/instructores/instructores.page';
import { CursosPage } from '../modals/cursos/cursos.page';
import { AlumnosPage } from '../modals/alumnos/alumnos.page';
import { EventosPage } from '../modals/eventos/eventos.page';


import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {



  constructor(
    private http : HttpClient,
    public alertController: AlertController,
    public modalController: ModalController,
    private toastCtrl : ToastController,
    private router: Router,
    private route: ActivatedRoute
    
  ) {}

  async cargar_ubicaciones() {
    const modal = await this.modalController.create({
      component: UbicacionesPage,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }

  async cargar_instructores() {
    const modal = await this.modalController.create({
      component: InstructoresPage,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }

  async cargar_cursos() {
    const modal = await this.modalController.create({
      component: CursosPage,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }

  async cargar_alumnos() {
    const modal = await this.modalController.create({
      component: AlumnosPage,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  } 

  async cargar_eventos() {
    const modal = await this.modalController.create({
      component: EventosPage,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }


  
  async cargar_pagina_eventos() {
    this.router.navigate(['eventoscursos']);
  }

  

}
