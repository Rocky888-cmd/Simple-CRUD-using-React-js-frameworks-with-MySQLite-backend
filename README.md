# Simple CRUD Application (React + Express + SQLite)

A beginner-friendly full-stack CRUD web app. The frontend is built with **React.js (Vite)**, the backend with **Node.js + Express.js**, and data is stored permanently in a **SQLite** database file using the `better-sqlite3` package.

Each record contains:

- **ID** — generated automatically by SQLite
- **Name** — text input
- **Description** — text input
- **Active** — checkbox (stored as 1/0 in SQLite)

---

## Project Structure

```
simple-crud-app/
├── client/                  # React frontend (Vite)
│   ├── src/
│   │   ├── components/
│   │   │   ├── Button.jsx       # Reusable button (Add, Edit, Update, Cancel, Delete)
│   │   │   ├── Input.jsx        # Reusable labeled text input (Name, Description)
│   │   │   ├── Checkbox.jsx     # Reusable checkbox (Active status)
│   │   │   ├── TextView.jsx     # Displays saved record text
│   │   │   ├── RecordForm.jsx   # Form for adding/editing records
│   │   │   └── RecordList.jsx   # Lists all saved records
│   │   ├── App.jsx              # Main component: state + API calls
│   │   ├── main.jsx             # Entry point (renders <App />)
│   │   └── styles.css           # Simple responsive styling
│   ├── index.html
│   ├── vite.config.js           # Dev server on port 3000, proxies /api -> backend
│   └── package.json
└── server/                  # Express backend
    ├── database.js          # Opens/creates database.sqlite and the records table
    ├── server.js            # REST API endpoints (GET/POST/PUT/DELETE)
    ├── database.sqlite      # Created automatically on first run
    └── package.json
```

## How the pieces work (for beginners)

- **Frontend → Backend:** The React app uses the browser **Fetch API** (`fetch('/api/records')`) to call the backend. In development, Vite's proxy (see `client/vite.config.js`) forwards every request starting with `/api` to `http://localhost:5000`, so the frontend can use short URLs.
- **Backend → SQLite:** Express route handlers call `db.prepare(SQL).run/get/all`. Every query uses `?` placeholders with values passed separately — this is parameterized SQL, which prevents SQL injection. `better-sqlite3` is synchronous and fast.
- **Controlled inputs:** In React, form fields whose `value` comes from `useState` are called *controlled components*. Every keystroke updates the state in `App.jsx`, which is then sent to the API as JSON.
- **Checkbox:** React uses `true`/`false`, while SQLite stores `1`/`0`. The code converts both ways (`is_active ? 1 : 0` on the server, `Boolean(record.is_active)` when editing).

## API Endpoints

| Method | URL                  | Description           |
| ------ | -------------------- | --------------------- |
| GET    | `/api/records`     | Retrieve all records  |
| GET    | `/api/records/:id` | Retrieve one record   |
| POST   | `/api/records`     | Create a record (201) |
| PUT    | `/api/records/:id` | Update a record       |
| DELETE | `/api/records/:id` | Delete a record       |

Validation: `name` is required (400 if missing). Unknown ids return 404 with a readable message.

## Setup & Running (Windows, VS Code Terminal)

> Open VS Code, then **Terminal → New Terminal**. Run commands from the project root.
> Use **two separate terminals** — one for the backend, one for the frontend.

### 1. Install backend dependencies

```powershell
cd server
npm install
cd ..
```

### 2. Install frontend dependencies

```powershell
cd client
npm install
cd ..
```

### 3. Start the Express backend (Terminal 1)

```powershell
cd server
npm start
```

You should see:

```
Connected to SQLite database at: ...\server\database.sqlite
Express server running at http://localhost:5000
```

The `database.sqlite` file and the `records` table are created automatically.

### 4. Start the React development server (Terminal 2)

```powershell
cd client
npm run dev
```

### 5. Open the application

Open your browser and go to: **http://localhost:3000**

### 6. Verify records are saved in SQLite

Add a record in the browser, then check it exists in the database:

```powershell
cd server
node -e "const db = require('better-sqlite3')('database.sqlite'); console.log(db.prepare('SELECT * FROM records').all());"
```

You can also stop and restart both servers — your records will still be there, because they are stored in the `database.sqlite` file, not in browser memory.

## Useful scripts

| Where  | Command           | What it does                                 |
| ------ | ----------------- | -------------------------------------------- |
| server | `npm start`     | Runs the Express API on :5000                |
| client | `npm run dev`   | React dev server on :3000                    |
| client | `npm run build` | Creates a production build in`client/dist` |

## Testing checklist (already verified)

- [X] Frontend API URLs (`/api/records...`) match the backend routes
- [X] `records` table is created automatically on startup
- [X] Create, Read, Update, Delete all work through the API
- [X] Checkbox value is stored as 1/0 and read back correctly
- [X] Records survive a browser refresh and a server restart
- [X] React app builds without errors (`npm run build`)
