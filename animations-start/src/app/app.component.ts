import { Component } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

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
      })),
      transition('normal <=> highlighted', animate(300)),
      // transition('highlighted => normal', animate(800))
    ]),
    trigger('wildState', [
      state('normal', style({
        backgroundColor: 'red',
        transform: 'translateX(0) scale(1)'
      })),
      state('highlighted', style({
        backgroundColor: 'blue',
        transform: 'translateX(100px) scale(1)'
      })),
      state('shrunken', style({
        backgroundColor: 'green',
        transform: 'translateX(0px) scale(0.5)'
      })),
      transition('normal => highlighted', animate(300)),
      transition('highlighted => normal', animate(800)),
      transition('shrunken <=> *', [
        style({
          backgroundColor: 'orange',
          borderRadius: '0'
        }),
        animate(1000, style({
          borderRadius: '50px'
        })),
        animate(500)
      ])
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

  wildState = 'normal';

  onAdd( item ) {

    this.list.push( item );

  }

  onAnimate() {

    this.state === 'normal' ? this.state = 'highlighted' : this.state = 'normal';

    this.wildState === 'normal' ? this.wildState = 'highlighted' : this.wildState = 'normal';

  }

  onDelete( item ) {

    this.list.splice( this.list.indexOf(item), 1 );

  }

  onShrink() {

    this.wildState = 'shrunken';

  }

}
