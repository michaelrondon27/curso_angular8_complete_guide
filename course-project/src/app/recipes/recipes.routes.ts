import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


// Components
import { RecipesComponent } from './recipes.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';

// Guard
import { AuthGuard } from '../auth/auth.guard';

// Resolvers
import { RecipesResolver } from './recipes.resolver';

const routes: Routes = [
    {
        path: 'recipes',
        component: RecipesComponent,
        canActivate: [
            AuthGuard
        ],
        children: [
            {
                path: '',
                component: RecipeStartComponent
            },
            {
                path: 'new',
                component: RecipeEditComponent
            },
            {
                path: ':id',
                component: RecipeDetailComponent,
                resolve: [
                    RecipesResolver
                ]
            },
            {
                path: ':id/edit',
                component: RecipeEditComponent,
                resolve: [
                    RecipesResolver
                ]
            }
        ]
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class RecipesRoutes {}
