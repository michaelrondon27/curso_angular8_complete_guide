import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// Components
import { AuthComponent } from './auth.component';

// Modules
import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations: [
        AuthComponent
    ],
    exports: [
        AuthComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild([
            {
                path: '',
                component: AuthComponent
            }
        ]),
        SharedModule
    ]
})
export class AuthModule {}
