import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpacexService } from '../../services/spacex.service';
import { MissionfilterComponent } from '../missionfilter/missionfilter.component';

@Component({
  selector: 'app-missionlist',
  standalone: true,
  imports: [CommonModule, MissionfilterComponent],
  templateUrl: './missionlist.component.html',
  styleUrls: ['./missionlist.component.css'],
})
export class MissionlistComponent implements OnInit {
  launches: any[] = [];

  constructor(private spacexService: SpacexService) {}

  ngOnInit(): void {
    this.spacexService.getAllLaunches().subscribe((data) => {
      this.launches = data;
    });
  }

  applyFilters(filters: any): void {
    this.spacexService.getFilteredLaunches(filters).subscribe((data) => {
      this.launches = data;
    });
  }
}
