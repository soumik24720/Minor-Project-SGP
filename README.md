# Siliguri Government Polytechnic College Backend

This project is the backend for the Siliguri Government Polytechnic College website. It is built using Node.js and Express, and it provides RESTful API endpoints for managing notices, courses, and contact inquiries.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. Install Node.js:
   Download and install Node.js from [https://nodejs.org/](https://nodejs.org/).

2. Install MongoDB:
   Follow the instructions to install MongoDB from [https://www.mongodb.com/docs/manual/installation/](https://www.mongodb.com/docs/manual/installation/).

3. Clone the repository:
   ```
   git clone <repository-url>
   ```

4. Navigate to the project directory:
   ```
   cd sgp-backend
   ```

5. Install the dependencies:
   ```
   npm install
   ```

6. Create a `.env` file in the root directory and add your environment variables.

## Usage

To start the server, run:
```
npm start
```

The server will run on `http://localhost:5000` by default.

## API Endpoints

### Notices
- `GET /api/notices` - Retrieve all notices
- `POST /api/notices` - Create a new notice
- `PUT /api/notices/:id` - Update an existing notice
- `DELETE /api/notices/:id` - Delete a notice

### Courses
- `GET /api/courses` - Retrieve all courses
- `POST /api/courses` - Create a new course
- `PUT /api/courses/:id` - Update an existing course
- `DELETE /api/courses/:id` - Delete a course

### Contact
- `POST /api/contact` - Submit a contact form
- `GET /api/contact` - Retrieve contact submissions

## Environment Variables

The following environment variables are required:
- `DATABASE_URL` - Database connection string
- `PORT` - Port number for the server (default is 3000)

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License.