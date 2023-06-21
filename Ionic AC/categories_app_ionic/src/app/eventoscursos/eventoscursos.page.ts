import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';


import { Router, ActivatedRoute } from '@angular/router';

import { EventosPage } from '../modals/eventos/eventos.page';

import { EditarcursoPage } from '../editarcurso/editarcurso.page';

@Component({
  selector: 'app-eventoscursos',
  templateUrl: './eventoscursos.page.html',
  styleUrls: ['./eventoscursos.page.scss'],
})
export class EventoscursosPage implements OnInit {

  eventos = []

  



  constructor(
    private http : HttpClient,
    public alertController: AlertController,
    public modalController: ModalController,
    private toastCtrl : ToastController,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  async regresar() {
    this.router.navigate(['home']);
  }

  ngOnInit() {
    this.loadEventos();
    
  }

  recargar() {
    this.loadEventos();
    
  }
  

  loadEventos(){
    
    this.http.get<any>('http://localhost/sw18actividad_segundo_corte/planeacion/tablas/api/eventos')
    .subscribe(response => {
        this.eventos  = response.data;
      console.log(response);
    }); 

  }


  
  async new_editarcurso_modal(data){
    const modal = await this.modalController.create({
      component: EditarcursoPage,
      cssClass: 'my-custom-class',
      componentProps: {
        'evento' : data
        
      }
    });
    modal.onDidDismiss().then(()=>{
      this.loadEventos();
    });
    return await modal.present();

  }


  async new_curso_modal(){
    const modal = await this.modalController.create({
      component: EventosPage,
      cssClass: 'my-custom-class'
    });
    modal.onDidDismiss().then(()=>{
      this.loadEventos();
    });
    return await modal.present();
  }

    
  async editar_eventocurso(evento){
    const alert = await this.alertController.create({
      header : "Editar evento ",
      inputs : [
        
        {
          name : "fecha_inicio",
          type : "text",
          placeholder : "fecha_inicio",
          value : evento.fecha_inicio
        },

        {
          name : "fecha_fin",
          type : "text",
          placeholder : "fecha_fin",
          value : evento.fecha_fin
        },

        
        {
          name : "fk_instructor",
          type : "text",
          placeholder : "fk_instructor",
          value : evento.fk_instructor
        },

        
        {
          name : "fk_curso",
          type : "text",
          placeholder : "fk_curso",
          value : evento.fk_curso
        },

        
        {
          name : "fk_ubicacion",
          type : "text",
          placeholder : "fk_ubicacion",
          value : evento.fk_ubicacion
        },
        
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'danger',
          
        }, {
          text: 'Guardar',
          cssClass: 'primary',
          handler : (data) => {
            //console.log(data);
            console.log(data);
            this.http.put<any>(
              "http://localhost/sw18actividad_segundo_corte/planeacion/tablas/api/eventos/id/"+evento.id,
              data
            ).subscribe(response => {

              if (response.status == "1") {
                this.mostrar_alerta("Editado!","Editado correcto", "top", "success");
                this.loadEventos();
              
              }else{
                this.mostrar_alerta("Error!","Error al editar o instructor, curso, ubicacion no validos", "top", "danger");
                
              }
              console.log(response);
              },error => {
                this.mostrar_alerta("Error!","Error al editar", "top", "danger");
                console.log("error");
                
            }); 
        
          }
        },

      ]


    });
    await alert.present();
  }

  async borrar_eventocurso(evento){
    const alert = await this.alertController.create({
      header : "Desea Borrarlo?",
      inputs : [
        
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'danger',
          
        }, 
        {
          text: 'Aceptar',
          cssClass: 'danger',
          handler : (data)=> {
            console.log(2);
            this.http.delete<any>(
              "http://localhost/sw18actividad_segundo_corte/planeacion/tablas/api/eventos/id/"+evento.id,
            ).subscribe(response => {

              if (response.status == "1") {
                this.mostrar_alerta("Borrado!","Borrado correcto", "top", "success");
                this.loadEventos();
              
              }else{
                this.mostrar_alerta("Error!","Error al borrar", "top", "danger");
                
              }
              console.log(response);
              },error => {
                this.mostrar_alerta("Error!","Error al borrar", "top", "danger");
                console.log("error");
                
            });
          }
          
        },

      ]


    });
    await alert.present();
  }
  
  async mostrar_alerta(titulo, mensaje, posicion, color){
    let toast = await this.toastCtrl.create({
      header : titulo,
      message : mensaje,
      color : color,
      position : posicion,
      duration : 4000
    });

    await toast.present();
  }
  
}
