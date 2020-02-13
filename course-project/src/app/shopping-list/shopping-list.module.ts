import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// Components
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { ShoppingListComponent } from './shopping-list.component';

// Modules
import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations: [
        ShoppingEditComponent,
        ShoppingListComponent
    ],
    exports: [
        ShoppingEditComponent,
        ShoppingListComponent
    ],
    imports: [
        FormsModule,
        RouterModule.forChild([
            {
                path: '',
                component: ShoppingListComponent
            }
        ]),
        SharedModule
    ]
})
export class ShoppingListModule {}
