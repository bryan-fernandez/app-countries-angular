import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Country } from '../model/country';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private baseUrl: string = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Country[]> {
    return this.httpClient.get<Country[]>(`${this.baseUrl}/all`);
  }

  getBy(by: string, value: string): Observable<Country[]> {
    return this.httpClient.get<Country[]>(`${this.baseUrl}/${by}/${value}`);
  }
}
