import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BattleScreenQuestComponent } from './battle-screen-quest.component';

describe('BattleScreenQuestComponent', () => {
  let component: BattleScreenQuestComponent;
  let fixture: ComponentFixture<BattleScreenQuestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BattleScreenQuestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BattleScreenQuestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
