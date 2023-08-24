# Authentication Service

This service handles user authentication for our suite of applications, including traditional email-password based authentication as well as OAuth with providers such as Google and Facebook.

## Features

- User registration and login.
- Password reset via email.
- OAuth authentication with Google and Facebook.
- JWT token generation for authenticated users.

## Setup and Installation

1. **Clone the Repository:**

    ```bash
    git clone https://github.com/gnuchev/auth-service
    ```

2. **Navigate to the Directory:**

    ```bash
    cd path/to/directory
    ```

3. **Install Dependencies:**

    ```bash
    npm install
    ```

4. **Environment Variables:**

    Create a `.env` file in the root directory and fill out the necessary environment variables:

    ```
    DATABASE_URL=mongodb://your_database_url
    EMAIL_USERNAME=your_email@gmail.com
    EMAIL_PASSWORD=your_email_password
    ```

5. **Start the Server:**

    ```bash
    npm start
    ```

## API Endpoints

- **Register**: POST `/auth/register`
- **Login**: POST `/auth/login`
- **Logout**: POST `/auth/logout`
- **Reset Password**: POST `/auth/reset-password`
- **Confirm Reset**: POST `/auth/confirm-reset`
- **Authorize User Role**: POST `/auth/authorize/:role`
- **Logout**: POST `/auth/logout`
- **Google OAuth**: GET `/auth/google`
- **Facebook OAuth**: GET `/auth/facebook`
- **Google Callback**: GET `/auth/google/callback`
- **Facebook Callback**: GET `/auth/facebook/callback`

## Contribution

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)