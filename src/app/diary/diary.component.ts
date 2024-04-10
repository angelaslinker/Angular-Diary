import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DiaryDataService } from '../shared/diary-data.component';
import { DiaryEntry } from '../shared/diary-entry.model';


@Component({
  selector: 'app-diary',
  templateUrl: './diary.component.html',
  styleUrl: './diary.component.css'
})
export class DiaryComponent implements OnInit {

  constructor(private diaryDataService: DiaryDataService, private router: Router) { }

  ngOnDestroy(): void {
    this.diaryEntriesSub.unsubscribe();
  }

  diaryEntries: DiaryEntry[] = [];
  diaryEntriesSub = new Subscription();

  ngOnInit(): void {
    this.diaryDataService.getDiaryEntries();
    this.diaryEntriesSub = this.diaryDataService.diarySubject.subscribe(entries => {
      this.diaryEntries = entries;
    })
  }

  onDelete(id: string) {
    this.diaryDataService.onDelete(id);
    this.diaryEntries = this.diaryDataService.diaryEntries;
  }

  onEdit(id: string) {
    this.router.navigate(["edit", id])

  }

  // getDiaryEntry(id: string) {
  //   return { ...this.diaryEntries[id] }
  // }

}

