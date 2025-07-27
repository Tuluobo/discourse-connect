# Discourse Connect

This is a [Next.js](https://nextjs.org/) project that implements OAuth authentication functionality using Discourse SSO (Single Sign-On) user system.

English | [简体中文](README_zh-CN.md)

## Project Overview

This project provides an OAuth authentication system that allows other applications to authenticate users using Discourse forum accounts. This enables users to log into your application using their existing Discourse accounts without creating new ones.

Key Features:

- User authentication based on Discourse SSO
- OAuth 2.0 protocol support
- Built with Next.js framework for excellent performance and developer experience

## Getting Started

First, run the development server:

```bash
pnpm dev
# or
pnpm turbo
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Configuration

To use this OAuth system, you need to configure the following:

1. Enable SSO functionality in your Discourse forum.
2. Set environment variables:
   - `NEXT_PUBLIC_HOST_URL`: Application host URL (do not add "/" at the end)
   - `DATABASE_URL`: Database connection string
   - `NEXTAUTH_URL`: Complete API endpoint route when customizing
   - `AUTH_SECRET`: Next Auth secret key
   - `DISCOURSE_HOST`: Your Discourse forum URL
   - `DISCOURSE_SECRET`: SSO secret set in Discourse

## Deployment

### Docker Deployment

This project supports Docker deployment. Here are the steps to deploy using Docker Compose:

1. Ensure Docker and Docker Compose are installed on your system.

2. In the project root directory, run the following command to start services:

   ```bash
   docker-compose up -d
   ```

   This will build and start the web application and PostgreSQL database services.

3. The application will run on http://localhost:3000.

4. To stop services, run:

   ```bash
   docker-compose down
   ```

### Vercel Deployment

Another simple way to deploy Next.js applications is using the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## OAuth 2.0 API

This project implements an authentication system based on the OAuth 2.0 protocol. Here are the main OAuth interfaces and their usage instructions:

### 1. Authorization Request

**Endpoint:** `/oauth2/authorize`

**Method:** GET

**Parameters:**

- `response_type`: Must be "code"
- `client_id`: Your client ID
- `redirect_uri`: URI to redirect after authorization
- `scope`: (Optional) Requested permission scope

**Example:**

```
/oauth2/authorize?response_type=code&client_id=your_client_id&redirect_uri=https://your-app.com/callback&scope=read:user
```

### 2. Access Token Request

**Endpoint:** `/oauth2/token`

**Method:** POST

**Parameters:**

| Parameter     | Required | Description                                                     |
| ------------- | -------- | --------------------------------------------------------------- |
| grant_type    | Yes      | Grant type, `authorization_code` or `refresh_token`             |
| code          | No       | Authorization code, required when grant_type=authorization_code |
| redirect_uri  | No       | Redirect URI, required when grant_type=authorization_code       |
| refresh_token | No       | Refresh token, required when grant_type=refresh_token           |
| client_id     | Yes      | Client ID                                                       |
| client_secret | No       | Client secret (required for confidential clients)               |
| scope         | No       | Permission scope, defaults to authorization scope if empty      |

**Response:**

```json
{
  "access_token": "at_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  "token_type": "bearer",
  "expires_in": 3600,
  "refresh_token": "rt_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  "scope": "read:user"
}
```

- `access_token`: Access token
- `token_type`: Type, fixed as `bearer`
- `expires_in`: Validity period (seconds)
- `refresh_token`: Refresh token (if supported)
- `scope`: Actually granted permission scope

**Notes:**

- Refresh token validity is usually 30 days, access token validity is 1 hour
- When using refresh token to get new access token, the old access token is revoked
- If scope parameter is not passed, it defaults to original authorization; if passed, it must be a subset of original authorization scope

### 3. Token Revocation

**Endpoint:** `/oauth2/revoke`

**Method:** POST

**Parameters:**

- `token`: Access token or refresh token to revoke
- `token_type_hint`: (Optional) `access_token` or `refresh_token`
- `client_id`: Client ID
- `client_secret`: Client secret (required for confidential clients)

**Request Example (application/x-www-form-urlencoded):**

```
token=rt_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx&token_type_hint=refresh_token&client_id=your_client_id&client_secret=your_client_secret
```

**Response:**

- Returns HTTP 200 with no content on success
- Returns JSON error information on parameter errors

**Notes:**

- Revoking refresh token also revokes corresponding access token
- Revoking access token also revokes its associated refresh token
- Returns 200 even if token doesn't exist (complies with RFC 7009)

### 4. Get User Information

**Endpoint:** `/api/user/profile`

**Method:** GET

**Request Headers:**

- `Authorization: Bearer {access_token}`

**Response:**

```json
{
  "id": "user_id",
  "email": "user@example.com",
  "username": "username",
  "avatar_url": "https://example.com/avatar.jpg",
  "name": "User Name"
}
```

## Scope Permissions

- **Format:** Scope parameter is a space-separated string, e.g., `read:user`
- **Supported scopes:**
  - `read:user`: Read basic user information
- **Validation rules:**
  - Only registered scopes are allowed, illegal scopes return errors
  - Scope tokens only allow letters, numbers, underscores, hyphens
  - If scope is empty, default permissions are used

## Usage Flow

1. Redirect user to authorization page (`/oauth2/authorize`)
2. After user authorization, your application receives an authorization code
3. Use authorization code to request access token (`/oauth2/token`)
4. Use access token to get user information (`/api/user/profile`)

**Note:** Ensure to use HTTPS in production to protect all OAuth requests and responses.

## Contributing

Contributions, issue reports, and improvement suggestions are welcome.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
