import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  editedItem: Ingredient;

  editedItemIndex: number;

  editMode = false;

  @ViewChild('f', {static: true}) shoppingListform: NgForm;

  subscription: Subscription;

  constructor(
    private shoppingListService: ShoppingListService
  ) { }

  ngOnInit() {

    this.subscription = this.shoppingListService.startedEditing.subscribe( (index: number) => {

      this.editedItemIndex = index;

      this.editMode = true;

      this.editedItem = this.shoppingListService.getIngredient( index );

      this.shoppingListform.setValue({
        name: this.editedItem.name,
        amount: this.editedItem.amount
      })

    });

  }

  onAddItem( form: NgForm ) {

    const value = form.value;

    const newIngredient = new Ingredient( value.name, value.amount );

    this.shoppingListService.addIngredient( newIngredient );

  }

  ngOnDestroy() {

    this.subscription.unsubscribe();

  }

}
