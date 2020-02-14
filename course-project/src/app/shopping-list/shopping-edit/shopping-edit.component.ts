import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import * as ShoppingListActions from '../store/shopping-list.actions';

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
    private store: Store<{ shoppingList: { ingredients: Ingredient[] } }>
  ) { }

  ngOnInit() {

    this.subscription = this.shoppingListService.startedEditing.subscribe( (index: number) => {

      this.editedItemIndex = index;

      this.editMode = true;

      this.editedItem = this.shoppingListService.getIngredient( index );

      this.shoppingListform.setValue({
        name: this.editedItem.name,
        amount: this.editedItem.amount
      });

    });

  }

  onSubmit( form: NgForm ) {

    const value = form.value;

    const newIngredient = new Ingredient( value.name, value.amount );

    if ( this.editMode ) {

      this.shoppingListService.updateIngredient( this.editedItemIndex, newIngredient );

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

  }

  onDelete() {

    this.shoppingListService.deleteIngredient( this.editedItemIndex );

    this.onClear();

  }

  ngOnDestroy() {

    this.subscription.unsubscribe();

  }

}
