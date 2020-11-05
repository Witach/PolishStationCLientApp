import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FuelTypeService {

  constructor(private http: HttpClient) { }

  public getFuelTypes(): Observable<string[]> {
    return this.http.get<string[]>(`${environment.apiUrl}/fuel-type`);
  }
}
