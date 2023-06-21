import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.page.html',
  styleUrls: ['./alumnos.page.scss'],
})
export class AlumnosPage implements OnInit {

  alumnos = []
  seleccionado = []

  constructor(
    private http : HttpClient,
    public alertController: AlertController,
    public modalController: ModalController,
    private toastCtrl : ToastController
  ) { }

  
  ngOnInit() {
    this.loadAlumnos();
  }

  
  loadAlumnos(){
    
    this.http.get<any>('http://localhost/sw18actividad_segundo_corte/planeacion/tablas/api/alumnos')
    .subscribe(response => {
        this.alumnos  = response.data;
      console.log(response);
    }); 

  }

  closeModal(){
    this.modalController.dismiss();
  }

  async new_instructor(){
    const alert = await this.alertController.create({
      header : "Nuevo Alumno",
      inputs : [
        
        {
          name : "nombre",
          type : "text",
          placeholder : "nombre"
        },

        {
          name : "direccion",
          type : "text",
          placeholder : "direccion"
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
            this.http.post<any>(
              "http://localhost/sw18actividad_segundo_corte/planeacion/tablas/api/alumnos",
              data
            ).subscribe(response => {

              if (response.status == "1") {
                this.mostrar_alerta("Registro!","Registro correcto", "top", "success");
                this.loadAlumnos();
              
              }else{
                this.mostrar_alerta("Error!","Error al registrar", "top", "danger");
                
              }
              console.log(response);
              },error => {
                this.mostrar_alerta("Error!","Error al registrar", "top", "danger");
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

  async editar_alumno(alumno){
    const alert = await this.alertController.create({
      header : "Editar alumno",
      inputs : [
        
        {
          name : "nombre",
          type : "text",
          placeholder : "nombre",
          value : alumno.nombre
        },

        {
          name : "direccion",
          type : "text",
          placeholder : "direccion",
          value : alumno.direccion
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
              "http://localhost/sw18actividad_segundo_corte/planeacion/tablas/api/alumnos/id/"+alumno.id,
              data
            ).subscribe(response => {

              if (response.status == "1") {
                this.mostrar_alerta("Editado!","Editado correcto", "top", "success");
                this.loadAlumnos();
              
              }else{
                this.mostrar_alerta("Error!","Error al editar", "top", "danger");
                
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


  async borrar_alumno(alumno){
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
              "http://localhost/sw18actividad_segundo_corte/planeacion/tablas/api/alumnos/id/"+alumno.id,
            ).subscribe(response => {

              if (response.status == "1") {
                this.mostrar_alerta("Borrado!","Borrado correcto", "top", "success");
                this.loadAlumnos();
              
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

  
}
