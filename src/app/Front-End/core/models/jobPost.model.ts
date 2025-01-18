export interface JobPost {
    _id?: string;
    jobId: string;
    jobRoleTitle: string;
    jobType: string;
    jobLevel: string;
    category: string;
    skills: string;
    proficiency: string;
    language: string;
    salary: string;
    experience: number;
    location: string;
    vacancy: number;
    benefits: string;
    postedOn: Date;
    applyByDate: Date;
    jobDescription: string;
    status?: string;
  }
  