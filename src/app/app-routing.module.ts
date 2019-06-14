import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  //{ path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
    { path: '', loadChildren: './pages/menu/menu.module#MenuPageModule' },
    { path: 'animais/:id', loadChildren: './pages/animal-detalhes/animal-detalhes.module#AnimalDetalhesPageModule' },      
    { path: 'animais-detalhe-zoom', loadChildren: './pages/animais-detalhe-zoom/animais-detalhe-zoom.module#AnimaisDetalheZoomPageModule' },
    // path: '', redirectTo:'./pages/menu/menu.module#MenuPageModule', pathMatch: 'full' },
 /*  { path: '', redirectTo:'animais', pathMatch: 'full' }, 
  { path: 'animais', loadChildren: './pages/animais/animais.module#AnimaisPageModule' },
  { path: 'animais/:id', loadChildren: './pages/animal-detalhes/animal-detalhes.module#AnimalDetalhesPageModule' },
  { path: 'animais-detalhe-zoom', loadChildren: './pages/animais-detalhe-zoom/animais-detalhe-zoom.module#AnimaisDetalheZoomPageModule' },
  { path: 'menu', loadChildren: './pages/menu/menu.module#MenuPageModule' },
*/
 ];

 @NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
