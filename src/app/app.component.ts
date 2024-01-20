import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'activity-5';

  // les elements de navbar :
  actions: Array<{ title: string, route: string, icon: string }> = [
    { title: 'Home', route: '/home', icon: 'bi-house-door-fill' },
    { title: 'Products', route: '/products', icon: 'bi-layout-wtf' },
    { title: 'New Product', route: '/newproduct', icon: 'bi-plus-circle' }
  ];
  // pour sauvgarder l'action
  currentAction : any = { title: '', route: '/', icon: '' };

  setCurrentAction (action : any){
       this.currentAction = action;
       console.log(this.currentAction)
  }

}
