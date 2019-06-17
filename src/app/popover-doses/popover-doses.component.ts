import { Component, OnInit } from '@angular/core';
import { NavParams, PopoverController, ToastController, Platform } from '@ionic/angular';
import { StorageAnimalService } from '../services/storage-animal.service';

@Component({
  selector: 'app-popover-doses',
  templateUrl: './popover-doses.component.html',
  styleUrls: ['./popover-doses.component.scss'],
})
export class PopoverDosesComponent implements OnInit {

  totalDoses: number;
  animais = Array<any>();

  constructor(public navParams: NavParams, public popoverCtrl: PopoverController,
              public toastCtrl: ToastController, private plt: Platform,
              public storage: StorageAnimalService) {  }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.animais.push({animal: this.navParams.data, qtdeDoses: 0});
    this.totalDoses = 0;
    this.inicializaPedido();
  }


  inicializaPedido(){
    this.storage.getItem().then( itens => {
      if(itens){ 
        for(let i=0; i<itens.length; i++){
          if(this.animais[0].animal.cod_animal == itens[i].animal.cod_animal){
            this.totalDoses = itens[i].qtdeDoses;
          }
        }
      }
    });
  }

  
  addPedido(){
    this.storage.getItem().then( itens => {
      this.animais[0].qtdeDoses = this.totalDoses;

      if(itens){ 
        let encontrou = false;
        for(let i=0; i<itens.length; i++){
          if(this.animais[0].animal.cod_animal == itens[i].animal.cod_animal){
            itens[i].qtdeDoses = this.totalDoses;
            encontrou = true;
          }
        }
        if(!encontrou){
          itens.push(this.animais[0]);
        }
        this.storage.addItem(itens);

      } else{
        this.storage.addItem(this.animais);
      }

    });
    this.popoverCtrl.dismiss();
    this.presentToast("Item adicionado a lista de pedidos atual.");
  }
  
  async presentToast(msg: string) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 3000
    });
    toast.present();
  }


}
