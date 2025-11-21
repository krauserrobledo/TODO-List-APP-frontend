import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskCategories } from './task-categories-list';

describe('TaskCategories', () => {
  let component: TaskCategories;
  let fixture: ComponentFixture<TaskCategories>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskCategories]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskCategories);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
