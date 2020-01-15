import { Recipe } from './recipe.model';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class RecipeService {

    private recipes: Recipe[] = [
        new Recipe(
          'A Test Recipe',
          'This is simply a test',
          'https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_960_720.jpg'
        ),
        new Recipe(
          'Another Test Recipe',
          'This is simply a test',
          'https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_960_720.jpg'
        )
    ];

    getRecipes() {

        return this.recipes.slice();

    }

}
