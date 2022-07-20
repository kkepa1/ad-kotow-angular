import { Component, OnInit } from '@angular/core';
import { Cat } from '../model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cats-overview',
  templateUrl: './cats-overview.component.html',
  styleUrls: ['./cats-overview.component.scss']
})
export class CatsOverviewComponent implements OnInit {
  cats: Cat[] = [];

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.loadCats();
  }

  private loadCats() {
    this.activatedRoute.data.subscribe(data => {
        this.cats = data['cats'];
      }
    );
  }

  onClick($event: Cat) {
    this.router.navigate(['cats', $event.name]);
  }

  sortByName() {
    this.cats.sort((n1,n2) => {
      if (n1.name > n2.name) {
          return 1;
      }

      if (n1.name < n2.name) {
          return -1;
      }

      return 0;
    });
  }

  sortByBreed() {
    this.cats.sort((n1,n2) => {
      if (n1.breed > n2.breed) {
          return 1;
      }

      if (n1.breed < n2.breed) {
          return -1;
      }

      return 0;
    });
  }
}
