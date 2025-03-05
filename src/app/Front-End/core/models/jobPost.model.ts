import { SafeHtml } from "@angular/platform-browser";

export interface Applicant {
  seekerId: string;
  appliedAt: Date;
}

export interface JobPost {
  _id?: string;
  jobPostDetails: {
    jobId: string;
    jobType: string;
    jobRoleTitle: string;
    salary: string;
    vacancy: number;
    jobDescription: string;
    sanitizedJobDescription?: SafeHtml;
    postedOn: Date;
    applyByDate: Date;
    status?: string;  // Optional, since backend defaults to "Open"
    isApplied :boolean;
  };
  recruiterId?: {
    registrationDetails?: {
      firstName?: string;
      lastName?: string;
      userName?: string;
      email?: string;
      verified?: boolean;
    };
  }
  companyId?:{
    companyDetails?: {
      companyId?: string;
      companyLogo?: { fileName: string; url: string };
      companyName?: string;
      companyAddress?: string;
      companyDescription?: string;
      sanitizedCompanyDescription?: SafeHtml; // Change ty
    };
  }

  totalApplicants? :number,
  applicants?: Applicant[];  // Array of Applicant objects

  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

export interface JobResponse {
  totalJobPosts: number;
  jobPosts: JobPost[];
}
