import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { Ingredient } from '../shared/ingredient.model';
import * as fromShopingList from './store/shopping-list.reducer';
import * as ShoppingListActions from './store/shopping-list.actions';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients: Observable<{ ingredients: Ingredient[] }>;

  private subscription: Subscription;

  constructor(
    private store: Store<fromShopingList.AppState>
  ) { }

  ngOnInit() {

    this.ingredients  = this.store.select('shoppingList');

    // this.ingredients = this.shoppingListService.getIngredients();

    // this.subscription = this.shoppingListService.ingredientsChanged.subscribe( (ingredients: Ingredient[]) => {

    //   this.ingredients = ingredients;

    // });

  }

  onEditItem( index: number ) {

    // this.shoppingListService.startedEditing.next( index );

    this.store.dispatch(new ShoppingListActions.StartEdit(index));

  }

  ngOnDestroy() {

    // this.subscription.unsubscribe();

  }

}
