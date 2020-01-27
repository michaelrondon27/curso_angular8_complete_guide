import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  answer = '';

  defaultQuestion = 'pet';

  genders = ['male', 'female'];

  @ViewChild('f', {static: true}) signupForm: NgForm;

  suggestUserName() {

    const suggestedName = 'Superuser';

    // this.signupForm.setValue({
    //   userData: {
    //     username: suggestedName,
    //     email: ''
    //   },
    //   secret: 'pet',
    //   questionAnswer: '',
    //   gender: 'male'
    // });

    this.signupForm.form.patchValue({
      userData: {
        username: suggestedName
      }
    });

  }

  // onSubmit( form: NgForm ) {

  //   console.log(form);

  // }

  onSubmit() {

    console.log(this.signupForm);

  }

}
