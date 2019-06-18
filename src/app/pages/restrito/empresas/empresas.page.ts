import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { EmpresaService } from 'src/app/services/empresa.service';
import { ToastController, IonInfiniteScroll } from '@ionic/angular';
import { AnimalDetalhesPage } from '../../animal-detalhes/animal-detalhes.page';


@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.page.html',
  styleUrls: ['./empresas.page.scss'],
})
export class EmpresasPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  
  empresas = Array<any>();
  inicio: number;
  limite: number;

  constructor(private router: Router,
              private empresaService: EmpresaService,
              private toastCtrl: ToastController) { 
    this.inicio = 0;
    this.limite = 10;
  }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.getEmpresas();
  }

  addEmpresa(){
    this.router.navigate(['add-empresa']);
  }

  getEmpresas(){
    let body = {
      ask: 'getEmpresas',
      inicio: this.inicio,
      limite: this.limite
    };

    this.habilitarScroll(true);

    this.empresaService.apiEmpresas(body, 'api-argen-empresas.php').subscribe(data => {

      if(data.rows==0){
        this.habilitarScroll(false);
        this.presentToast('Nenhum registro retornado.');
      }
      else {
        if(this.inicio == 0){
          this.empresas = data.result;
        }
        else{
        // adicionar ao SCROLL os novos animais.
          for(let i=0; i<data.result.length; i++){
            this.empresas.push(data.result[i]);
          }

          if (data.rows < this.limite) {
            this.habilitarScroll(false);
            this.inicio = 0;
            this.presentToast('Últimos registros retornados.');
          }
        }
      }
    });
  }

  excluirEmpresa(cod_empresa){
    let body = {
      ask: 'delEmpresa',
      cod_empresa: cod_empresa
    };

console.log(body);

    this.empresaService.apiEmpresas(body, 'api-argen-empresas.php').subscribe(data => {
      if(data.success){
        this.presentToast('Empresa excluída.');

        for (let i = 0; i < this.empresas.length; i++) {
          if (this.empresas[i].cod_empresa == cod_empresa) {
            this.empresas.splice(i, 1);
          }
        }
    
        this.inicio = 0;
        this.getEmpresas();
      }else{
       this.presentToast('Erro: ' + data.msg);
      }
      });
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

  loadData(event) {
    setTimeout(() => {
      this.inicio += this.limite;
      //if (this.nomeAnimal == '' && this.idCategoria == 0) this.getAnimais();
      //else this.getAnimaisByFilter(this.nomeAnimal);
      this.getEmpresas();
      event.target.complete();
    }, 1000);
  }



}
