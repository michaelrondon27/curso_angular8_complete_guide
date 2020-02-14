import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import * as ShoppingListActions from '../store/shopping-list.actions';
import * as fromShopingList from '../store/shopping-list.reducer';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  editMode = false;

  editedItem: Ingredient;

  editedItemIndex: number;

  @ViewChild('f', {static: true}) shoppingListform: NgForm;

  subscription: Subscription;

  constructor(
    private shoppingListService: ShoppingListService,
    private store: Store<fromShopingList.AppState>
  ) { }

  ngOnInit() {

    this.subscription = this.store.select('shoppingList').subscribe( stateData => {

      if ( stateData.editedIngredientIndex > -1 ) {

        this.editMode = true;

        this.editedItem = stateData.editedIngredient;

        this.shoppingListform.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        });

      } else {

        this.editMode = false;

      }

    });

  }

  onSubmit( form: NgForm ) {

    const value = form.value;

    const newIngredient = new Ingredient( value.name, value.amount );

    if ( this.editMode ) {

      // this.shoppingListService.updateIngredient( this.editedItemIndex, newIngredient );

      this.store.dispatch(new ShoppingListActions.UpdateIngredient({index: this.editedItemIndex, ingredient: newIngredient}));

    } else {

      // this.shoppingListService.addIngredient( newIngredient );

      this.store.dispatch(new ShoppingListActions.AddIngredient( newIngredient ));

    }

    this.editMode = false;

    form.reset();

  }

  onClear() {

    this.shoppingListform.reset();

    this.editMode = false;

    this.store.dispatch(new ShoppingListActions.StopEdit());

  }

  onDelete() {

    // this.shoppingListService.deleteIngredient( this.editedItemIndex );

    this.store.dispatch(new ShoppingListActions.DeleteIngredient(this.editedItemIndex));

    this.onClear();

  }

  ngOnDestroy() {

    this.subscription.unsubscribe();

    this.store.dispatch(new ShoppingListActions.StopEdit());

  }

}
