import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {OpinionDto, OpinionPostDto} from "../../api-models/api-models";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class OpinionService {

  constructor(private http: HttpClient) { }

  sendOpinion(opinionPostDTO: OpinionPostDto): Observable<OpinionDto> {
    return this.http.post<OpinionDto>(environment.apiUrl + '/opinion', opinionPostDTO);
  }

  geUsersOpinions(email: string): Observable<OpinionDto[]> {
    return this.http.get<OpinionDto[]>(environment.apiUrl + '/opinion/user/' + email);
  }
}
