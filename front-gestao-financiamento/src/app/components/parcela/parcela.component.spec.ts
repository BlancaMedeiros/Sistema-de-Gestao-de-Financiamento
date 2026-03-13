import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParcelaComponent } from './parcela.component';

describe('ParcelaComponent', () => {
  let component: ParcelaComponent;
  let fixture: ComponentFixture<ParcelaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParcelaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ParcelaComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
