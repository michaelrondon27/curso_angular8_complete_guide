import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import { take } from 'rxjs/operators';

import { Recipe } from './recipe.model';
import * as fromApp from '../store/app.reducer';
import * as RecipesActions from './store/recipe.actions';

@Injectable({
    providedIn: 'root'
})
export class RecipesResolver implements Resolve<Recipe[]> {

    constructor(
        private store: Store<fromApp.AppState>,
        private actions$: Actions
    ) {}

    resolve( route: ActivatedRouteSnapshot, state: RouterStateSnapshot ) {

        this.store.dispatch(new RecipesActions.FetchRecipes());

        return this.actions$.pipe(
            ofType(RecipesActions.SET_RECIPES),
            take(1)
        );

    }

}
