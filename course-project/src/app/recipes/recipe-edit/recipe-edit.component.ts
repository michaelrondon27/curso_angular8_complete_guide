import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import * as fromApp from '../../store/app.reducer';
import * as RecipesAction from '../store/recipe.actions';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit, OnDestroy {

  editMode = false;

  id: number;

  recipeForm: FormGroup;

  private storeSub: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit() {

    this.activatedRoute.params.subscribe( (params: Params) => {

      this.id = +params['id'];

      this.editMode = params['id'] != null;

      this.initForm();

    });

  }

  onSubmit() {

    if ( this.editMode ) {

      this.store.dispatch(new RecipesAction.UpdateRecipe({ index: this.id, newRecipe: this.recipeForm.value }));

    } else {

      this.store.dispatch(new RecipesAction.AddRecipe(this.recipeForm.value));

    }

    this.onCancel();

  }

  onAddIngredient() {

    (this.recipeForm.get('ingredients') as FormArray).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
      })
    );

  }

  onDeleteIngredient( index: number ) {

    (this.recipeForm.get('ingredients') as FormArray).removeAt( index );

  }

  onCancel() {

    this.router.navigate(['../'], {relativeTo: this.activatedRoute});

  }

  private initForm() {

    let recipeName = '';

    let recipeImagePath = '';

    let recipeDescription = '';

    let recipeIngredients = new FormArray([]);

    if ( this.editMode ) {

      this.storeSub = this.store.select('recipes').pipe(
        map( recipeState => {
          return recipeState.recipes.find( (recipe, index) => {

            return index === this.id;

          });
        })
      ).subscribe( recipe => {
        recipeName = recipe.name;

        recipeImagePath = recipe.imagePath;

        recipeDescription = recipe.description;

        if ( recipe['ingredients'] ) {

          for ( let ingredient of recipe.ingredients ) {

            recipeIngredients.push(new FormGroup({
              'name': new FormControl(ingredient.name, Validators.required),
              'amount': new FormControl(ingredient.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
            }));

          }

        }
      });

    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeImagePath, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'ingredients': recipeIngredients
    });

  }

  get controls() {

    return (this.recipeForm.get('ingredients') as FormArray).controls;

  }

  ngOnDestroy() {

    if ( this.storeSub ) {

      this.storeSub.unsubscribe();

    }

  }

}
