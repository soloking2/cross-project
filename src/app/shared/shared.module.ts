import { CommonModule } from '@angular/common';
import { LoadSpinnerComponent } from './load-spinner/load-spinner.component';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertComponent } from './alert/alert.component';
import { PlaceHolderDirective } from './placeholder.directive';
import { HighlightTextDirective } from '../highlight-text.directive';
import { UnlessDirective } from './unless.directive';
import { DropdownDirective } from './dropdown.directive';

@NgModule({
  declarations: [
    LoadSpinnerComponent,
    AlertComponent,
    PlaceHolderDirective,
    HighlightTextDirective,
    UnlessDirective,
    DropdownDirective
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    LoadSpinnerComponent,
    AlertComponent,
    PlaceHolderDirective,
    DropdownDirective
  ],
  entryComponents: [AlertComponent]
})

export class SharedModule {}
