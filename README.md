# Angles

A full-stack music library inspired by [RateYourMusic](https://rateyourmusic.com/). The project combines a React frontend with a Spring Boot REST API, PostgreSQL persistence, JWT authentication, validation, pagination, search, ratings, and centralized error handling.

> Current status: active development. Deployment and Flyway migrations are planned; external music metadata integration is also planned.

## Features

### Music catalog

- Album catalog backed by PostgreSQL
- Track management
- Paginated album listing
- Album search using Spring Data JPA queries
- Album/track data exposed through a REST API

### Ratings

- Authenticated users can rate albums or tracks from **1 to 10**
- Users can update their existing rating instead of creating duplicates
- Optional comments on ratings
- Album rating endpoint returns the current user's album rating and track ratings
- Bean Validation is used for incoming rating requests

### Authentication & security

- User registration and authentication
- Password hashing with Spring Security's `PasswordEncoder`
- JWT-based authentication
- Custom JWT service and authentication filter
- Role field on users (`USER` currently used by registration)
- Protected endpoints handled through Spring Security
- Separate handling for authentication/authorization failures

### Error handling

The backend uses centralized exception handling instead of returning unrelated framework responses from every controller.

The error-handling layer is designed to cover:

- validation failures (`@Valid` / `MethodArgumentNotValidException`)
- domain/application exceptions such as missing albums
- invalid request arguments
- authentication failures (`401`)
- access-denied errors (`403`)

This keeps controller code focused on application logic and gives the frontend a predictable error response format.

## Architecture

The backend follows a layered structure:

```text
React frontend
      |
      v
   REST API
      |
      v
 Controllers
      |
      v
   Services
      |
      v
 Repositories
      |
      v
 PostgreSQL
```

Security is applied before controller execution:

```text
HTTP request
     |
     v
Spring Security filter chain
     |
     +---- authentication failure -> 401
     |
     +---- access denied         -> 403
     |
     v
Controller
     |
     v
Service
     |
     +---- application exception
     |            |
     |            v
     |      ControllerAdvice
     |
     v
Repository
```

The project is organized by domain rather than putting all controllers, services, repositories, and entities into global technical folders.


## REST API

The API is split into authentication, users, albums, tracks, and ratings.

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/auth/register` | No | Register a new user and return a JWT |
| `POST` | `/auth/authenticate` | No | Authenticate by email/password and return a JWT |
| `GET` | `/albums` | Yes | Get albums with Spring Data pagination |
| `GET` | `/albums/search?query=...` | Yes | Search albums with pagination |
| `GET` | `/tracks` | Yes | Get tracks |
| `GET` | `/users` | Yes | Get user DTOs |
| `POST` | `/ratings` | Yes | Create or update an album/track rating |
| `GET` | `/ratings/album/{albumId}` | Yes | Get the current user's ratings for an album and its tracks |

Spring's `Pageable` is used for album pagination, so standard parameters such as `page`, `size`, and sorting parameters can be supplied by the client.

## Validation

Incoming rating data is validated before the service layer is called.

For example, the rating value is constrained to the range **1–10**. The request can also contain either an album ID or a track ID, but not both at the same time.

Validation failures are converted into structured API errors by the centralized exception-handling layer.

## Database model

The main domain relationships are centered around users, ratings, albums, and tracks:

```text
User
  |
  +----< Rating >---- Album
  |                   |
  |                   +----< Track
  |
  +---- owns/authenticates user account
```

A rating belongs to a user and targets either an album or a track. The service layer checks the target and reuses an existing rating for the same user/target instead of blindly inserting another one.

PostgreSQL is used as the persistent data store.

## Tech stack

### Backend

- Java 21
- Spring Boot 4.1.0
- Spring Web MVC
- Spring Data JPA
- Spring Security
- JWT (`jjwt`)
- Bean Validation
- PostgreSQL
- Maven
- Lombok

### Frontend

- React
- Vite
- JavaScript
- CSS

### Infrastructure

- Docker Compose for local PostgreSQL

## Running locally

### 1. Start PostgreSQL

The backend contains a `docker-compose.yml` for PostgreSQL.

```bash
cd demo-backend
docker compose up -d
```

The compose file maps PostgreSQL to host port `5433`.

### 2. Configure environment variables

The backend expects database credentials and the JWT signing secret to be supplied through environment variables:

```text
DB_USERNAME=...
DB_PASSWORD=...
JWT_SECRET=...
```

Do not commit real secrets to the repository.

### 3. Start the backend

From `demo-backend`:

```bash
./mvnw spring-boot:run
```

On Windows:

```powershell
mvnw.cmd spring-boot:run
```

### 4. Start the frontend

From `demo-frontend`:

```bash
npm install
npm run dev
```

The development frontend is configured around `http://localhost:5173`.

## Configuration notes

The application currently uses Hibernate schema auto-update during development:

```properties
spring.jpa.hibernate.ddl-auto=update
```

SQL logging and Spring Security debug logging are also enabled in the current development configuration.

For production deployment, these settings should be reviewed and replaced with an explicit migration strategy and appropriate logging levels.

## Development roadmap

- [x] Spring Boot REST API
- [x] React frontend
- [x] DTO mapping
- [x] Album search
- [x] Pagination
- [x] Bean Validation
- [x] Spring Security authentication
- [x] JWT authentication
- [x] Ratings for albums and tracks
- [x] Centralized exception handling
- [x] Flyway database migrations
- [ ] Last.fm API integration
- [ ] Production deployment
- [ ] More advanced filtering and sorting

## Project goals

Angles is primarily a learning and portfolio project focused on building a complete application rather than only implementing isolated CRUD endpoints.

The backend is intentionally structured to demonstrate several common Spring concepts together:

- REST controllers
- service/repository separation
- JPA entity relationships
- DTOs
- validation
- pagination and query methods
- authentication with Spring Security
- JWT token handling
- centralized exception handling
- PostgreSQL persistence

Future work will extend the catalog with external music metadata and move the application toward a deployable production setup.
