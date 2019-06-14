import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
//    { path: '', redirectTo:'menu', pathMatch: 'full' },   
    { path: '', loadChildren: './pages/menu/menu.module#MenuPageModule' },
    { path: 'animais/:id', loadChildren: './pages/animal-detalhes/animal-detalhes.module#AnimalDetalhesPageModule' },      
    { path: 'animais-detalhe-zoom', loadChildren: './pages/animais-detalhe-zoom/animais-detalhe-zoom.module#AnimaisDetalheZoomPageModule' },
 ];

 @NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
