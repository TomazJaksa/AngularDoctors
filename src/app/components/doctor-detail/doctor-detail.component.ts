import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { DoctorService } from '../../services/doctor.service';
import { Doctor } from '../../models/doctor.model';
import { Task } from '../../models/task.model';
import { CommonModule } from '@angular/common';

// Import Angular Material Modules
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-doctor-detail',
  standalone: true,
  imports: [ RouterModule, CommonModule,
    MatCardModule,
    MatToolbarModule,
    MatDividerModule,
    MatListModule,
    MatCheckboxModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule
 ], 
  templateUrl: './doctor-detail.component.html',
  styleUrls: ['./doctor-detail.component.css']
})
export class DoctorDetailComponent implements OnInit {
  doctor: Doctor | null = null; // ✅ Initialize to null
  tasks: Task[] = [];
  doctorDataSource = new MatTableDataSource<Doctor>([]); // ✅ Use MatTableDataSource
  displayedColumns: string[] = ['email', 'phone', 'username', 'website', 'address']; // ✅ Define columns

  constructor(
    private route: ActivatedRoute,
    private doctorService: DoctorService
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (!id) {
      console.error("Invalid doctor ID");
      return;
    }

    this.doctorService.getDoctorById(id).subscribe({
      next: (data: Doctor) => {
        this.doctor = data;
        // Update the data source so it has exactly one doctor in it
        this.doctorDataSource.data = [data];
      },
      error: (err) => {
        console.error("Error fetching doctor:", err);
      }
    });

    this.doctorService.getTasksForDoctor(id).subscribe({
      next: (data: Task[]) => {
        this.tasks = data;
      },
      error: (err) => {
        console.error("Error fetching tasks:", err);
      }
    });
  }
}
