import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlacholderLoadingComponent } from './placholder-loading.component';

describe('PlacholderLoadingComponent', () => {
  let component: PlacholderLoadingComponent;
  let fixture: ComponentFixture<PlacholderLoadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlacholderLoadingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlacholderLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
