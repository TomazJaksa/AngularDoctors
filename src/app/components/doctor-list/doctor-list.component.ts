import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../../services/doctor.service';
import { Router, RouterModule } from '@angular/router';
import { Doctor } from '../../models/doctor.model';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';  

@Component({
  selector: 'app-doctor-list',
  standalone: true,
  imports: [CommonModule, RouterModule, MatTableModule, MatCardModule, MatToolbarModule, MatButtonModule, MatIconModule], // ✅ Ensure RouterModule is correctly imported
  templateUrl: './doctor-list.component.html',
  styleUrls: ['./doctor-list.component.css']
})
export class DoctorListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'email', 'phone', 'website', 'actions'];
  doctors: Doctor[] = [];

  constructor(private doctorService: DoctorService, private router: Router) { }

  ngOnInit(): void {
    this.doctorService.getDoctors().subscribe((data: Doctor[]) => {
      this.doctors = data;
    });
  }

  viewDoctor(id: number): void {
    this.router.navigate(['/doctor', id]);
  }
}
