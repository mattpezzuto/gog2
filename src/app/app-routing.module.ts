// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TitleScreenComponent } from './title-screen/title-screen.component';

const routes: Routes = [
  { path: '', component: TitleScreenComponent },  // Default route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],  // Ensure this is set to forRoot
  exports: [RouterModule],
})
export class AppRoutingModule {}
