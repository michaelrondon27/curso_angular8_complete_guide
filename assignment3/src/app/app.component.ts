import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  // styleUrls: ['./app.component.css']
  styles: [`
    .white {
      color: white;
    }
  `]
})
export class AppComponent {

  array = [];

  show = false;

  toggle() {

    this.show = !this.show;

    // this.array.push(this.array.length + 1);

    this.array.push(new Date());

  }

}
