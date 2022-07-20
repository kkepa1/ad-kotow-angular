import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatsAdoptionFormComponent } from './cats-adoption-form.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { CatsAdoptionService } from './cats-adoption.service';
import { AdoptionData } from '../model';

describe('CatsAdoptionFormComponent', () => {
  let component: CatsAdoptionFormComponent;
  let fixture: ComponentFixture<CatsAdoptionFormComponent>;
  let catsAdoptionService: CatsAdoptionService;

  const events = {
    input: 'input',
    blur: 'blur'
  };

  const selectors = {
    nameInput: 'input#name',
    phoneInput: 'input#phone',
    submit: 'button[type="submit"]',
    errorMsg: 'div.alert-danger'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule
      ],
      declarations: [CatsAdoptionFormComponent]
    }).compileComponents();

    catsAdoptionService = TestBed.inject(CatsAdoptionService);
    fixture = TestBed.createComponent(CatsAdoptionFormComponent);
    component = fixture.componentInstance;
    component.catsName = 'Puszek';
    fixture.detectChanges();
  });

  it('should submit correct form', () => {
    const element: HTMLElement = fixture.debugElement.nativeElement;

    // given
    spyOn(catsAdoptionService, 'adopt');
    const nameInput: HTMLInputElement = element.querySelector(selectors.nameInput);
    const phoneInput: HTMLInputElement = element.querySelector(selectors.phoneInput);
    const expectedAdoption: AdoptionData = {
      catsName: 'Puszek',
      personName: 'Billy Butcher',
      personPhone: '003 54 12 956'
    };

    // when
    nameInput.value = 'Billy Butcher';
    nameInput.dispatchEvent(new Event(events.input));
    nameInput.dispatchEvent(new Event(events.blur));

    phoneInput.value = '003 54 12 956';
    phoneInput.dispatchEvent(new Event(events.input));
    phoneInput.dispatchEvent(new Event(events.blur));
    fixture.detectChanges();

    const submitButton: HTMLElement = element.querySelector(selectors.submit);
    submitButton.click();
    fixture.detectChanges();

    // then
    expect(catsAdoptionService.adopt).toHaveBeenCalledWith(expectedAdoption);
  });

  it('should detect invalid phone', () => {
    const element: HTMLElement = fixture.debugElement.nativeElement;

    // given
    spyOn(catsAdoptionService, 'adopt');
    const nameInput: HTMLInputElement = element.querySelector(selectors.nameInput);
    const phoneInput: HTMLInputElement = element.querySelector(selectors.phoneInput);

    // when
    nameInput.value = 'Billy Butcher';
    nameInput.dispatchEvent(new Event(events.input));
    nameInput.dispatchEvent(new Event(events.blur));

    phoneInput.value = '00';
    phoneInput.dispatchEvent(new Event(events.input));
    phoneInput.dispatchEvent(new Event(events.blur));
    fixture.detectChanges();

    // then
    const submitButton: HTMLElement = element.querySelector(selectors.submit);
    expect(submitButton.getAttribute('disabled')).toEqual('');

    const errorMsg: HTMLElement = element.querySelector(selectors.errorMsg);
    expect(errorMsg).toBeTruthy();

    expect(catsAdoptionService.adopt).not.toHaveBeenCalled();
  });
});
