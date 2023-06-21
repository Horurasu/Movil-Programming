import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';


import { Router, ActivatedRoute } from '@angular/router';




@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.page.html',
  styleUrls: ['./eventos.page.scss'],
})
export class EventosPage implements OnInit {



  evento = {
    fecha_inicio : "",
    fecha_fin : "",
    fk_instructor : "",
    fk_curso : "",
    fk_ubicacion : ""
  };

  info ={};

  constructor(
    private http : HttpClient,
    public alertController: AlertController,
    public modalController: ModalController,
    private toastCtrl : ToastController,
    private router: Router,
    private route: ActivatedRoute
  ) { }


  
  ngOnInit() {
    this.loadInstructores();
    this.loadCursos();
    this.loadUbicaciones();
  }

  
  closeModal(){
    
    this.modalController.dismiss();
  }

  cursos = []
  
  loadCursos(){
    
    this.http.get<any>('http://localhost/sw18actividad_segundo_corte/planeacion/tablas/api/cursos')
    .subscribe(response => {
        this.cursos  = response.data;
      console.log(response);
    }); 

  }

  instructores = []
  
  loadInstructores(){
    
    this.http.get<any>('http://localhost/sw18actividad_segundo_corte/planeacion/tablas/api/instructores')
    .subscribe(response => {
        this.instructores  = response.data;
      console.log(response);
    }); 

  }

  ubicaciones = []
  
  loadUbicaciones(){
    
    this.http.get<any>('http://localhost/sw18actividad_segundo_corte/planeacion/tablas/api/ubicaciones')
    .subscribe(response => {
        this.ubicaciones  = response.data;
      console.log(response);
    }); 

  }

  
  registrar_evento(){
    console.log(this.evento)
    
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


  async cargar_pagina_eventos() {
    this.router.navigate(['eventoscursos']);
  }


  async new_curso(){
    
            //console.log(data);
          

            console.log(this.evento);

            /*
            for (let i =0; i < this.cursos.length; i++) {
                console.log(this.cursos[i].titulo);
                if (this.evento.fk_curso == this.cursos[i].titulo) {
                  this.evento.fk_curso = this.cursos[i].id;
                  console.log(this.evento);
                }

            }
            */
            
          
            this.http.post<any>(
              "http://localhost/sw18actividad_segundo_corte/planeacion/tablas/api/eventos",
              this.evento
            ).subscribe(response => {

              if (response.status == "1") {
                this.mostrar_alerta("Registro!","Registro correcto", "top", "success");
                
               
                this.modalController.dismiss();
                
              
              }else{
                this.mostrar_alerta("Error!","Error al registrar", "top", "danger");
                
              }
              console.log(response);
              },error => {
                this.mostrar_alerta("Error!","Error al registrar", "top", "danger");
                console.log("error");
                
            }); 
        
          }
      


  
}
