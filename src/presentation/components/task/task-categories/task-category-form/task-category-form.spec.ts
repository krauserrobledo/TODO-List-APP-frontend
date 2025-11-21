import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskCategoryForm } from './task-category-form';

describe('TaskCategoryForm', () => {
  let component: TaskCategoryForm;
  let fixture: ComponentFixture<TaskCategoryForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskCategoryForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskCategoryForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
