import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { SharedModule } from '../shared/shared.module';

export const authRoutes: Routes = [
  {path: '', component: AuthComponent}
];
@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(authRoutes)
  ],
  declarations: [
    AuthComponent
  ],
  exports: [RouterModule]
})

export class AuthModule {
}
