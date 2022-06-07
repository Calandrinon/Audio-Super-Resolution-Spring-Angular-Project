import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluationMetricsTableComponent } from './evaluation-metrics-table.component';

describe('EvaluationMetricsTableComponent', () => {
  let component: EvaluationMetricsTableComponent;
  let fixture: ComponentFixture<EvaluationMetricsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvaluationMetricsTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EvaluationMetricsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
