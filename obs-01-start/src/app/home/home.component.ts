import { Component, OnInit, OnDestroy } from '@angular/core';
import { interval, Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  private firstObasSubscription: Subscription;

  constructor() { }

  ngOnInit() {

    // this.firstObasSubscription = interval(1000).subscribe( count => {

    //   console.log(count);

    // });

    const customIntervalObservable = Observable.create( observer => {

      let count = 0;

      setInterval( () => {
        observer.next(count);
        count++;
      }, 1000);

    });

    this.firstObasSubscription = customIntervalObservable.subscribe(data => {

      console.log(data);

    });

  }

  ngOnDestroy() {

    this.firstObasSubscription.unsubscribe();

  }

}
