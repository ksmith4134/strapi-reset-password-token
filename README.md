# strapi-reset-password-token
- Custom Strapi API (v4.2.0) to create a random password reset token, "resetPasswordToken"
- No email provider required but this token is often used in the url of a reset-password email link.
- Returns sanitized user data

### Important
- place this repo's root folder in your Strapi src/api folder
- the final destination will look like: src/api/get-token

### POST request

- url: http://localhost:1337/api/get-token

- body: 
```
  {
    "identifier": id, // user's id
    "jwt": jwtSecret, // user's current jwt
  }
 ```
