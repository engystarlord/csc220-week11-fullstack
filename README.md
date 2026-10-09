# CSC220 Week 11 Student Manager

Activity 19: React and API Integration. The React client loads student records from an Express API backed by MongoDB. Public GET requests display student cards; login enables JWT-protected Add and Delete actions.

## Requirements

Node.js 22.12+ or 24, npm, and a MongoDB connection (Atlas or a local MongoDB server).

## Setup

1. In `server/`, run `npm ci`.
2. Copy `server/.env.example` to `server/.env` and fill in `MONGO_URI` and a private `JWT_SECRET`. Leave `PORT=3000`.
3. Use an Atlas connection string with your own database name and allowed IP, or a local URI such as `mongodb://127.0.0.1:27017/csc220_week11`.
4. Start the backend with `npm run dev` from `server/`.
5. In another terminal, run `npm ci` and `npm run dev` from `client/`.
6. Open `http://localhost:5173`. API: `http://localhost:3000`.

The API starts only after MongoDB connects. Keep both servers running. No database credentials or installed packages are committed.

## Register the lab test account once

Send `POST http://localhost:3000/api/auth/register` with JSON:

```json
{"email":"student1@example.com","password":"password123"}
```

Use that email and password in the React login form. Passwords are bcrypt hashes in MongoDB. The account password above is a public lab example, not a real personal credential.

## API

| Method | Route | Access | Result |
|---|---|---|---|
| POST | `/api/auth/register` | Public | 201 with user id and email |
| POST | `/api/auth/login` | Public | JWT valid for one hour |
| GET | `/api/students` | Public | Student array, newest first |
| POST | `/api/students` | Bearer JWT | 201 with saved student |
| DELETE | `/api/students/:id` | Bearer JWT | 204 with no body |

Student fields: `name`, `major`, and `score` between 0 and 100. Scores of 60 or above display Passed.

## Frontend behavior

- `useEffect(..., [])` loads the list through `api.js`.
- Loading and error messages explain request states.
- Add uses the returned MongoDB document to update state without refreshing.
- Delete handles 204 without parsing JSON and removes the card with `filter()`.
- The JWT lives only in React state. Refreshing or Logout requires login again; MongoDB student data remains saved.
- Add and Delete are disabled when logged out, and the API also rejects unauthenticated requests.
- CORS allows the React origin `http://localhost:5173` to call port 3000.

## Manual verification

Load the page, login, add a student, refresh and confirm persistence. Login again, delete the student and refresh to confirm deletion. Logout disables protected actions. Stop the API and refresh the React page to see the loading/error behavior, then restart it. Run `npm run build` from `client/` for the production build.

The local demonstration uses a genuine local MongoDB instance. Atlas is supported by setting `MONGO_URI`; no shared group-project database is required.

## Submission

Submit this repository URL and one screenshot of the working React page with student data for Week 11 Activity 19. `submission-screenshot.png` contains fictional demonstration students.

AI assisted implementation and verification. Review the fetch calls, useEffect, JWT middleware, and state updates before explaining the lab.
