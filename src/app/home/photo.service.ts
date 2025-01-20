import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPhoto } from './photo.model';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/photos'; 

  constructor(private http: HttpClient) { }

  getPhotos(offset: number = 0, limit: number = 9): Observable<any[]> {
    const params = new HttpParams()
      .set('_start', offset.toString())
      .set('_limit', limit.toString());

    return this.http.get<any[]>(this.apiUrl, { params });
  }

  deletePhoto(photoId: string): Observable<any> {
    return this.http.delete(this.apiUrl + "/" + photoId);
  }

  getPhoto(photoId: string): Observable<any> {
    const params = new HttpParams()
    return this.http.get<any>(this.apiUrl + "/" + photoId);
  }

  updatePhoto(photoId: string, photo: any): Observable<any> {
    const url = `${this.apiUrl}/${photoId}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<any>(url, photo, { headers });
  }

  addPhoto(photo: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(this.apiUrl, photo, { headers });
  }
}
