import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Voter } from '../models/voter';
import { Constant } from '../constant/constant';

@Injectable({
    providedIn: 'root'
  })
  export class VoterService {
  
    constructor(private http: HttpClient) { }

    getVoters(): Observable<Voter[]> {
      return this.http.get<Voter[]>(Constant.API_END_POINT + Constant.METHODS.GET_ALL_VOTERS);
    }

    addVoter(voter: Voter): Observable<Voter> {
      return this.http.post<Voter>(Constant.API_END_POINT +  Constant.METHODS.ADD_VOTER, voter);
    }

    updateVoter(voter: Voter): Observable<void> {
      return this.http.put<void>(`${Constant.API_END_POINT + Constant.METHODS.UPDATE_VOTER}/${voter.id}`, voter);
    }
  }