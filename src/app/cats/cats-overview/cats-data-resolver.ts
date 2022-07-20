import { Injectable } from '@angular/core';
import { CatsDataService } from '../cats-data.service';
import { Cat } from '../model';
import { Observable } from 'rxjs';
import { Resolve } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CatsDataResolver implements Resolve<Cat[]> {

  constructor(private dataService: CatsDataService) {
  }

  resolve(): Observable<Cat[]> {
    return this.dataService.getCatsData();
  }
}
