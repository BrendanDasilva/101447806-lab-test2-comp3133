import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SpacexService } from '../../services/spacex.service';
import { MissionfilterComponent } from '../missionfilter/missionfilter.component';
import { Launch } from '../../models/launch.interface';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-missionlist',
  standalone: true,
  imports: [
    CommonModule,
    MissionfilterComponent,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
  ],
  templateUrl: './missionlist.component.html',
  styleUrls: ['./missionlist.component.css'],
})
export class MissionlistComponent implements OnInit {
  launches: Launch[] = [];

  constructor(private spacexService: SpacexService) {}

  ngOnInit(): void {
    this.spacexService.getAllLaunches().subscribe((data: Launch[]) => {
      this.launches = data;
    });
  }

  applyFilters(filters: any): void {
    this.spacexService
      .getFilteredLaunches(filters)
      .subscribe((data: Launch[]) => {
        this.launches = data;
      });
  }
}
