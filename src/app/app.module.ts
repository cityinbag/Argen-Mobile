import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy, PopoverController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule} from '@angular/common/http';
import { AnimalService } from './services/animal.service';

import { HttpModule } from '@angular/http';
import { AnimaisDetalheZoomPageModule } from './pages/animais-detalhe-zoom/animais-detalhe-zoom.module';
import { PopoverDosesComponent } from './popover-doses/popover-doses.component';
import { IonicStorageModule } from '@ionic/storage';
import { StorageAnimalService } from './services/storage-animal.service';

import {  FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent, PopoverDosesComponent],
  entryComponents: [PopoverDosesComponent],
  imports: [BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    HttpModule, 
    HttpClientModule,
    AnimaisDetalheZoomPageModule,
    IonicStorageModule.forRoot(),
    FormsModule],
  providers: [
    StatusBar,
    SplashScreen,
    AnimalService,
    StorageAnimalService,
    Storage,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
