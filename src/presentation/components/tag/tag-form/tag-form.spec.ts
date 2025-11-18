import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagForm } from './undefined/tag-form/tag-form';

describe('TagForm', () => {
  let component: TagForm;
  let fixture: ComponentFixture<TagForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TagForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TagForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
