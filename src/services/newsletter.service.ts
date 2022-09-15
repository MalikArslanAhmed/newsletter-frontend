import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { apis } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NewsletterService {
  baseUrl: string = apis.baseUrl
  constructor(
    public http: HttpClient,
  ) {

  }

  addEmail(data: any): Observable<any> {
    const url = `${this.baseUrl}/add-email`

    return this.http.post<any>(url, data)
  }

  deleteEmail(data: any): Observable<any> {
    const url = `${this.baseUrl}/unsubscribe-email`

    return this.http.post<any>(url, data)
  }
}
