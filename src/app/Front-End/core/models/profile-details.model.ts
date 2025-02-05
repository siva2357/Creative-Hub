export interface Recruiter {
  _id?: string;
    profileDetails: {
        basicDetails: {
            fullName: string;
            userName: string;
            email: string;
            gender:string;
        },

        contactDetails: {
            phoneNumber: string;
            streetAddress: string;
            city: string;
            state: string;
            country:string;
            pincode: string;
        },

        professionalDetails: {
            companyName: string;
            department: string;
            designation: string;
            jobLevel: string;
            experience:string;
            employeeCode: string;
        },

        bioDetails: {
            bio: string;
        }

        profileDetails: {
            profilePicture:  { fileName: string; url: string };  // Path or URL for the profile picture
        }
    };
}


export interface Seeker {
     _id?: string;
    profileDetails: {
        basicDetails: {
            fullName: string;
            userName: string;
            email: string;
            gender:string;
        },
        contactDetails: {
            phoneNumber: string;
            streetAddress: string;
            city: string;
            state: string;
            country:string;
            pincode: string;
        },
        educationDetails: {
            institute: string;
            degree: string;
            department: string;
            branch: string;
            yearsOfStudying: string;
            instituteRollNumber: string;
        },
        bioDetails: {
            bio: string;
        }
        profileDetails: {
            profilePicture:  { fileName: string; url: string };  // Path or URL for the profile picture
        }
    };
}





export interface SocialMedia {
    seekerId:string;
    _id?: string;
      socialMediaDetails: {
        socialMediaProfile: string;
        socialMediaLink: string;
      };
  }
  
  export interface TechnicalSkills {
    seekerId:string;
      _id?: string;
        skillDetails: {
          skillSet: string;
          proficiency: string;
      };
  }
  
  
  export interface Languages {
    seekerId:string;
      _id?: string;
        languageDetails: {
          language: string;
          proficiency: string;
      };
  }
  
  
  export interface Subjects {
    seekerId:string;
      _id?: string;
        subjectDetails: {
          subject: string;
          semester:string;
          percentage: string;
      };
  }
  
  export interface Certifications {
    seekerId:string;  
    _id?: string;
        certificationDetails: {
          courseName: string;
          associatedAuthority:string;
          certificationURL: string;
          certificationDate: string;
          ceritificationDescription:string;
          certificateUpload:{ fileName: string; url: string };
      };
  }
  
  
  export interface Resume {
    seekerId:string;
      _id?: string;
        resumeDetails: {
          resumeTitle:String;
          resumeUpload: { fileName: string; url: string };  // Changed from Array to Object
          createdAt:Date;
      };
  }