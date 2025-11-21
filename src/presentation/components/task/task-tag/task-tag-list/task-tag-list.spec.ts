import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskTagList } from './task-tag-list';

describe('TaskTagList', () => {
  let component: TaskTagList;
  let fixture: ComponentFixture<TaskTagList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskTagList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskTagList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
