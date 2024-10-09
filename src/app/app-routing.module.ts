import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { NativeScriptRouterModule } from '@nativescript/angular';
import { ClothingListComponent } from './clothing/clothing-list.component';
import { ClothingDetailComponent } from './clothing/clothing-detail.component';
import { AddClothingComponent } from './clothing/add-clothing.component';
import { LoginComponent } from './auth/login.component';
import { RegisterComponent } from './auth/register.component';
import { ChatComponent } from './chat/chat.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'clothing', component: ClothingListComponent, canActivate: [AuthGuard] },
  { path: 'clothing/:id', component: ClothingDetailComponent, canActivate: [AuthGuard] },
  { path: 'add', component: AddClothingComponent, canActivate: [AuthGuard] },
  { path: 'chat/:id', component: ChatComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [NativeScriptRouterModule.forRoot(routes)],
  exports: [NativeScriptRouterModule],
})
export class AppRoutingModule {}