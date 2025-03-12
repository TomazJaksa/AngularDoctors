import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Doctor } from '../models/doctor.model';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  private baseUrl = 'https://jsonplaceholder.typicode.com/users';

  constructor(private http: HttpClient) { }

  getDoctors(): Observable<Doctor[]> {
    return this.http.get<Doctor[]>(this.baseUrl);
  }

  getDoctorById(id: number): Observable<Doctor> {
    return this.http.get<Doctor>(`${this.baseUrl}/${id}`);
  }

  getTasksForDoctor(id: number): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.baseUrl}/${id}/todos`);
  }
}
