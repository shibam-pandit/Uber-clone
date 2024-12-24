# /users/register Endpoint

### Description
Registers a new user in the system.

### Request
• Method: POST  
• Path: `/users/register`  
• Body (JSON):
```json
{
  "firstname": "string",
  "lastname": "string",
  "email": "string (must be a valid email)",
  "password": "string (min length 6)"
}
```

### Response
• Status `201`: User created successfully.  
• Status `400`: Validation errors (email format, minimum lengths, etc.).  
• Status `500`: Server error.

# /users/login Endpoint

### Description
Authenticates user credentials and returns the user object on success. Sets a session cookie for authenticated actions.

### Request
• Method: POST  
• Path: `/users/login`  
• Body (JSON):
```json
{
  "email": "string (must be a valid email)",
  "password": "string (min length 6)"
}
```

### Response
• Status `200`: User authenticated successfully.  
  ```json
  {
    "user": {
      "id": "1",
      "firstname": "John",
      "lastname": "Doe",
      "email": "john.doe@example.com"
    }
  }
  ```
• Status `400`: Validation errors (email format, minimum lengths, etc.).  
• Status `401`: Invalid email or password.  
• Status `500`: Server error.

# /users/logout Endpoint

### Description
Logs out the authenticated user. Requires the session cookie to be sent.

### Request
• Method: POST  
• Path: `/users/logout`

### Response
• Status `200`: Logged out successfully.  
• Status `500`: Server error.

# /users/profile Endpoint

### Description
Fetches the profile of the authenticated user. Requires the session cookie to be sent.

### Request
• Method: GET  
• Path: `/users/profile`  

### Response
• Status `200`: Returns the user profile.  
  ```json
  {
    "user": {
      "id": "1",
      "firstname": "John",
      "lastname": "Doe",
      "email": "john.doe@example.com"
    }
  }
  ```
• Status `401`: Unauthorized, user not authenticated.  
• Status `500`: Server error.