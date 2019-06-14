import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MenuPage } from './menu.page';
import { AnimaisPageModule} from "../animais/animais.module";
import { TabsPageModule} from "../restrito/tabs/tabs.module";

const routes: Routes = [
  {
    path: 'menu',
    component: MenuPage,
    children: [
      {
        path: 'animais',
        loadChildren: '../animais/animais.module#AnimaisPageModule'
      },
      {
        path: 'restrito',
        loadChildren: '../restrito/tabs/tabs.module#TabsPageModule'
      }      
    ]
  },
  {
    path: '',
    redirectTo: 'menu/animais',
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
  declarations: [MenuPage]
})
export class MenuPageModule {}
