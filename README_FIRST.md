# MERN Stack Practicals P1–P8

This ZIP contains **8 separate practical projects**, named P1 through P8. Each practical has its own `frontend` and/or `backend` folder and is based on your uploaded MERN practical notes. I corrected broken/incomplete code and made each project runnable.

## Required installations (install once)
1. **Node.js LTS** (includes npm): https://nodejs.org/
2. **MongoDB Community Server**: https://www.mongodb.com/try/download/community  
   MongoDB is required for P3, P4, P5, P6 and P8. P1, P2 and P7 do not need MongoDB.
3. Optional: **MongoDB Compass** to view database records.

Check Node/npm in terminal:
```bash
node -v
npm -v
```

## How to run a practical
Extract this ZIP. Open the extracted folder in VS Code.

### Run backend
Open terminal 1 and go into the practical's backend folder. Example for P3:
```bash
cd P3_MongoDB_Create_Read/backend
npm install
npm run dev
```
If `npm run dev` does not work, use `npm start` (the backend package also includes the start script).

### Run frontend
Open terminal 2 in the same extracted root folder:
```bash
cd P3_MongoDB_Create_Read/frontend
npm install
npm run dev
```
Open the localhost URL printed by Vite, usually `http://localhost:5173`.

**Important:** Keep both terminals open while using the practical. Backend uses port `5000`. Start only one practical backend at a time, because all use port 5000.

## Which practical needs what?
- **P1** — React + Express environment starter; no database.
- **P2** — Express REST API + React/Axios; no database.
- **P3** — MongoDB/Mongoose Create and Read students.
- **P4** — MongoDB/Mongoose full CRUD (Create, Read, Update, Delete).
- **P5** — User Registration and Login; password hashing with bcrypt and JWT response.
- **P6** — JWT login and a protected `/profile` endpoint.
- **P7** — React form validation + Express validation/error handling; no database.
- **P8** — Student records CRUD + search/filter by name, course or city.

## MongoDB notes
Start the MongoDB service before running P3/P4/P5/P6/P8. Default local connection strings are already set in each backend `.env` file. If MongoDB is installed with a different setup, update `MONGODB_URL` in that practical's `backend/.env`.

## Useful API endpoints
- P2: `GET http://localhost:5000/students`
- P3/P4: `GET/POST http://localhost:5000/student`; P4 also supports `PUT/DELETE /student/:id`
- P5: `POST /register`, `POST /login`
- P6: `POST /register`, `POST /login`, protected `GET /profile` (send `Authorization: Bearer <token>`)
- P7: `POST /register`
- P8: `GET/POST http://localhost:5000/api/students`; `PUT/DELETE /api/students/:id`

## If something goes wrong
- `ECONNREFUSED` / frontend cannot connect: make sure the backend terminal is running.
- MongoDB connection error: start MongoDB and check `backend/.env`.
- Port 5000 already in use: stop the other practical backend first.
- First `npm install` needs an internet connection.
- For P5/P6, use a new email address for registration if the same email already exists in the database.

These are learning/practical projects for local use, not production-ready applications. The JWT fallback secret is for practice only; change it before any real deployment.
