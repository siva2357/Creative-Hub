export interface Admin {
  _id?: string;
  role?:string;
  registrationDetails: {
    fullName: string;
    userName: string;
    email: string;
    password: string;
    confirmPassword?: string;
    profilePicture: { fileName: string; url: string };
  };

}



export interface Recruiter {
  _id?: string;
  role?:string;
  registrationDetails: {
    fullName: string;
    userName: string;
    email: string;
    password: string;
    confirmPassword?: string;
    profilePicture: { fileName: string; url: string };
  };

}





export interface Seeker {
  _id?: string;
  role?:string;
  registrationDetails: {
    fullName: string;
    userName: string;
    email: string;
    password: string;
    confirmPassword?: string;
    profilePicture: { fileName: string; url: string };
  };

}

