import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BattleScreenBossComponent } from './battle-screen-boss.component';

describe('BattleScreenBossComponent', () => {
  let component: BattleScreenBossComponent;
  let fixture: ComponentFixture<BattleScreenBossComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BattleScreenBossComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BattleScreenBossComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
