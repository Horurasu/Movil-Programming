import { Component, Input, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';


import { Router, ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-editarcurso',
  templateUrl: './editarcurso.page.html',
  styleUrls: ['./editarcurso.page.scss'],
})
export class EditarcursoPage implements OnInit {

  
  
  @Input() evento: any;
  

  evento2 = {
    fecha_inicio : "",
    fecha_fin : "",
    fk_instructor : "",
    fk_curso : "",
    fk_ubicacion : ""
  };


  

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
    
    this.evento2 = {
      fecha_inicio : this.evento.fecha_inicio,
      fecha_fin : this.evento.fecha_fin,
      fk_instructor : this.evento.fk_instructor,
      fk_curso : this.evento.fk_curso,
      fk_ubicacion : this.evento.fk_ubicacion
    };

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
  
  async editar_curso(evento2){
    
    console.log(this.evento);

    
    this.http.put<any>(
      "http://localhost/sw18actividad_segundo_corte/planeacion/tablas/api/eventos/id/"+evento2.id,
      this.evento2
    ).subscribe(response => {

      if (response.status == "1") {
        this.mostrar_alerta("Editado!","Editado correcto", "top", "success");
        console.log(this.evento);
       
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
