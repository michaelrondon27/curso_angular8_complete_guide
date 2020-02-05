import { Component } from "@angular/core";
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';

import { AuthService, AuthResponseData } from './auth.service';
@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent {

    error: string = null;

    isLoading = false;

    isLoginMode = true;

    constructor(
        private authSevice: AuthService
    ) {}

    onSwitchMode() {

        this.isLoginMode = !this.isLoginMode;

    }

    onSubmit( form: NgForm ) {

        if ( !form.valid ) {
            return;
        }

        const email = form.value.email;

        const password = form.value.password;

        this.isLoading = true;

        let authObs: Observable<AuthResponseData>;

        if ( this.isLoginMode ) {

            authObs = this.authSevice.login( email, password );

        } else {

            authObs = this.authSevice.signup( email, password );

        }

        authObs.subscribe( resData => {

            console.log(resData);

            this.isLoading = false;

        }, errorMessage => {

            this.error = errorMessage;

            this.isLoading = false;

        });


        form.reset();

    }

}
