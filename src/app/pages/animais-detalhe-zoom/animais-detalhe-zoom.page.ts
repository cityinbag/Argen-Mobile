import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-animais-detalhe-zoom',
  templateUrl: './animais-detalhe-zoom.page.html',
  styleUrls: ['./animais-detalhe-zoom.page.scss'],
})
export class AnimaisDetalheZoomPage implements OnInit {

  img: any;

  sliderOpts = {
    zoom: {
      maxRatio: 3
    }
  };

  constructor(private navParams: NavParams,
              private modalController: ModalController) { }

  ngOnInit() {
    this.img = this.navParams.get('img');
  }

  close(){
    this.modalController.dismiss();
  }

}
