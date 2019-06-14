import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  pages = [
    {
      titulo: 'Lista de Animais',
      url: '/menu/animais'
    },
    {
      titulo: 'Restrito',
      url: './restrito/tabs'
    }
  ];

  selectedPath = '';
  
  constructor(private router: Router) { 
    this.router.events.subscribe((event: RouterEvent) => {
      if(event && event.url){
        this.selectedPath = event.url;
      }
    });
  }

  ngOnInit() {
  }

}
