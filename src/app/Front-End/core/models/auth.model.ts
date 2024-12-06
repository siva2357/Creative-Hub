export interface Login {
    email: string;          // Email address
    password: string;       // Password for the account
}


// Define the expected response structure after login
export interface LoginResponse {
    role: string;       // The role of the user (recruiter, seeker, admin, etc.)
    username?: string;  // Optional username field (if returned from the backend)
    token?: string;     // Optional field if the backend returns a token (e.g., JWT)
    // Add more fields if the backend returns more data
}
