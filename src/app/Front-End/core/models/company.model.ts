import { SafeHtml } from "@angular/platform-browser";

  export interface CompanyResponse {
    totalCompanies: number;
    companies: Company[];
  }
  export interface Company {
    _id?: string;
    companyDetails: {
      companyId: string;
      companyLogo: { fileName: string; url: string };
      companyName: string;
      companyAddress: string;
      companyDescription: string;
      sanitizedCompanyDescription?: SafeHtml; // Change ty
      createdAt: Date;
    };
  }

