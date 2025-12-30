# Development Guide - Post Office OCR Address Scanner

## API Documentation

### Base URL
```
http://localhost:5000/api
```

## Endpoints

### 1. Health Check
**GET** `/health`

Checks if the server is running.

**Response:**
```json
{
  "status": "OK",
  "message": "Server is running"
}
```

### 2. OCR Processing
**POST** `/ocr`

Processes an image and extracts text using OCR.

**Request Body:**
```json
{
  "image": "<base64_encoded_image>"
}
```

**Response:**
```json
{
  "success": true,
  "text": "Extracted text from image"
}
```

### 3. Language Detection
**POST** `/detect-language`

Detects the language of the provided text.

**Request Body:**
```json
{
  "text": "Text to detect language for"
}
```

**Response:**
```json
{
  "success": true,
  "language": "Hindi"
}
```

### 4. Translation
**POST** `/translate`

Translates text from source language to target language.

**Request Body:**
```json
{
  "text": "Text to translate",
  "sourceLanguage": "Hindi",
  "targetLanguage": "en"
}
```

**Response:**
```json
{
  "success": true,
  "translatedText": "Translated text",
  "sourceLanguage": "Hindi",
  "targetLanguage": "en"
}
```

### 5. Submit Address
**POST** `/address`

Submits a scanned and processed address for storage.

**Request Body:**
```json
{
  "fullName": "John Doe",
  "addressLine1": "123 Main Street",
  "addressLine2": "Apartment 4B",
  "city": "Bangalore",
  "state": "Karnataka",
  "pincode": "560001",
  "country": "India",
  "phone": "9876543210",
  "email": "john@example.com",
  "detectedLanguage": "Hindi"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Address submitted successfully",
  "addressId": 1234567890
}
```

### 6. Get All Addresses
**GET** `/addresses`

Retrieves all stored addresses.

**Response:**
```json
{
  "success": true,
  "addresses": [
    {
      "id": 1234567890,
      "fullName": "John Doe",
      "addressLine1": "123 Main Street",
      "city": "Bangalore",
      "createdAt": "2024-12-30T12:00:00Z"
    }
  ],
  "count": 1
}
```

### 7. Get Single Address
**GET** `/address/:id`

Retrieves a specific address by ID.

**Response:**
```json
{
  "success": true,
  "address": {
    "id": 1234567890,
    "fullName": "John Doe",
    "addressLine1": "123 Main Street",
    "city": "Bangalore",
    "state": "Karnataka",
    "pincode": "560001",
    "country": "India",
    "phone": "9876543210",
    "email": "john@example.com",
    "detectedLanguage": "Hindi",
    "createdAt": "2024-12-30T12:00:00Z"
  }
}
```

## Error Responses

All endpoints may return error responses with status codes:

**400 Bad Request:**
```json
{
  "success": false,
  "error": "Missing required fields"
}
```

**404 Not Found:**
```json
{
  "success": false,
  "error": "Address not found"
}
```

**500 Internal Server Error:**
```json
{
  "success": false,
  "error": "Error message"
}
```

## Frontend Integration

The frontend communicates with the backend through the `API` object defined in `frontend/js/api.js`. All API calls are wrapped with error handling and graceful fallbacks for demo mode.

## Testing

To test the endpoints, you can use:
- cURL
- Postman
- Insomnia
- Thunder Client

**Example cURL request:**
```bash
curl -X POST http://localhost:5000/api/detect-language \
  -H "Content-Type: application/json" \
  -d '{"text": "नमस्ते"}'
```

## Production Deployment

For production, integrate:
1. **OCR:** Google Cloud Vision API or Azure Computer Vision
2. **Translation:** Google Translate API or Microsoft Translator
3. **Database:** MongoDB, PostgreSQL, or Firebase
4. **Caching:** Redis for API caching
5. **Security:** Rate limiting, input validation, HTTPS

## Contributing

When adding new endpoints:
1. Add endpoint definition in `server.js`
2. Update this documentation
3. Update frontend `api.js` if needed
4. Test with sample data
5. Commit with descriptive message
