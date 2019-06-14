import { Component, OnInit } from '@angular/core';
import { StorageAnimalService } from 'src/app/services/storage-animal.service';

@Component({
  selector: 'app-lista-pedido',
  templateUrl: './lista-pedido.page.html',
  styleUrls: ['./lista-pedido.page.scss'],
})
export class ListaPedidoPage implements OnInit {

  constructor(private storage: StorageAnimalService) { }
  
  animais = Array<any>();

  ngOnInit() {
    this.inicializaPedido();
  }

  inicializaPedido(){
    this.storage.getItem().then( itens => {
      
      if(itens){
        for(let i=0; i<itens.length; i++){
          this.animais.push(itens[i][0].animal);
          this.animais[i]['qtdDoses'] = itens[i][0].qtde;
        }
      }
      console.log(itens);
      console.log(this.animais);
    });
  }

}
