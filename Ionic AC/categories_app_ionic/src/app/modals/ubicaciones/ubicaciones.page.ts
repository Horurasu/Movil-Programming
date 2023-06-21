import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import Swal from 'sweetalert2';
 

@Component({
  selector: 'app-ubicaciones',
  templateUrl: './ubicaciones.page.html',
  styleUrls: ['./ubicaciones.page.scss'],
})
export class UbicacionesPage implements OnInit {

  ubicaciones = []

  constructor(
    private http : HttpClient,
    public alertController: AlertController,
    public modalController: ModalController,
    private toastCtrl : ToastController
  ) { }

  ngOnInit() {
    this.loadUbicaciones();
  }


  loadUbicaciones(){
    
    this.http.get<any>('http://localhost/sw18actividad_segundo_corte/planeacion/tablas/api/ubicaciones')
    .subscribe(response => {
        this.ubicaciones  = response.data;
      console.log(response);
    }); 

  }

  closeModal(){
    this.modalController.dismiss();
  }

  async new_ubicacion(){
    const alert = await this.alertController.create({
      header : "Nueva Ubicacion",
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
              "http://localhost/sw18actividad_segundo_corte/planeacion/tablas/api/ubicaciones",
              data
            ).subscribe(response => {

              if (response.status == "1") {
                this.mostrar_alerta("Registro!","Registro correcto", "top", "success");
                this.loadUbicaciones();
              
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

  
  async editar_ubicacion(ubicacion){
    const alert = await this.alertController.create({
      header : "Editar Ubicacion",
      inputs : [
        
        {
          name : "nombre",
          type : "text",
          placeholder : "nombre",
          value : ubicacion.nombre
        },

        {
          name : "direccion",
          type : "text",
          placeholder : "direccion",
          value : ubicacion.direccion
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
              "http://localhost/sw18actividad_segundo_corte/planeacion/tablas/api/ubicaciones/id/"+ubicacion.id,
              data
            ).subscribe(response => {

              if (response.status == "1") {
                this.mostrar_alerta("Editado!","Editado correcto", "top", "success");
                this.loadUbicaciones();
              
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


  async borrar_ubicacion(ubicacion){
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
              "http://localhost/sw18actividad_segundo_corte/planeacion/tablas/api/ubicaciones/id/"+ubicacion.id,
            ).subscribe(response => {

              if (response.status == "1") {
                Swal.fire("","El item ha sido borrado correctamente","success");
                //this.mostrar_alerta("Borrado!","Borrado correcto", "top", "success");
                this.loadUbicaciones();
              
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
