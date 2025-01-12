import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionLoadingComponent } from './action-loading.component';

describe('ActionLoadingComponent', () => {
  let component: ActionLoadingComponent;
  let fixture: ComponentFixture<ActionLoadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActionLoadingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ActionLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
