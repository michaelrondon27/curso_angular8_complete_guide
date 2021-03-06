import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, switchMap } from 'rxjs/operators';

import { Recipe } from '../recipe.model';
import * as fromApp from '../../store/app.reducer';
import * as RecipesAction from '../store/recipe.actions';
import * as ShoppingListActions from '../../shopping-list/store/shopping-list.actions';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  id: number;

  recipe: Recipe;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit() {

    this.activatedRoute.params.pipe(
      map(params => {
        return +params['id'];
      }),
      switchMap( id => {
        this.id = id;

        return this.store.select('recipes');
      }),
      map( recipesState => {
        return recipesState.recipes.find( (recipe, index) => {

          return index === this.id;

        });
      })
    ).subscribe( recipe => {
        this.recipe = recipe;
    });

  }

  onAddToShoppingList() {

    this.store.dispatch(new ShoppingListActions.AddIngredients( this.recipe.ingredients ));

  }

  onEditRecipe() {

    this.router.navigate(['edit'], {relativeTo: this.activatedRoute});

  }

  onDeleteRecipe() {

    this.store.dispatch(new RecipesAction.DeleteRecipe( this.id ));

    this.router.navigate(['/recipes']);

  }

}
