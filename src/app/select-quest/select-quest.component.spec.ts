import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectQuestComponent } from './select-quest.component';

describe('SelectQuestComponent', () => {
  let component: SelectQuestComponent;
  let fixture: ComponentFixture<SelectQuestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectQuestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectQuestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
