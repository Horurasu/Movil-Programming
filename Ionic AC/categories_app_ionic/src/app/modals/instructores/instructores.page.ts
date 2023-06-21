import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-instructores',
  templateUrl: './instructores.page.html',
  styleUrls: ['./instructores.page.scss'],
})
export class InstructoresPage implements OnInit {

  instructores = []

  constructor(
    private http : HttpClient,
    public alertController: AlertController,
    public modalController: ModalController,
    private toastCtrl : ToastController
  ) { }

  
  ngOnInit() {
    this.loadInstructores();
  }


  loadInstructores(){
    
    this.http.get<any>('http://localhost/sw18actividad_segundo_corte/planeacion/tablas/api/instructores')
    .subscribe(response => {
        this.instructores  = response.data;
      console.log(response);
    }); 

  }

  closeModal(){
    this.modalController.dismiss();
  }

  async new_instructor(){
    const alert = await this.alertController.create({
      header : "Nuevo Instructor",
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
              "http://localhost/sw18actividad_segundo_corte/planeacion/tablas/api/instructores",
              data
            ).subscribe(response => {

              if (response.status == "1") {
                this.mostrar_alerta("Registro!","Registro correcto", "top", "success");
                this.loadInstructores();
              
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

  async editar_instructor(instructor){
    const alert = await this.alertController.create({
      header : "Editar Instructor",
      inputs : [
        
        {
          name : "nombre",
          type : "text",
          placeholder : "nombre",
          value : instructor.nombre
        },

        {
          name : "direccion",
          type : "text",
          placeholder : "direccion",
          value : instructor.direccion
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
              "http://localhost/sw18actividad_segundo_corte/planeacion/tablas/api/instructores/id/"+instructor.id,
              data
            ).subscribe(response => {

              if (response.status == "1") {
                this.mostrar_alerta("Editado!","Editado correcto", "top", "success");
                this.loadInstructores();
              
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


  async borrar_instructor(instructor){
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
              "http://localhost/sw18actividad_segundo_corte/planeacion/tablas/api/instructores/id/"+instructor.id,
            ).subscribe(response => {

              if (response.status == "1") {
                this.mostrar_alerta("Borrado!","Borrado correcto", "top", "success");
                this.loadInstructores();
              
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
