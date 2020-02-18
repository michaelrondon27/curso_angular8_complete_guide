import { Component, ComponentFactoryResolver, ViewChild, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { AuthService, AuthResponseData } from './auth.service';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';
import * as fromApp from './../store/app.reducer';
import * as AuthActions from './store/auth.actions';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit, OnDestroy {

    private closeSub: Subscription;

    error: string = null;

    isLoading = false;

    isLoginMode = true;

    @ViewChild(PlaceholderDirective, { static: false }) alertHost: PlaceholderDirective;

    constructor(
        private authSevice: AuthService,
        private router: Router,
        private componentFactoryResolver: ComponentFactoryResolver,
        private store: Store<fromApp.AppState>
    ) {}

    ngOnInit() {

        this.store.select('auth').subscribe( authState => {

            this.isLoading = authState.loading;

            this.error = authState.authError;

        });

    }

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

            this.store.dispatch(new AuthActions.LoginStart({ email, password }));

        } else {

            authObs = this.authSevice.signup( email, password );

        }

        form.reset();

    }

    onHandleError() {

        this.error = null;

    }

    private showErrorAlert( message: string ) {

        const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory( AlertComponent );

        const hostViewContainerRef = this.alertHost.viewContainerRef;

        hostViewContainerRef.clear();

        const componentRef = hostViewContainerRef.createComponent( alertCmpFactory );

        componentRef.instance.message = message;

        this.closeSub = componentRef.instance.close.subscribe( () => {

            this.closeSub.unsubscribe();

            hostViewContainerRef.clear();

        });

    }

    ngOnDestroy() {

        if ( this.closeSub ) {

            this.closeSub.unsubscribe();

        }

    }

}
