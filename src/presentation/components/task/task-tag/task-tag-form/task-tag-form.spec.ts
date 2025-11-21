import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskTag } from './task-tag-form';

describe('TaskTag', () => {
  let component: TaskTag;
  let fixture: ComponentFixture<TaskTag>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskTag]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskTag);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
