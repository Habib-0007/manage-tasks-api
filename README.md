# Manage Tasks API

A simple task management API built with Express, TypeScript, PostgresSQL, NeonDB and Prisma.

## Features

- Create, update, delete, and retrieve tasks

- RESTful API structure

- PostgresSQL integration with Prisma

- Error handling and validation

## Prerequisites

Ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (LTS version recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js) or [yarn](https://yarnpkg.com/)
- [PostgresSQL](https://www.postgresql.org/) Realational Database
- [TypeScript](https://www.typescriptlang.org/) globally installed (optional)

## Installation

1. **Clone the repository**

   ```sh
   git clone https://github.com/Habib-0007/manage-tasks-api.git

   cd manage-tasks-api
   ```

2. **Install dependencies**
   ```sh
   npm install
   ```
   or if using Yarn:
   ```sh
   yarn install
   ```

## Running the Application

### Development Mode

To run the server in development mode with auto-reloading:

```sh
npm run dev
```

or

```sh
yarn dev
```

### Production Mode

To build and run in production mode:

```sh
npm run build
npm start
```

## Environment Variables

Ensure you have a `.env` file in the root directory with the necessary environment variables. Example:

```env
PORT=3000
DATABASE_URL=your-postgres-database-url
NODE_ENV=your-node-environment
```

## API Endpoints

| Method | Endpoint    | Description              |
| ------ | ----------- | ------------------------ |
| GET    | `/`         | Create a new task               |
| POST    | `/api/tasks`    | Simulates a server error |
| GET    | `/api/tasks` | Get all tasks     |
| GET    | `/api/tasks/:id` | Get a task by ID    |
| PUT    | `/api/tasks/:id` | Update a task by ID    |
| DELETE    | `/api/tasks/:id` | Delete a task by ID     |
| GET    | `/api-docs` | API Documentation (Swagger)    |

## Contributing

- Fork the repository.

- Create a new branch (git checkout -b feature-branch).

- Commit your changes (git commit -m "Added new feature").

- Push to the branch (git push origin feature-branch).

- Open a Pull Request.

### Need Help?

Open an issue in the repository, and I’ll be happy to assist! 🚀

