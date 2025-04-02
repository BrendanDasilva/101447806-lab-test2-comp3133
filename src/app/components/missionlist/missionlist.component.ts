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
  filterTitle: string = 'All SpaceX Launches';
  noResults: boolean = false;
  showBackToTop = false;

  constructor(private spacexService: SpacexService) {}

  ngOnInit(): void {
    this.spacexService.getAllLaunches().subscribe((data: Launch[]) => {
      this.launches = data;
      this.noResults = data.length === 0;
      this.filterTitle = 'All SpaceX Launches';
    });

    window.addEventListener('scroll', this.checkScrollPosition, true);
  }

  ngOnDestroy(): void {
    window.removeEventListener('scroll', this.checkScrollPosition, true);
  }

  applyFilters(filters: any): void {
    this.spacexService
      .getFilteredLaunches(filters)
      .subscribe((data: Launch[]) => {
        this.launches = data;
        this.noResults = data.length === 0;
        this.updateFilterTitle(filters);
      });
  }

  updateFilterTitle(filters: any): void {
    const parts: string[] = ['All SpaceX Launches'];

    if (filters.launch_year) {
      parts.push(`- ${filters.launch_year}`);
    }

    if (
      filters.launch_success === true ||
      filters.launch_success === false ||
      filters.launch_success === 'True' ||
      filters.launch_success === 'False'
    ) {
      parts.push(`- Successful Launch - ${filters.launch_success}`);
    }

    if (
      filters.land_success === true ||
      filters.land_success === false ||
      filters.land_success === 'True' ||
      filters.land_success === 'False'
    ) {
      parts.push(`- Successful Land - ${filters.land_success}`);
    }

    this.filterTitle = parts.join(' ');
  }

  checkScrollPosition = (): void => {
    this.showBackToTop = window.pageYOffset > 800;
  };

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
