// Angular core and routing imports
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Services and components
import { SpacexService } from '../../services/spacex.service';
import { MissionfilterComponent } from '../missionfilter/missionfilter.component';
import { Launch } from '../../models/launch.interface';

// Angular Material (optional, did not use)
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
  templateUrl: './missionlist.component.html', // Linked template
  styleUrls: ['./missionlist.component.css'], // Styling
})
export class MissionlistComponent implements OnInit {
  launches: Launch[] = []; // Array to store launch data
  filterTitle: string = 'All SpaceX Launches'; // Dynamic title above cards
  noResults: boolean = false; // Show alert when no results
  showBackToTop = false; // Toggle visibility of back-to-top button

  constructor(private spacexService: SpacexService) {}

  ngOnInit(): void {
    // Load all launches initially
    this.spacexService.getAllLaunches().subscribe((data: Launch[]) => {
      this.launches = data;
      this.noResults = data.length === 0;
      this.filterTitle = 'All SpaceX Launches';
    });

    // Listen for scroll events to toggle "Back to Top" button
    window.addEventListener('scroll', this.checkScrollPosition, true);
  }

  ngOnDestroy(): void {
    // Clean up scroll event listener to avoid memory leaks
    window.removeEventListener('scroll', this.checkScrollPosition, true);
  }

  /**
   * Called when filters are applied. Fetches filtered launches and updates UI.
   */
  applyFilters(filters: any): void {
    this.spacexService
      .getFilteredLaunches(filters)
      .subscribe((data: Launch[]) => {
        this.launches = data;
        this.noResults = data.length === 0;
        this.updateFilterTitle(filters);
      });
  }

  /**
   * Updates the H1 title based on active filters.
   */
  updateFilterTitle(filters: any): void {
    const parts: string[] = ['All SpaceX Launches'];

    // Add year if selected
    if (filters.launch_year) {
      parts.push(`- ${filters.launch_year}`);
    }

    // Add launch success status if selected
    if (
      filters.launch_success === true ||
      filters.launch_success === false ||
      filters.launch_success === 'True' ||
      filters.launch_success === 'False'
    ) {
      parts.push(`- Successful Launch - ${filters.launch_success}`);
    }

    // Add land success status if selected
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

  /**
   * Show "Back to Top" button only after scrolling down a bit.
   */
  checkScrollPosition = (): void => {
    this.showBackToTop = window.pageYOffset > 800;
  };

  /**
   * Scroll smoothly to the top of the page.
   */
  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
