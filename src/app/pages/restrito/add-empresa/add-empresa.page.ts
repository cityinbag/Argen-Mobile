import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { EmpresaService } from 'src/app/services/empresa.service';

@Component({
  selector: 'app-add-empresa',
  templateUrl: './add-empresa.page.html',
  styleUrls: ['./add-empresa.page.scss'],
})
export class AddEmpresaPage implements OnInit {

  formGroup: FormGroup;
  
  constructor(private formBuilder: FormBuilder, 
              private empresaService: EmpresaService,
              private toastCtrl :ToastController) { 
    
    this.formGroup = this.formBuilder.group({
      'nome_empresa': [null, Validators.compose([
                             Validators.required
                      ])],
      'cnpj_empresa': [null, Validators.compose([
                             Validators.required
                      ])],
    })
  }

  ngOnInit() {
  }

  cadastrar(){

    let body = {
      ask: 'addEmpresa',
      nome_empresa: this.formGroup.value.nome_empresa,
      cnpj_empresa: this.formGroup.value.cnpj_empresa
    };
    console.log(body);

    this.empresaService.apiEmpresas(body, 'api-argen-empresas.php').subscribe(data => {
      if(data.success){
        this.presentToast("Empresa adicionada.");
      }
      else{
        this.presentToast("Erro: " + data.msg);
      }
    });
  }

  async presentToast(msg: string) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 3000
    });
    toast.present();
  }

}
