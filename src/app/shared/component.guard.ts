import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { RecipeEditComponent } from '../recipes/recipe-edit/recipe-edit.component';
import { Observable } from 'rxjs';

export interface CanDeactivateComponent {
  canDeactivate: () => UrlTree | boolean | Observable<boolean | UrlTree> | Promise<boolean | UrlTree>;
}
@Injectable({
  providedIn: 'root'
})

export class ComponentEditGuard implements CanDeactivate<CanDeactivateComponent> {
  canDeactivate(
    component: CanDeactivateComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): UrlTree | boolean | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
      return component.canDeactivate();

  }
}
