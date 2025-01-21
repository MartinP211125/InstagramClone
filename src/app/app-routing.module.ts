import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PhotoDetailsComponent } from './photo-details/photo-details.component';
import { HomeComponent } from './home/home.component';
import { PhotoFormComponent } from './photo-form/photo-form.component';
import { EditPhotoFormComponent } from './edit-photo-form/edit-photo-form.component';
import { PageNotFoundErrorComponent } from './page-not-found-error/page-not-found-error.component';

export const routes: Routes = [
  { path: 'details/:photo', component: PhotoDetailsComponent, title: "Photo Details." },
  { path: 'home', component: HomeComponent, title: "Home." },
  { path: 'add', component: PhotoFormComponent, title: "Add Photo" },
  { path: 'edit/:id', component: EditPhotoFormComponent, title: "Edit Photo"},
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundErrorComponent, title: "Page Not Found"}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
