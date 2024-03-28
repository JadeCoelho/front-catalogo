import { Injectable } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';
import { Catalogo } from './catalogo';
import { HttpClient } from '@angular/common/http';
import { environment } from './environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CatalogoService {

  // url = 'http://localhost:8000/catalogos'

  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient){}

  lerCatalogos(): Observable<Catalogo[]>{
    return this.http.get<Catalogo[]>(this.apiUrl).pipe(
      map((q) => q),
      catchError((e) => this.error(e))
    )
  }
  private error(error: any): Observable<any> {
    console.error(error);
    throw error;
  }
}
