export interface Login {
  email: string;          // Email address
  password: string;       // Password for the account
}

// Define the expected response structure after login
export interface LoginResponse {
  _id?: string;
  role: string;           // The role of the user (recruiter, seeker, admin, etc.)
  username?: string;      // Optional username field (if returned from the backend)
  token?: string;         // Optional field if the backend returns a token (e.g., JWT)
  email?: string;         // Optional email field (if returned from the backend)
  profilePicture?: {     // Optional profile picture if applicable
      fileName: string;
      url: string;
  };
  userId?: string;        // Optional user ID, if returned from the backend
}
