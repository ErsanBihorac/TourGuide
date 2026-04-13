import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromoterHome } from './promoter-home';

describe('PromoterHome', () => {
  let component: PromoterHome;
  let fixture: ComponentFixture<PromoterHome>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PromoterHome]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PromoterHome);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
