import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { PhotoComponent } from './photo/photo.component';
import { PhotoDetailsComponent } from './photo-details/photo-details.component';
import { PhotoFormComponent } from './photo-form/photo-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EditPhotoFormComponent } from './edit-photo-form/edit-photo-form.component';
import { PageNotFoundErrorComponent } from './page-not-found-error/page-not-found-error.component';
import { ErrorDialogComponent } from './error-dialog/error-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [ 
    AppComponent,
    HomeComponent,
    PhotoComponent,
    PhotoDetailsComponent,
    PhotoFormComponent,
    EditPhotoFormComponent,
    PageNotFoundErrorComponent,
    ErrorDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ScrollingModule,
    ReactiveFormsModule,
    MatDialogModule
  ],
  providers: [], 
  bootstrap: [AppComponent] 
})
export class AppModule { }
