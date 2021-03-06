import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Components
import { AlertComponent } from './alert/alert.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';

// Directives
import { DropDownDirective } from './dropdown.directive';
import { PlaceholderDirective } from './placeholder/placeholder.directive';
import { LoggingService } from '../logging.service';

@NgModule({
    declarations: [
        AlertComponent,
        DropDownDirective,
        LoadingSpinnerComponent,
        PlaceholderDirective
    ],
    imports: [
        CommonModule
    ],
    exports: [
        AlertComponent,
        CommonModule,
        DropDownDirective,
        LoadingSpinnerComponent,
        PlaceholderDirective
    ],
    entryComponents: [
        AlertComponent
    ],
    providers: [
        LoggingService
    ]
})
export class SharedModule {}
