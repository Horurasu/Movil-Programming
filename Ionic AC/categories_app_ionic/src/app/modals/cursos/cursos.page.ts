import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.page.html',
  styleUrls: ['./cursos.page.scss'],
})
export class CursosPage implements OnInit {

  cursos = []

  constructor(
    private http : HttpClient,
    public alertController: AlertController,
    public modalController: ModalController,
    private toastCtrl : ToastController
  ) { }


  
  ngOnInit() {
    this.loadCursos();
  }


  loadCursos(){
    
    this.http.get<any>('http://localhost/sw18actividad_segundo_corte/planeacion/tablas/api/cursos')
    .subscribe(response => {
        this.cursos  = response.data;
      console.log(response);
    }); 

  }

  closeModal(){
    this.modalController.dismiss();
  }

  async new_curso(){
    const alert = await this.alertController.create({
      header : "Nuevo Curso",
      inputs : [
        
        {
          name : "titulo",
          type : "text",
          placeholder : "titulo"
        },

        {
          name : "duracion",
          type : "text",
          placeholder : " Duracion: 00:00:00"
        },

        {
          name : "precio",
          type : "text",
          placeholder : "Precio: 00.00"
        },

        {
          name : "descripcion",
          type : "text",
          placeholder : "descripcion"
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
              "http://localhost/sw18actividad_segundo_corte/planeacion/tablas/api/cursos",
              data
            ).subscribe(response => {

              if (response.status == "1") {
                this.mostrar_alerta("Registro!","Registro correcto", "top", "success");
                this.loadCursos();
              
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

  
  async editar_curso(curso){
    const alert = await this.alertController.create({
      header : "Editar Ubicacion",
      inputs : [
        
        {
          name : "titulo",
          type : "text",
          placeholder : "titulo",
          value : curso.titulo
        },

        {
          name : "duracion",
          type : "text",
          placeholder : "duracion",
          value : curso.duracion
        },

        {
          name : "precio",
          type : "text",
          placeholder : "precio",
          value : curso.precio
        },

        {
          name : "descripcion",
          type : "text",
          placeholder : "descripcion",
          value : curso.descripcion
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
              "http://localhost/sw18actividad_segundo_corte/planeacion/tablas/api/cursos/id/"+curso.id,
              data
            ).subscribe(response => {

              if (response.status == "1") {
                this.mostrar_alerta("Editado!","Editado correcto", "top", "success");
                this.loadCursos();
              
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


  async borrar_curso(curso){
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
              "http://localhost/sw18actividad_segundo_corte/planeacion/tablas/api/cursos/id/"+curso.id,
            ).subscribe(response => {

              if (response.status == "1") {
                this.mostrar_alerta("Borrado!","Borrado correcto", "top", "success");
                this.loadCursos();
              
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
