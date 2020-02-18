import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { Store } from '@ngrx/store';

import { User } from './user.model';
import * as fromApp from './../store/app.reducer';
import * as AuthActions from './store/auth.actions';

export interface AuthResponseData {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private tokenExpirationTimer: any;

    constructor(
        private store: Store<fromApp.AppState>
    ) {}

    autoLogin() {

        const userData: {
            email: string,
            id: string,
            _token: string,
            _tokenExpirationDate: string
        } = JSON.parse(localStorage.getItem('userData'));

        if ( !userData ) {

            return;

        }

        const loadedUser = new User(
            userData.email,
            userData.id,
            userData._token,
            new Date(userData._tokenExpirationDate)
        );

        if ( loadedUser.token ) {

            this.store.dispatch(new AuthActions.AuthencicateSuccess({
                email: loadedUser.email,
                userId: loadedUser.id,
                token: loadedUser.token,
                expirationDate: new Date(userData._tokenExpirationDate)
            }));

            const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();

            this.autoLogout( expirationDuration );

        }

    }

    logout() {

        this.store.dispatch(new AuthActions.Logout());

        localStorage.removeItem('userData');

        if ( this.tokenExpirationTimer ) {

            clearTimeout(this.tokenExpirationTimer);

        }

    }

    autoLogout( experationDuration: number ) {

        console.log(experationDuration);

        this.tokenExpirationTimer = setTimeout( () => {

            this.logout();

        }, experationDuration);

    }

    private handleAuthentication( email: string, userId: string, token: string, expiresIn: number ) {

        const expirationDate = new Date( new Date().getTime() + expiresIn * 1000);

        const user = new User(
            email,
            userId,
            token,
            expirationDate
        );

        this.store.dispatch(new AuthActions.AuthencicateSuccess({
            email,
            userId,
            token,
            expirationDate
        }));

        this.autoLogout( expiresIn * 1000 );

        localStorage.setItem('userData', JSON.stringify(user));

    }

    private handleError( errorRes: HttpErrorResponse ) {

        let errorMessage = 'An unknown error ocurred!';

        if ( !errorRes.error || !errorRes.error.error ) {

            return throwError(errorMessage);

        }

        switch (errorRes.error.error.message) {

            case 'EMAIL_EXISTS':
                errorMessage = 'This email exists already';
                break;

            case 'EMAIL_NOT_FOUND':
                errorMessage = 'This email does not exist.';
                break;

            case 'INVALID_PASSWORD':
                errorMessage = 'This password is not correct';
                break;

        }

        return throwError(errorMessage);

    }

}
