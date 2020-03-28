import { Component, OnInit, ComponentFactoryResolver, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceHolderDirective } from '../shared/placeholder.directive';
import * as fromApp from '../store/app.reducer';
import * as fromActions from './store/auth.actions';
import { Store, select } from '@ngrx/store';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {
  isLoggedInMode = false;
  isLoading = false;
  error: string = null;
  @ViewChild(PlaceHolderDirective) alertHost: PlaceHolderDirective;

  private closeSub: Subscription;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.store.select('auth').subscribe(
      authState => {
        this.error = authState.authError;
        this.isLoading = authState.isLoading;
        if (this.error) {
          this.showErrorAlert(this.error);
        }
      }
    );
  }

  onSwitchMode() {
    this.isLoggedInMode = !this.isLoggedInMode;
  }

  authenticate(form: NgForm) {
    if (!form.valid) { return; }
    const email = form.value.email;
    const password = form.value.password;

    this.isLoading = true;
    if (this.isLoggedInMode) {
      this.store.dispatch(new fromActions.LoginInUser({email, password}));
    } else {
     this.store.dispatch(new fromActions.SignUpUSer({email, password}));
    }

    form.reset();
  }

  private showErrorAlert(message: string) {
    const alertCompFactory = this.componentFactoryResolver.resolveComponentFactory(
      AlertComponent
    );
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();

    const componentRef = hostViewContainerRef.createComponent(alertCompFactory);
    componentRef.instance.message = message;
    this.closeSub = componentRef.instance.closeHandler.subscribe(
      () => {
        this.closeSub.unsubscribe();
        hostViewContainerRef.clear();
      }
    );

  }

  ngOnDestroy() {
    // this.closeSub.unsubscribe();
  }

}
