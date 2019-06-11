import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnimalService } from 'src/app/services/animal.service';
import { ModalController } from '@ionic/angular';
import { AnimaisDetalheZoomPage } from '../animais-detalhe-zoom/animais-detalhe-zoom.page';

@Component({
  selector: 'app-animal-detalhes',
  templateUrl: './animal-detalhes.page.html',
  styleUrls: ['./animal-detalhes.page.scss'],
})
export class AnimalDetalhesPage implements OnInit {

  public animais = new Array<any>();
  public arquivos: any;
  public fotos: any;  
  public cod_animal: any;
  public server: string = 'http://www.argen.com.br/arquivos/genetica/arquivo/';

  public sliderOpts = {
    zoom: false,
    slidesPerView: 1.2,
    centeredSlides: false,
    spaceBetween: 5
    };

  constructor(private activateRoute: ActivatedRoute, 
              private animalService: AnimalService,
              private modalController: ModalController) { }

  ngOnInit() {
    this.cod_animal = <number><unknown>this.activateRoute.snapshot.paramMap.get('id');
    this.getAnimalInfo();
    this.getAnimalArquivo();
    this.getAnimalFoto();
  }

  getAnimalInfo() {
    return new Promise(resolve => {
      let body = {
        ask: 'getAnimalInfo',
        cod_animal: this.cod_animal
      };

      this.animalService.getAnimais(body, 'api-argen.php').subscribe(data => {

        if (data.success) {
          this.animais = data.result;
        }
        else {
        }
      });
    });
  }

  getAnimalArquivo() {
    return new Promise(resolve => {
      let body = {
        ask: 'getAnimalArquivo',
        cod_animal: this.cod_animal
      };

      this.animalService.getAnimais(body, 'api-argen.php').subscribe(data => {

        if (data.success) {
          this.arquivos = data.result;
        }
        else {
        }
      });
    });
  }

  
  getAnimalFoto() {
    return new Promise(resolve => {
      let body = {
        ask: 'getAnimalFoto',
        cod_animal: this.cod_animal
      };
      
      console.log('fotos');

      this.animalService.getAnimais(body, 'api-argen.php').subscribe(data => {

        console.log(data);

        if (data.success) {
          this.fotos = data.result;
        }
        else {
        }
      });
    });
  }

  getPDF(url: string) {
    window.open(this.server + url, 'blank');
  }

  openPreview(img){
    this.modalController.create({
      component: AnimaisDetalheZoomPage,
      componentProps: {
        img: img
      }
    }).then(modal => modal.present());
  }


}
