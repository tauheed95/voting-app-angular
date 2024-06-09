import { Component, OnInit } from '@angular/core';
import { VoterService } from './services/voter.service';
import { CandidateService } from './services/candidate.service';
import { Voter } from './models/voter';
import { Candidate } from './models/candidate';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { VoteService } from './services/vote.service';

@Component({
  selector: 'app-root',
  standalone:true,
  imports: [FormsModule,CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  voters: Voter[] = [];
  candidates: Candidate[] = [];
  selectedVoterId: number | null = null;
  selectedCandidateId: number | null = null;
  newVoterName: string = '';
  newCandidateName: string = '';
  selectedVoterChangeId: string = '';
  selectedVoterChangeObject:any;
  selectedCandidateChangeId:string = '';
  selectedCandidateChangeObject:any;
  message: string = '';
  filteredVoters: Voter[] = [];
  isAddVoterModalVisible = false;
  isAddCandidateModalVisible = false;

  constructor(private voterService: VoterService, private candidateService: CandidateService, private voteService: VoteService) {}

  ngOnInit(): void {
    this.loadVoters();
    this.loadCandidates();
  }
  showAddVoterModal() {
    this.isAddVoterModalVisible = true;
  }

  hideAddVoterModal() {
    this.isAddVoterModalVisible = false;
    this.newVoterName = '';
  }
  showAddCandidateModal() {
    this.isAddCandidateModalVisible = true;
  }

  hideAddCandidateModal() {
    this.isAddCandidateModalVisible = false;
    this.newCandidateName = '';
  }
  loadVoters(): void {
    this.voterService.getVoters().subscribe(voters => {
      this.voters = voters
      this.filterVoters();
     });
  }
  filterVoters(): void {
    this.filteredVoters = this.voters.filter(voter => voter.hasVoted === false);
  }
  loadCandidates(): void {
    this.candidateService.getCandidates().subscribe(candidates => this.candidates = candidates);
  }

  addVoter(): void {
    const voter: Voter = { id: 0, name: this.newVoterName, hasVoted: false };
    if (voter.name === '' || voter.name === null || voter.name === undefined)
    {
         alert("Voter Name is required.")
    }
    else
    {
        this.voterService.addVoter(voter).subscribe(() => {
            this.loadVoters();
            this.newVoterName = '';
            this.hideAddVoterModal();
          });
    }
    
  }

  addCandidate(): void {
    const candidate: Candidate = { id: 0, name: this.newCandidateName, votes: 0 };
    if (candidate.name === '' || candidate.name === null || candidate.name === undefined)
    {
             alert("Candidate Name is required.")
    } 
    else
    {
        const IsCandidateExit = this.candidates.find(c => c.name === candidate.name);
        if (IsCandidateExit)
        {
          alert("Sorry, Candidate is already Exist!")
          this.newCandidateName = '';
        }
        else
        {
            this.candidateService.addCandidate(candidate).subscribe(() => {
                this.loadCandidates();
                this.newCandidateName = '';
                this.hideAddCandidateModal();
              });
        }
    }
    
  }
  onVoterChange(event: Event): void {
    const votertarget = event.target as HTMLSelectElement;
    this.selectedVoterChangeId = votertarget.value;
    this.selectedVoterChangeObject = this.voters.find(v => v.id === Number.parseInt(this.selectedVoterChangeId));
  }

  onCandidateChange(event: Event): void {
    const candidatetarget = event.target as HTMLSelectElement;
    this.selectedCandidateChangeId = candidatetarget.value;
    this.selectedCandidateChangeObject = this.candidates.find(v => v.id === Number.parseInt(this.selectedCandidateChangeId));
  }

  vote(): void {
    if (this.selectedVoterId && this.selectedCandidateId) {
      if (this.selectedVoterChangeObject && this.selectedCandidateChangeObject) {
        if (this.selectedVoterChangeObject.hasVoted) {
          alert("Sorry, The Voter has already voted.");
          this.selectedVoterId = null;
          this.selectedCandidateId = null;
        } else {
          this.voteService.vote(this.selectedVoterId, this.selectedCandidateId).subscribe({
            next: (response) => {
              this.message = 'Vote recorded successfully.';
              this.loadVoters();
              this.loadCandidates();
              this.selectedVoterId = null;
              this.selectedCandidateId = null;
            },
            error: (error) => {
              this.message = 'Voting operation failed. The voter might have already voted or the candidate might not exist.';
              this.loadVoters();
              this.loadCandidates();
              this.selectedVoterId = null;
              this.selectedCandidateId = null;
            }
          });
        }
      }
    } else {
      alert("Sorry, Please select proper value from dropdown!");
              this.selectedVoterId = null;
              this.selectedCandidateId = null;
    }
  }
  
}
