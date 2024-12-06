export interface Recruiter {
    registrationDetails: {
        signupDetails: {
            fullName: string;       // Full name of the recruiter
            userName: string;       // Unique username for the recruiter
            email: string;          // Email address
            password: string;       // Password for the account
            confirmPassword: string; // Confirm the password
        };
        profileDetails: {
            profilePicture: string;  // Path or URL for the profile picture
        };
    };
}


export interface Seeker {
    registrationDetails: {
        signupDetails: {
            fullName: string;       // Full name of the recruiter
            userName: string;       // Unique username for the recruiter
            email: string;          // Email address
            password: string;       // Password for the account
            confirmPassword: string; // Confirm the password
        };
        profileDetails: {
            profilePicture: string;  // Path or URL for the profile picture
        };
    };
}
