import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EpdContainerComponent } from './epd-container.component';

describe('EpdContainerComponent', () => {
  let component: EpdContainerComponent;
  let fixture: ComponentFixture<EpdContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EpdContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EpdContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
