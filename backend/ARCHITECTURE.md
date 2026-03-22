# Core Architecture Setup Documentation

This document describes the core architecture improvements implemented in the BookNear backend.

## 🏗️ Architecture Components

### 1. **Database & ORM (Prisma)**

#### Schema

- **User Models**: User, Customer, SalonOwner, SalonStaff
- **Business Models**: Salon, Service, SalonFavorite
- **Transaction Models**: Appointment, Payment
- **Review Models**: Review, Notification

#### Database Commands

```bash
# Push schema changes to database
pnpm db:push

# Create migration
pnpm db:migrate

# Deploy migrations
pnpm db:migrate:deploy

# Seed database with sample data
pnpm db:seed

# Reset database and reseed
pnpm db:reset
```

### 2. **Authentication & Authorization**

#### JWT Strategy (`src/auth/jwt.strategy.ts`)

- Extracts JWT tokens from Authorization header
- Validates token signature and expiration
- Returns JWT payload with user info

#### Auth Service (`src/auth/auth.service.ts`)

- `generateAccessToken()`: Creates JWT tokens with 7-day expiration
- `validateToken()`: Validates token signature
- `decodeToken()`: Decodes token without verification

#### Guards

**JwtAuthGuard** (`src/common/guards/jwt-auth.guard.ts`)

- Validates that requests have a valid JWT token
- Used with `@UseGuards(JwtAuthGuard)` decorator

**RolesGuard** (`src/common/guards/roles.guard.ts`)

- Implements Role-Based Access Control (RBAC)
- Validates user role against endpoint requirements
- Used with `@Roles(UserRole.ADMIN, UserRole.SALON_OWNER)` decorator

#### Decorators

**@Roles()** (`src/common/decorators/roles.decorator.ts`)

```typescript
@Get('admin-only')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
async adminEndpoint() { }
```

**@CurrentUser()** (`src/common/decorators/current-user.decorator.ts`)

```typescript
@Get('profile')
@UseGuards(JwtAuthGuard)
async getProfile(@CurrentUser() user: JwtPayload) { }
```

### 3. **API Documentation (Swagger/OpenAPI)**

Swagger documentation is auto-generated from NestJS controllers and available at:

```
http://localhost:3001/api/docs
```

#### Features

- Interactive API testing
- Bearer token authentication
- Auto-generated request/response schemas
- Endpoint grouping by tags

### 4. **Global Error Handling**

#### AllExceptionsFilter (`src/common/filters/all-exceptions.filter.ts`)

Catches all exceptions and returns standardized error response:

```json
{
  "statusCode": 400,
  "timestamp": "2024-01-01T12:00:00.000Z",
  "path": "/api/v1/appointments",
  "method": "GET",
  "message": "Error message",
  "error": "BadRequestException"
}
```

### 5. **Logging Middleware**

#### LoggingInterceptor (`src/common/interceptors/logging.interceptor.ts`)

- Logs all incoming requests with method, URL, duration
- Logs response status and error messages
- Provides execution timing information

Example log output:

```
GET /api/v1/salons - 200 - 45ms - Mozilla/5.0...
POST /api/v1/appointments - 201 - 125ms - Mozilla/5.0...
GET /api/v1/appointments/123 - 404 - 12ms - Mozilla/5.0...
```

## 🚀 Getting Started

### 1. Setup Environment

```bash
cp .env.example .env.local
# Edit .env.local with your database URL and JWT secret
```

Required environment variables:

```
DATABASE_URL="postgresql://user:password@localhost:5432/booknear_db"
JWT_SECRET="min-32-characters-long-secret-key"
JWT_EXPIRATION="7d"
NODE_ENV="development"
PORT=3001
CORS_ORIGIN="http://localhost:3000"
```

### 2. Initialize Database

```bash
# Create database and push schema
pnpm db:push

# Or create migration (for production)
pnpm db:migrate

# Seed with sample data
pnpm db:seed
```

### 3. Start Development Server

```bash
pnpm dev
```

Server will be available at: `http://localhost:3001/api/v1`

API Documentation at: `http://localhost:3001/api/docs`

## 📚 Usage Examples

### Authentication Flow

**1. Register User**

```bash
POST /api/v1/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securePassword123",
  "firstName": "John",
  "lastName": "Doe",
  "phone": "+919876543210"
}
```

Response:

```json
{
  "id": "user-id-uuid",
  "email": "user@example.com",
  "role": "CUSTOMER",
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expiresIn": 604800
}
```

**2. Login**

```bash
POST /api/v1/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

**3. Access Protected Endpoint**

```bash
GET /api/v1/auth/me
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

Response:

```json
{
  "id": "user-id-uuid",
  "email": "user@example.com",
  "role": "CUSTOMER",
  "iat": 1704113200,
  "exp": 1704718000
}
```

### Role-Based Access Control

**Admin-Only Endpoint Example**

```typescript
@Get('analytics')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
async getAnalytics(@CurrentUser() user: JwtPayload) {
  // Only users with ADMIN role can access this
}
```

**Multiple Roles Allowed**

```typescript
@Post('salons')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN, UserRole.SALON_OWNER)
async createSalon(@CurrentUser() user: JwtPayload, @Body() data) {
  // ADMIN and SALON_OWNER roles can create salons
}
```

## 🔐 Security Considerations

1. **JWT Secret**: Use a strong, random secret of at least 32 characters
2. **Token Expiration**: Default is 7 days, adjust based on security requirements
3. **CORS**: Configure CORS origin to match your frontend URL
4. **Password Hashing**: Implement bcrypt hashing for passwords (not included in auth controller)
5. **HTTPS**: Always use HTTPS in production
6. **Rate Limiting**: Consider adding rate limiting middleware for production

## 📊 Database Schema Highlights

### User Roles

- `CUSTOMER`: Regular users booking appointments
- `SALON_OWNER`: Salon business owner
- `SALON_STAFF`: Staff members working at salons
- `ADMIN`: Platform administrators

### Appointment Statuses

- `PENDING`: Awaiting confirmation
- `CONFIRMED`: Confirmed by salon
- `IN_PROGRESS`: Currently being served
- `COMPLETED`: Service completed
- `CANCELLED`: Cancelled by user or salon
- `NO_SHOW`: User didn't show up
- `RESCHEDULED`: Rescheduled to another date

## 🧪 Testing

### Run Tests

```bash
# Unit tests
pnpm test

# With coverage
pnpm test:cov

# Watch mode
pnpm test:watch
```

### Test Auth Endpoints

Use Swagger UI or curl:

```bash
# Login and get token
TOKEN=$(curl -s -X POST http://localhost:3001/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password"}' \
  | jq -r '.accessToken')

# Use token for protected endpoint
curl -H "Authorization: Bearer $TOKEN" \
  http://localhost:3001/api/v1/auth/me
```

## 📝 Next Steps

1. **Implement Login Logic**: Add password verification in auth controller
2. **Add Refresh Token**: Implement token refresh mechanism
3. **Create Service Modules**: Build CRUD endpoints for salons, appointments, payments
4. **Add Business Logic**: Implement appointment availability, payment processing
5. **Error Handling**: Add custom exceptions for business logic errors
6. **Testing**: Write unit and integration tests for controllers and services

## 📚 References

- [Prisma Documentation](https://www.prisma.io/docs/)
- [NestJS Authentication](https://docs.nestjs.com/security/authentication)
- [NestJS Authorization](https://docs.nestjs.com/security/authorization)
- [JWT Best Practices](https://tools.ietf.org/html/rfc8725)
- [Swagger/OpenAPI](https://swagger.io/specification/)
