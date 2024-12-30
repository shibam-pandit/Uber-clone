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

# /captains/register Endpoint

### Description
Registers a new captain in the system.

### Request
• Method: POST  
• Path: `/captains/register`  
• Body (JSON):
```json
{
  "firstname": "string",
  "lastname": "string",
  "email": "string (must be a valid email)",
  "password": "string (min length 6)",
  "color": "string",
  "plate": "string",
  "capacity": "number",
  "vehicleType": "string (must be either car, motorcycle, or auto)"
}
```

### Response
• Status `201`: Captain created successfully.  
• Status `400`: Validation errors (email format, minimum lengths, etc.).  
• Status `500`: Server error.

# /captains/login Endpoint

### Description
Authenticates captain credentials and returns the captain object on success. Sets a session cookie for authenticated actions.

### Request
• Method: POST  
• Path: `/captains/login`  
• Body (JSON):
```json
{
  "email": "string (must be a valid email)",
  "password": "string (min length 6)"
}
```

### Response
• Status `200`: Captain authenticated successfully.  
  ```json
  {
    "captain": {
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

# /captains/logout Endpoint

### Description
Logs out the authenticated captain. Requires the session cookie to be sent.

### Request
• Method: GET  
• Path: `/captains/logout`

### Response
• Status `200`: Logged out successfully.  
• Status `500`: Server error.

# /captains/profile Endpoint

### Description
Fetches the profile of the authenticated captain. Requires the session cookie to be sent.

### Request
• Method: GET  
• Path: `/captains/profile`  

### Response
• Status `200`: Returns the captain profile.  
  ```json
  {
    "captain": {
      "id": "1",
      "firstname": "John",
      "lastname": "Doe",
      "email": "john.doe@example.com"
    }
  }
  ```
• Status `401`: Unauthorized, captain not authenticated.  
• Status `500`: Server error.