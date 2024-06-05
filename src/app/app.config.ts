import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { VoterService } from './services/voter.service';
import { CandidateService } from './services/candidate.service';
import { routes } from './app.routes';


export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), VoterService, CandidateService]
};
