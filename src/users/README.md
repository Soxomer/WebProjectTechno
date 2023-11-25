This is the controller for the User entity. It uses the `UsersService` to perform CRUD operations on User data.

## Endpoints

### POST /users

Creates a new user.

- Request body should be a `CreateUserDto` object.
- Uses `VinciEmailPipe` to validate the email.

### GET /users

Fetches all users.

- Optional query parameter `age` can be used to fetch users of a specific age.

### GET /users/:id

Fetches a single user by their ID.

### PATCH /users/:id

Updates a user.

- Request body should be an `UpdateUserDto` object.

### DELETE /users/:id

Deletes a user by their ID.

## DTOs

### CreateUserDto

Used when creating a new user.

### UpdateUserDto

Used when updating an existing user.

## Pipes

### VinciEmailPipe

Used to validate the email when creating a new user.