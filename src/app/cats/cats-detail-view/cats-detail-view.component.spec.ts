import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatsDetailViewComponent } from './cats-detail-view.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CatsDataService } from '../cats-data.service';
import { of } from 'rxjs';

describe('CatsDetailViewComponent', () => {
  let component: CatsDetailViewComponent;
  let fixture: ComponentFixture<CatsDetailViewComponent>;

  const catsDataServiceMock = {
    getCat: jasmine.createSpy('getCatSpy').and.returnValue(of({
        name: 'Puszek',
        ageMonths: 8,
        breed: 'maine coon',
        picUrl: 'puszek1.jpg'
      }
    ))
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:
        [
          HttpClientTestingModule,
          RouterTestingModule
        ],
      declarations: [CatsDetailViewComponent],
      providers: [{provide: CatsDataService, useValue: catsDataServiceMock}]
    }).compileComponents();

    fixture = TestBed.createComponent(CatsDetailViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
