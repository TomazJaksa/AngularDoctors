import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { DoctorListComponent } from './doctor-list.component';
import { DoctorService } from '../../services/doctor.service';
import { Doctor } from '../../models/doctor.model';
import { RouterTestingModule } from '@angular/router/testing';

describe('DoctorListComponent', () => {
  let component: DoctorListComponent;
  let fixture: ComponentFixture<DoctorListComponent>;
  let mockDoctorService: jasmine.SpyObj<DoctorService>;

  beforeEach(async () => {
    // Create a spy for DoctorService
    const spyService = jasmine.createSpyObj('DoctorService', ['getDoctors']);

    await TestBed.configureTestingModule({
      // For a standalone component, we put it in imports:
      imports: [
        DoctorListComponent,
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        { provide: DoctorService, useValue: spyService }
      ]
    }).compileComponents();

    mockDoctorService = TestBed.inject(DoctorService) as jasmine.SpyObj<DoctorService>;
  });

  beforeEach(() => {
    // Create the component fixture
    fixture = TestBed.createComponent(DoctorListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch doctors on init', () => {
    const mockDoctors: Doctor[] = [
      {
        id: 1,
        name: 'Test Doc',
        username: 'testdoc',
        email: 'test@example.com',
        phone: '123-456',
        website: 'test.com',
        address: {
          street: 'Kulas Light',
          suite: 'Apt. 556',
          city: 'Gwenborough',
          zipcode: '92998-3874',
          geo: { lat: '-37.3159', lng: '81.1496' }
        },
        company: {
          name: 'Company1',
          catchPhrase: 'Neural net...',
          bs: 'harness real-time e-markets'
        }
      }
    ];

    mockDoctorService.getDoctors.and.returnValue(of(mockDoctors));

    // Trigger ngOnInit
    fixture.detectChanges();

    // Check that we got the doctors
    expect(component.doctors).toEqual(mockDoctors);
    expect(mockDoctorService.getDoctors).toHaveBeenCalledTimes(1);
  });

  it('should navigate to doctor details on viewDoctor', () => {
    // Because we used RouterTestingModule, we can track navigation events
    const navigateSpy = spyOn((component as any).router, 'navigate');

    component.viewDoctor(5);
    expect(navigateSpy).toHaveBeenCalledWith(['/doctor', 5]);
  });
});
