import { Component, OnInit } from '@angular/core';
import { StorageAnimalService } from 'src/app/services/storage-animal.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-lista-pedido',
  templateUrl: './lista-pedido.page.html',
  styleUrls: ['./lista-pedido.page.scss'],
})
export class ListaPedidoPage implements OnInit {

  constructor(private storage: StorageAnimalService, 
              public toastCtrl: ToastController,) { }

  animais = Array<any>();

  ngOnInit() {
  }

  ionViewWillEnter() {
    console.log('lista pedido');
    this.inicializaPedido();
  }

  inicializaPedido() {
    this.animais = [];

    this.storage.getItem().then(itens => {
      if (itens) {
        for (let i = 0; i < itens.length; i++) {
          this.animais[i] = itens[i];
        }
      }
    });
  }


  atualizarLista() {
    this.storage.addItem(this.animais);
    this.inicializaPedido();
    this.presentToast("Lista atualizada.");
  }


  excluirAnimal(cod_animal) {
    for (let i = 0; i < this.animais.length; i++) {
      if (this.animais[i].animal.cod_animal == cod_animal) {
        this.animais.splice(i, 1);
      }
    }
    this.storage.addItem(this.animais);
    this.inicializaPedido();
    this.presentToast("Item excluído da lista. Lista atualizada.");
  }

  async presentToast(msg: string) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 3000
    });
    toast.present();
  }



}
