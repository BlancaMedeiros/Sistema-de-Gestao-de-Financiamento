import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerParcelasComponent } from './container-parcelas.component';

describe('ContainerParcelasComponent', () => {
  let component: ContainerParcelasComponent;
  let fixture: ComponentFixture<ContainerParcelasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContainerParcelasComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ContainerParcelasComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
