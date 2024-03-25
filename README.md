# Dating App Project

This project is a dating application built with React.js for the front end and Express.js for the back end. It aims to provide users with a platform to connect and interact with potential matches.

## Features

- **User Authentication:** Secure user authentication using JSON Web Tokens (JWT).
- **User Profiles:** Users can create and customize their profiles with personal information and photos.
- **Matching Algorithm:** Utilizes an advanced matching algorithm to suggest potential matches based on user preferences and interests.
- **Messaging System:** Integrated messaging system for users to communicate with their matches.
- **Notifications:** Real-time notifications to keep users informed about new matches, messages, and profile views.
- **Email Verification:** Uses Nodemailer for email verification during user registration.
- **Error Handling:** Implements express-async-handler for efficient error handling in asynchronous routes.
- **Cookie Parsing:** Utilizes cookie-parser middleware for parsing cookies in the Express.js application.

## Installation

1. Clone the repository: `git clone https://github.com/your-username/dating-app.git`
2. Navigate to the project directory: `cd dating-app`
3. Install dependencies for the client and server:

   ```bash
   cd client
   npm install
   cd ../server
   npm install
   ```

4. Set up environment variables:
   - Create a `.env` file in the `server` directory.
   - Define the following environment variables in the `.env` file:

     ```
     JWT_SECRET=your_jwt_secret_key
     EMAIL_USERNAME=your_email_username
     EMAIL_PASSWORD=your_email_password
     ```

5. Start the development server:

   ```bash
   # Start the client
   cd client
   npm start

   # Start the server
   cd ../server
   npm start
   ```

6. Access the application at `http://localhost:3000` in your browser.

## Contributing

Contributions are welcome! Feel free to submit pull requests or open issues for any bugs or feature requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---
Feel free to customize the README according to your project's specific requirements and additional features.
