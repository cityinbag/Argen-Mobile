import { Component, OnInit } from '@angular/core';
import { AnimalService } from 'src/app/services/animal.service';

import { IonInfiniteScroll, AngularDelegate, PopoverController } from '@ionic/angular';
import { ViewChild } from '@angular/core';
import { ToastController } from '@ionic/angular';

import { of, concat } from 'rxjs';
import { forEach } from '@angular/router/src/utils/collection';
import { defineDirective } from '@angular/core/src/render3';
import { findComponentView } from '@angular/core/src/render3/util';
import { Tab1PageModule } from 'src/app/tab1/tab1.module';
import { PopoverDosesComponent } from 'src/app/popover-doses/popover-doses.component';

@Component({
  selector: 'app-animais',
  templateUrl: './animais.page.html',
  styleUrls: ['./animais.page.scss'],
})
export class AnimaisPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  animais = Array<any>();
  categorias: any;
  nomeAnimal: string;
  idCategoria: number;
  inicio: number;
  limite: number;

  constructor(private animalService: AnimalService, public toastCtrl: ToastController, public popoverCtrl: PopoverController) {
    this.nomeAnimal = '';
    this.idCategoria = 0;
    this.inicio = 0;
    this.limite = 10;
    
    this.categorias = [
      {id: 0, nome: "Todas"},
      {id: 1, nome: "Raças Zebuínas"},
      {id: 2, nome: "Raças Leiteiras"},
      {id: 3, nome: "Raças Européias"},
      {id: 4, nome: "Outras Raças"},
      {id: 5, nome: "Banco Genético"}
    ];    
  }

  ngOnInit() {
    this.getAnimais();
  }

  searchAnimal(animalTerm) {
    this.inicio = 0;
    this.nomeAnimal = animalTerm.detail.value;
    this.searchFilter(this.nomeAnimal, this.idCategoria);
  }
  
  searchCategoria(categoriaTerm) {
    this.inicio = 0;
    this.idCategoria = categoriaTerm.detail.value;
    this.searchFilter(this.nomeAnimal, this.idCategoria);
  }


  searchFilter(filterAnimal, filterCategoria) {

    if (filterAnimal != '' || filterCategoria != 0) {
        this.inicio = 0;
        this.getAnimaisByFilter(filterAnimal);
    } else {
      this.getAnimais();
    }

  }


  getAnimais() {
    return new Promise(resolve => {
      let body = {
        ask: 'getAnimais',
        inicio: this.inicio,
        limite: this.limite
      };
      console.log('getAnimais');
      console.log('inicio: ' + this.inicio);
      console.log('idcategoria: ' + this.idCategoria);      
      
      this.habilitarScroll(true);

      this.animalService.apiAnimais(body, 'api-argen.php').subscribe(data => {

        if(data.rows==0){
          this.habilitarScroll(false);
          this.presentToast('Nenhum registro retornado.');
        }
        else {
          if(this.inicio == 0){
            this.animais = data.result;
          }
          else{
          // adicionar ao SCROLL os novos animais.
            for(let i=0; i<data.result.animais.length; i++){
              this.animais['animais'].push(data.result.animais[i]);
            }

            if (data.rows < this.limite) {
              this.habilitarScroll(false);
              this.inicio = 0;
              this.presentToast('Últimos registros retornados.');
            }
          }
        }
      });
    });
  }


  getAnimaisByFilter(filter_animal: string) {
    
    this.habilitarScroll(true);

    return new Promise(resolve => {
      let body = {
        ask: 'getAnimaisByFilter',
        filter_titulo: filter_animal,
        filter_categoria: this.idCategoria,
        inicio: this.inicio,
        limite: this.limite
      };

      console.log('getAnimaisByFilter');
      console.log('inicio: ' + this.inicio);
      console.log('idcategoria: ' + this.idCategoria);

      this.animalService.apiAnimais(body, 'api-argen.php').subscribe(data => {

        console.log(data);
        
        if(data.rows==0){
          if(this.animais['animais'].length>0) {
            this.animais = [];
          }
          this.habilitarScroll(false);
          this.inicio = 0;
          this.presentToast('Nenhum registro retornado para o filtro aplicado.');
        }
        else {
          if(this.inicio == 0){
            this.animais = data.result;
          }
          else{
          // adicionar ao SCROLL os novos animais.
            for(let i=0; i<data.result.animais.length; i++){
              this.animais['animais'].push(data.result.animais[i]);
            }

            if (data.rows < this.limite) {
              this.habilitarScroll(false);
              this.inicio = 0;
              this.presentToast('Últimos registros retornados para o filtro aplicado.');
            }
          }
        }
      });
    });
  }

  loadData(event) {
    setTimeout(() => {
      this.inicio += this.limite;
      if (this.nomeAnimal == '' && this.idCategoria == 0) this.getAnimais();
      else this.getAnimaisByFilter(this.nomeAnimal);
      event.target.complete();

      // App logic to determine if all data is loaded
      // and disable the infinite scroll
      //if (data.length == 1000) {
      //  event.target.disabled = true;
      //}
    }, 1000);
  }

  habilitarScroll(status: boolean) {
    this.infiniteScroll.disabled = !status;
  }

  async presentToast(msg: string) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 3000
    });
    toast.present();
  }

  async addDoses(ev: any, animal) {
    const popover = await this.popoverCtrl.create({
        component: PopoverDosesComponent,
        componentProps: animal,
        event: ev,
        animated: true,
        showBackdrop: true
    });
    return await popover.present();
  }
  

}


