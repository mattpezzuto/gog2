import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TavernComponent } from './tavern.component';

describe('TavernComponent', () => {
  let component: TavernComponent;
  let fixture: ComponentFixture<TavernComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TavernComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TavernComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
