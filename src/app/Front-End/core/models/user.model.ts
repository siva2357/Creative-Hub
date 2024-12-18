export interface Recruiter {
    registrationDetails: {
        signupDetails: {
            fullName: string; 
            userName: string; 
            gender: string; 
            email: string;      
            password: string;    
            confirmPassword?: string;
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
            departmentName: string;  
            designation: string;  
            jobLevel: string;  
            experience:string;
            companyId: string;
        },

        bioDetails: {
            bio: string; 
        }
        
        profileDetails: {
            profilePicture: string;  // Path or URL for the profile picture
        }
    };
}


export interface Seeker {
    registrationDetails: {
        signupDetails: {
            fullName: string; 
            userName: string; 
            gender: string; 
            email: string;      
            password: string;    
            confirmPassword?: string;

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
            instituteName: string;   
            departmentName: string;
            programOrDegree: string;  
            branchOrSpecialization: string;  
            instituteRollNumber: string;
        },
        bioDetails: {
            bio: string; 
        }
        profileDetails: {
            profilePicture: string;  // Path or URL for the profile picture
        }
    };
}
