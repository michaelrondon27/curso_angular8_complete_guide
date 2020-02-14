import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import * as fromShopingList from './store/shopping-list.reducer';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients: Observable<{ ingredients: Ingredient[] }>;

  private subscription: Subscription;

  constructor(
    private shoppingListService: ShoppingListService,
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

    this.shoppingListService.startedEditing.next( index );

  }

  ngOnDestroy() {

    // this.subscription.unsubscribe();

  }

}
