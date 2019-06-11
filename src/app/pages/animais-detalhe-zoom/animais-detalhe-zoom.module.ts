import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AnimaisDetalheZoomPage } from './animais-detalhe-zoom.page';

const routes: Routes = [
  {
    path: '',
    component: AnimaisDetalheZoomPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AnimaisDetalheZoomPage]
})
export class AnimaisDetalheZoomPageModule {}
