import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddEmailComponent } from './add-email/add-email.component';
import { AddNewsletterComponent } from './add-newsletter/add-newsletter.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UIHelpers } from 'src/helpers/ui-helpers';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { NewsletterService } from 'src/services/newsletter.service';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [
    AppComponent,
    AddEmailComponent,
    AddNewsletterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    HttpClientModule
  ],
  providers: [
    UIHelpers,
    NewsletterService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
