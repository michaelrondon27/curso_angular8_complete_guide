import { Component } from '@angular/core';
import { trigger, state, style } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  animations: [
    trigger('divState', [
      state('normal', style({
        backgroundColor: 'red',
        transform: 'translateX(0)'
      })),
      state('highlighted', style({
        backgroundColor: 'blue',
        transform: 'translateX(100px)'
      }))
    ])
  ]
})
export class AppComponent {

  list = [
    'Milk',
    'Sugar',
    'Bread'
  ];

  state = 'normal';

  onAdd( item ) {

    this.list.push( item );

  }

  onAnimate() {

    this.state === 'normal' ? this.state = 'highlighted' : this.state = 'normal';

  }

  onDelete( item ) {

    this.list.splice( this.list.indexOf(item), 1 );

  }

}
