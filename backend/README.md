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
• Status `201`: User created successfully. Returns a JWT token in a cookie.  
  ```json
  {
    "token": "string",
    "user": {
      "firstname": "string",
      "email": "string"
    }
  }
  ```
• Status `400`: Validation errors (email format, minimum lengths, etc.).  
• Status `500`: Server error.

# /users/login Endpoint

### Description
Authenticates user credentials and returns the user object on success. Sets a JWT token in a cookie for authenticated actions.

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
• Status `200`: User authenticated successfully. Returns a JWT token in a cookie.  
  ```json
  {
    "token": "string",
    "user": {
      "firstname": "string",
      "email": "string"
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
• Method: GET  
• Path: `/users/logout`

### Response
• Status `200`: Logged out successfully.  
• Status `400`: User not logged in.  
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
• Status `201`: Captain created successfully. Returns a JWT token in a cookie.  
  ```json
  {
    "token": "string",
    "captain": {
      "firstname": "string",
      "email": "string"
    }
  }
  ```
• Status `400`: Validation errors (email format, minimum lengths, etc.).  
• Status `500`: Server error.

# /captains/login Endpoint

### Description
Authenticates captain credentials and returns the captain object on success. Sets a JWT token in a cookie for authenticated actions.

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
• Status `200`: Captain authenticated successfully. Returns a JWT token in a cookie.  
  ```json
  {
    "token": "string",
    "captain": {
      "firstname": "string",
      "email": "string"
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
• Status `400`: Captain not logged in.  
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

## Maps API Endpoints

### 1. Get Coordinates

**Endpoint:** `/maps/get-coordinates`

**Method:** `GET`

**Query Parameters:**
- `address` (string, required): The address to get coordinates for. Minimum length of 3 characters.

**Response:**
- `200 OK`: Returns the coordinates of the given address.
  ```json
  {
    "lat": 12.345678,
    "lon": 98.765432
  }
  ```
- `400 Bad Request`: If the address is not provided or is invalid.
  ```json
  {
    "message": "Address is required of minimum length 3 characters"
  }
  ```
- `404 Not Found`: If there is an error fetching the coordinates.
  ```json
  {
    "message": "Error fetching coordinates"
  }
  ```

### 2. Get Distance and Time

**Endpoint:** `/maps/get-distance-time`

**Method:** `GET`

**Query Parameters:**
- `origin` (string, required): The origin address. Minimum length of 3 characters.
- `destination` (string, required): The destination address. Minimum length of 3 characters.

**Response:**
- `200 OK`: Returns the distance and duration between the origin and destination.
  ```json
  {
    "distance": 12345, // in meters
    "duration": 678 // in seconds
  }
  ```
- `400 Bad Request`: If the origin or destination is not provided or is invalid.
  ```json
  {
    "message": "Origin and destination are required"
  }
  ```
- `404 Not Found`: If there is an error fetching the distance and time.
  ```json
  {
    "message": "Error fetching distance and time"
  }
  ```

### 3. Get Nearby Locations

**Endpoint:** `/maps/get-suggestions`

**Method:** `GET`

**Query Parameters:**
- `address` (string, required): The address to get nearby locations for. Minimum length of 3 characters.

**Response:**
- `200 OK`: Returns a list of nearby locations.
  ```json
  [
    {
      "name": "Location Name",
      "type": "amenity type",
      "lat": 12.345678,
      "lon": 98.765432
    },
    // ... up to 5 locations
  ]
  ```
- `400 Bad Request`: If the address is not provided or is invalid.
  ```json
  {
    "message": "Address is required of minimum length 3 characters"
  }
  ```
- `404 Not Found`: If there is an error fetching the nearby locations.
  ```json
  {
    "message": "Error fetching nearby locations suggestions"
  }
  ```

## Rides API Endpoints

### 1. Create Ride

**Endpoint:** `/rides/create`

**Method:** `POST`

**Body Parameters:**
- `pickup` (string, required): The pickup location.
- `destination` (string, required): The destination location.
- `vehicleType` (string, required): The type of vehicle (must be either `car`, `motorcycle`, or `auto`).

**Response:**
- `201 Created`: Returns the details of the created ride.
  ```json
  {
    "id": "ride_id",
    "userid": "user_id",
    "pickup": "pickup_location",
    "destination": "destination_location",
    "vehicletype": "vehicle_type",
    "fare": 123,
    "otp": 456789
  }
  ```
- `400 Bad Request`: If any required parameter is missing or invalid.
  ```json
  {
    "errors": [
      {
        "msg": "Invalid pickup location",
        "param": "pickup",
        "location": "body"
      },
      {
        "msg": "Invalid destination location",
        "param": "destination",
        "location": "body"
      },
      {
        "msg": "Invalid vehicle type",
        "param": "vehicleType",
        "location": "body"
      }
    ]
  }
  ```
- `500 Internal Server Error`: If there is an error creating the ride.
  ```json
  {
    "error": "Error message"
  }
  ```