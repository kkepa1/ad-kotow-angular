import { Component, OnInit } from '@angular/core';
import { Cat } from '../model';
import { CatsDataService } from '../cats-data.service';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';

@Component({
  selector: 'app-cats-detail-view',
  templateUrl: './cats-detail-view.component.html',
  styleUrls: ['./cats-detail-view.component.scss']
})
export class CatsDetailViewComponent implements OnInit {

  constructor(private catsDataService: CatsDataService, private activatedRoute: ActivatedRoute) {
    this.route = activatedRoute.snapshot;
  }

  cats: Cat[] = [];
  cat: Cat;
  adoptionFormActive: boolean;
  showConfirmMsg: boolean;
  private route: ActivatedRouteSnapshot;

  ngOnInit(): void {
    const catName = this.route.params['catName'];
    this.catsDataService.getCat(catName).subscribe(data => this.cat = data);
    this.loadCats();
  }

  openAdoptionForm(): void {
    this.adoptionFormActive = true;
  }

  onFormClose(success: boolean) {
    this.adoptionFormActive = false;
    this.showConfirmMsg = success;
    this.cat.reserved = true;
  }

  private loadCats() {
    this.activatedRoute.data.subscribe(data => {
        this.cats = data['cats'];
      }
    );
  }

  getPrevious() {
    this.catsDataService.getPreviousCat(this.cat).subscribe(data => this.cat = data);
  }

  getNext() {
    this.catsDataService.getNextCat(this.cat).subscribe(data => this.cat = data);
  }
}
