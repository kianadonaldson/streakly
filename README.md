# streakly
A habit tracker that builds consistency through streaks, insights, and daily progress tracking.

## Usage

### Start the client

```sh
npm run start
```

### Start the server

```sh
npm run server
```

### Create a production build

```sh
npm run build
```

## Requirements

- Node.js
- npm

### Install dependencies

```sh
npm install
```

## Development

### CRUD API

Create:
```
POST /api/habits
POST /api/habits/:habit_id/complete
```

Read:
```
GET /api/habits/:user_id
```

Delete:
```
DELETE /api/habits/:habit_id
```

## Tech Stack

- React.js
- Node.js
- Express.js
- PostgreSQL