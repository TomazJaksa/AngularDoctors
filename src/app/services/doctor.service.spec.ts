import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DoctorService } from './doctor.service';
import { Doctor } from '../models/doctor.model';
import { Task } from '../models/task.model';

describe('DoctorService', () => {
  let service: DoctorService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DoctorService]
    });
    service = TestBed.inject(DoctorService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Ensures no unmatched requests remain
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all doctors (getDoctors)', () => {
    const mockDoctors: Doctor[] = [
      {
        id: 1,
        name: 'Test Doctor',
        username: 'testdoc',
        email: 'testdoc@example.com',
        phone: '555-1234',
        website: 'example.com',
        address: {
          street: 'Kulas Light',
          suite: 'Apt. 556',
          city: 'Gwenborough',
          zipcode: '92998-3874',
          geo: { lat: '-37.3159', lng: '81.1496' }
        },
        company: {
          name: 'Romaguera-Crona',
          catchPhrase: 'Multi-layered client-server neural-net',
          bs: 'harness real-time e-markets'
        }
      }
    ];

    service.getDoctors().subscribe((doctors) => {
      expect(doctors).toEqual(mockDoctors);
      expect(doctors.length).toBe(1);
    });

    const req = httpMock.expectOne('https://jsonplaceholder.typicode.com/users');
    expect(req.request.method).toBe('GET');
    req.flush(mockDoctors);
  });

  it('should fetch a single doctor by ID (getDoctorById)', () => {
    const mockDoctor: Doctor = {
      id: 2,
      name: 'Jane Smith',
      username: 'janesmith',
      email: 'jane@example.com',
      phone: '123-4567',
      website: 'smith.org',
      address: {
        street: 'Victor Plains',
        suite: 'Suite 879',
        city: 'Wisokyburgh',
        zipcode: '90566-7771',
        geo: { lat: '-43.9509', lng: '-34.4618' }
      },
      company: {
        name: 'Deckow-Crist',
        catchPhrase: 'Proactive didactic contingency',
        bs: 'synergize scalable supply-chains'
      }
    };

    service.getDoctorById(2).subscribe((doctor) => {
      expect(doctor).toEqual(mockDoctor);
    });

    const req = httpMock.expectOne('https://jsonplaceholder.typicode.com/users/2');
    expect(req.request.method).toBe('GET');
    req.flush(mockDoctor);
  });

  it('should fetch tasks for a doctor (getTasksForDoctor)', () => {
    const mockTasks: Task[] = [
      { userId: 3, id: 101, title: 'Task 1', completed: false },
      { userId: 3, id: 102, title: 'Task 2', completed: true }
    ];

    service.getTasksForDoctor(3).subscribe((tasks) => {
      expect(tasks).toEqual(mockTasks);
      expect(tasks.length).toBe(2);
    });

    const req = httpMock.expectOne('https://jsonplaceholder.typicode.com/users/3/todos');
    expect(req.request.method).toBe('GET');
    req.flush(mockTasks);
  });
});
