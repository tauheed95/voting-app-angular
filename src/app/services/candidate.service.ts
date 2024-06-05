import { Injectable } from '@angular/core';
   import { HttpClient } from '@angular/common/http';
   import { Observable } from 'rxjs';
   import { Candidate } from '../models/candidate';
   import { Constant } from '../constant/constant';

   @Injectable({
     providedIn: 'root'
   })
   export class CandidateService {
    
     constructor(private http: HttpClient) { }

     getCandidates(): Observable<Candidate[]> {
       return this.http.get<Candidate[]>(Constant.API_END_POINT + Constant.METHODS.GET_ALL_CANDIDATES);
     }

     addCandidate(candidate: Candidate): Observable<Candidate> {
       return this.http.post<Candidate>(Constant.API_END_POINT + Constant.METHODS.ADD_CANDIDATE, candidate);
     }

     updateCandidate(candidate: Candidate): Observable<void> {
       return this.http.put<void>(`${Constant.API_END_POINT + Constant.METHODS.UPDATE_CANDIDATE}/${candidate.id}`, candidate);
     }
   }