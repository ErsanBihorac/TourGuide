import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuideHome } from './guide-home';

describe('GuideHome', () => {
  let component: GuideHome;
  let fixture: ComponentFixture<GuideHome>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuideHome]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuideHome);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
