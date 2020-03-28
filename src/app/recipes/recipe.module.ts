import { NgModule } from '@angular/core';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeItemComponent } from './recipe-item/recipe-item.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeComponent } from './recipes.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { RecipeResolverService } from './recipe-solver.service';
import { ComponentEditGuard } from '../shared/component.guard';
import { AuthGuard } from '../auth/auth.guard';

export const recipeRoutes: Routes = [
  {path: '', component: RecipeComponent, canActivate: [AuthGuard], children: [
    {path: '', component: RecipeStartComponent},
    {path: 'new', component: RecipeEditComponent},
    {path: ':id', component: RecipeDetailComponent,
  resolve: [RecipeResolverService]},
    {path: ':id/edit', component: RecipeEditComponent,
    canDeactivate: [ComponentEditGuard],
    resolve: [RecipeResolverService]}
  ]}
];

@NgModule({
  imports: [
    RouterModule.forChild(recipeRoutes),
    SharedModule
  ],
  declarations: [
    RecipeDetailComponent,
    RecipeItemComponent,
    RecipeListComponent,
    RecipeComponent,
    RecipeStartComponent,
    RecipeEditComponent
  ],
  exports: [RouterModule]
})
export class RecipeModule {

}
