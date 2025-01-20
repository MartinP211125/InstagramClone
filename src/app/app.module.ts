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

@NgModule({
  declarations: [ 
    AppComponent,
    HomeComponent,
    PhotoComponent,
    PhotoDetailsComponent,
    PhotoFormComponent,
    EditPhotoFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ScrollingModule,
    ReactiveFormsModule
  ],
  providers: [], 
  bootstrap: [AppComponent] 
})
export class AppModule { }
