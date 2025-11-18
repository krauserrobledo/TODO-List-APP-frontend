import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubtaskForm } from './subtask-form';

describe('SubtaskForm', () => {
  let component: SubtaskForm;
  let fixture: ComponentFixture<SubtaskForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubtaskForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubtaskForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
