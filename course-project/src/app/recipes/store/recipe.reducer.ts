import { Recipe } from '../recipe.model';
import * as RecipesAction from './recipe.actions';

export interface State {
    recipes: Recipe[];
}

const initialState: State = {
    recipes: []
};

export function recipeReducer( state = initialState, action: RecipesAction.RecipesAction ) {

    switch ( action.type ) {

        case RecipesAction.SET_RECIPES:
            return {
                ...state,
                recipes: [...action.payload]
            };

        default:
            return state;

    }

}
