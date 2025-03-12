import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { DoctorDetailComponent } from './doctor-detail.component';
import { DoctorService } from '../../services/doctor.service';
import { Doctor } from '../../models/doctor.model';
import { Task } from '../../models/task.model';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('DoctorDetailComponent', () => {
  let component: DoctorDetailComponent;
  let fixture: ComponentFixture<DoctorDetailComponent>;
  let mockDoctorService: jasmine.SpyObj<DoctorService>;

  beforeEach(async () => {
    const spyService = jasmine.createSpyObj('DoctorService', [
      'getDoctorById',
      'getTasksForDoctor'
    ]);

    // We'll mock the route param to be "1"
    const mockActivatedRoute = {
      snapshot: {
        paramMap: {
          get: () => '1'
        }
      }
    };

    await TestBed.configureTestingModule({
      // Standalone component -> must go in imports, not declarations
      imports: [
        DoctorDetailComponent,
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        { provide: DoctorService, useValue: spyService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    }).compileComponents();

    mockDoctorService = TestBed.inject(DoctorService) as jasmine.SpyObj<DoctorService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorDetailComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch doctor and tasks on init', () => {
    const mockDoctor: Doctor = {
      id: 1,
      name: 'John Smith',
      username: 'jsmith',
      email: 'jsmith@example.com',
      phone: '555-5555',
      website: 'smith.com',
      address: {
        street: 'Some Street',
        suite: 'Apt. 101',
        city: 'TestCity',
        zipcode: '12345',
        geo: { lat: '0.0', lng: '0.0' }
      },
      company: {
        name: 'TestCorp',
        catchPhrase: 'We do tests!',
        bs: 'testing synergy'
      }
    };

    const mockTasks: Task[] = [
      { userId: 1, id: 101, title: 'Task 101', completed: false },
      { userId: 1, id: 102, title: 'Task 102', completed: true }
    ];

    // Provide the mock responses
    mockDoctorService.getDoctorById.and.returnValue(of(mockDoctor));
    mockDoctorService.getTasksForDoctor.and.returnValue(of(mockTasks));

    // Trigger ngOnInit
    fixture.detectChanges();

    // Check the results
    expect(component.doctor).toEqual(mockDoctor);
    expect(component.doctorDataSource.data).toEqual([mockDoctor]);
    expect(component.tasks).toEqual(mockTasks);

    expect(mockDoctorService.getDoctorById).toHaveBeenCalledWith(1);
    expect(mockDoctorService.getTasksForDoctor).toHaveBeenCalledWith(1);
  });

  it('should handle invalid ID gracefully', () => {
    // By default, the mock returns '1'. For this test, we force it to return null:
    spyOn(component['route'].snapshot.paramMap, 'get').and.returnValue(null);

    const consoleSpy = spyOn(console, 'error');

    // Manually trigger ngOnInit:
    fixture.detectChanges();

    expect(consoleSpy).toHaveBeenCalledWith('Invalid doctor ID');
    expect(mockDoctorService.getDoctorById).not.toHaveBeenCalled();
    expect(mockDoctorService.getTasksForDoctor).not.toHaveBeenCalled();
  });

  it('should handle errors from service calls', () => {
    mockDoctorService.getDoctorById.and.returnValue(throwError(() => new Error('Test Doctor Error')));
    mockDoctorService.getTasksForDoctor.and.returnValue(throwError(() => new Error('Test Tasks Error')));

    const consoleSpy = spyOn(console, 'error');

    fixture.detectChanges();

    expect(consoleSpy).toHaveBeenCalledWith('Error fetching doctor:', jasmine.any(Error));
    expect(consoleSpy).toHaveBeenCalledWith('Error fetching tasks:', jasmine.any(Error));
  });
});
