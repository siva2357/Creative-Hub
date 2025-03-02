import { SafeHtml } from "@angular/platform-browser";

  export interface UniversityResponse {
    totalUniversities: number;
    universities: University[];
  }

  export interface University {
    _id?: string;
    universityDetails: {
      universityId: string;
      universityLogo: { fileName: string; url: string };
      universityName: string;
      universityAddress: string;
      universityDescription: string;
      sanitizedUniversityDescription?: SafeHtml; // Change ty
    };
  }

