// Interface representing the structure of a SpaceX launch object
export interface Launch {
  // Unique identifier for the launch
  flight_number: number;

  // Name of the mission
  mission_name: string;

  // Year the launch took place (as string, e.g., "2020")
  launch_year: string;

  // Optional details or description of the mission
  details: string;

  // Rocket information used in the launch
  rocket: {
    rocket_name: string; // Name of the rocket (e.g., "Falcon 9")
    rocket_type: string; // Type of the rocket (e.g., "FT")
  };

  // Launch site information
  launch_site: {
    site_name_long: string; // Full name of the launch site
  };

  // External links related to the mission
  links: {
    mission_patch_small: string; // URL to a small mission patch image
    article_link: string; // URL to an article about the launch
    wikipedia: string; // Wikipedia page for the mission
    video_link: string; // Video link (typically YouTube)
  };
}
