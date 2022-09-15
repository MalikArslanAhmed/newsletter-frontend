import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEmailComponent } from './add-email/add-email.component';
import { AddNewsletterComponent } from './add-newsletter/add-newsletter.component';

const routes: Routes = [
  {
    path: '',
    component: AddEmailComponent
  },
  {
    path: 'newsletter',
    component: AddNewsletterComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
