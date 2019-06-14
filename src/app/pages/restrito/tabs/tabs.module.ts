import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TabsPage } from './tabs.page';
import { ListaPedidoPageModule } from "./../lista-pedido/lista-pedido.module";
import { PerfilPageModule } from "./../perfil/perfil.module";

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'lista-pedido',
        loadChildren: '../lista-pedido/lista-pedido.module#ListaPedidoPageModule'
      },
      {
        path: 'perfil',
        loadChildren: '../perfil/perfil.module#PerfilPageModule'
      }      
    ]
  },
  {
    path: '',
    redirectTo: 'tabs/lista-pedido',
    pathMatch: 'full'
  } 
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TabsPage]
})
export class TabsPageModule {}
