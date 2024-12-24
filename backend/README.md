
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