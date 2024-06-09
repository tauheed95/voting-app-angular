import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Constant } from '../constant/constant';

@Injectable({
  providedIn: 'root'
})
export class VoteService {
  
  constructor(private http: HttpClient) { }

  vote(voterId: number, candidateId: number): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${Constant.API_END_POINT + Constant.METHODS.VOTE}?voterId=${voterId}&candidateId=${candidateId}`, null, { headers });
  }
}