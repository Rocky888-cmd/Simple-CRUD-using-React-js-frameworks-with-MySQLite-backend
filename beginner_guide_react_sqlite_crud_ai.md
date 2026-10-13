# Beginner's Guide: Building a Simple React + SQLite CRUD App with AI Assistance

This guide is for beginners who want to build a small CRUD web application using **React**, **Node.js + Express**, and **SQLite**, with help from an AI coding assistant in VS Code.

The goal is to learn how the parts work together—not just to make the AI generate code.

---

## 1. What You Will Build

A simple app that lets you manage records with these fields:

- **Name** — a text field
- **Description** — a text field
- **Active** — a checkbox

You will be able to:

- **Create** a record
- **Read** or display saved records
- **Update** an existing record
- **Delete** a record

The app will use separate React components for `Button`, `Input`, `Checkbox`, and `TextView`.

## 2. Understand the Technologies

| Technology | What it does |
|---|---|
| React | Builds the user interface in the browser |
| Components | Small, reusable pieces of the interface |
| Node.js | Runs JavaScript outside the browser |
| Express | Provides API routes that the frontend can call |
| SQLite | Saves records in a database file |
| Fetch API | Sends requests from React to the backend |
| VS Code | Editor where you write and run the project |
| AI coding assistant | Helps plan, generate, explain, and debug code |

**Important:** React should not open the SQLite file directly. The Express backend reads and updates SQLite, and React communicates with the backend through HTTP API requests.

## 3. Prepare Your Computer

Install these tools if you do not already have them:

1. **Node.js LTS** — https://nodejs.org/
2. **Visual Studio Code** — https://code.visualstudio.com/
3. An AI coding assistant available in your VS Code workflow, such as Codex or another coding agent.

After installing Node.js, open the VS Code terminal using **Terminal → New Terminal** and check the installations:

```bash
node -v
npm -v
```

Both commands should print version numbers. If a command is not recognized, finish installing Node.js and restart VS Code.

## 4. Create or Open the Project Folder

You can create a folder in File Explorer, then open it in VS Code. For example, create a folder named `simple-crud-app`.

Or use the terminal:

```bash
mkdir simple-crud-app
cd simple-crud-app
code .
```

If `code .` is not recognized, open VS Code manually and choose **File → Open Folder**.

Before asking AI to make changes, check that VS Code is open in the correct project folder.

## 5. Give the AI a Clear Project Prompt

Paste the following prompt into your AI coding assistant. If you already have a project, tell the assistant to inspect it before changing anything.

> Act as a patient full-stack developer and beginner-friendly instructor. Help me build a simple educational CRUD web app using React with Vite for the frontend, Node.js and Express for the backend, and SQLite for permanent data storage.
>
> The record fields are Name, Description, and Active status. Create, read, update, and delete records.
>
> Use separate React component files for Button, Input, Checkbox, and TextView. Also create RecordForm and RecordList components, with App.jsx coordinating them.
>
> Use a simple REST API and parameterized SQLite queries. Do not use localStorage as the database. Keep the design and code simple. Do not add authentication, Redux, TypeScript, or unnecessary libraries.
>
> First, inspect the current folder and explain your proposed file structure. Then implement the project in small stages. After each stage, tell me which files changed, what they do, and the exact commands I should run to test the stage. Do not claim something was tested unless you actually tested it. If you find an error, explain the cause in beginner-friendly language and fix it.
>
> Include Windows/VS Code terminal instructions. Make sure the frontend API URLs match the backend routes and that records remain saved after refreshing the browser.

**Tip:** If the AI has access to your workspace, ask it to edit the project files directly. If it only provides code in chat, ask for one file at a time and copy it into the matching file.

## 6. Work in Small Stages

Do not ask the AI to generate and change the entire project repeatedly. Build one stage, test it, and then continue.

### Stage 1 — Create the project structure

Ask:

> Create the folder and file structure for this React + Express + SQLite CRUD project. Do not add extra features. Explain the purpose of every folder and file.

Check that the frontend and backend are separated. A simple structure is:

```text
simple-crud-app/
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Button.jsx
│   │   │   ├── Input.jsx
│   │   │   ├── Checkbox.jsx
│   │   │   ├── TextView.jsx
│   │   │   ├── RecordForm.jsx
│   │   │   └── RecordList.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── styles.css
│   └── package.json
└── server/
    ├── database.js
    ├── server.js
    └── package.json
```

The `database.sqlite` file can be created automatically when the backend first runs.

### Stage 2 — Build the backend and database

Ask:

> Implement only the Express backend and SQLite database first. Create the records table automatically. Add GET all, GET one, POST, PUT, and DELETE API routes. Use parameterized queries and validate required fields. Explain how to start the backend and how to test each endpoint.

Check that the server starts without errors and that the database table is created. Ask the AI to explain any database code you do not understand.

### Stage 3 — Build the reusable React components

Ask:

> Implement the Button, Input, Checkbox, and TextView components. Keep each component small and reusable. Show how props and event handlers work, and explain each component in simple terms. Do not implement database requests yet.

Check that:
- `Button` receives its label and click handler through props.
- `Input` receives its value and `onChange`.
- `Checkbox` receives its checked state and `onChange`.
- `TextView` displays the supplied text.

### Stage 4 — Build the form and list

Ask:

> Implement RecordForm and RecordList using the reusable components. Support entering a name, description, and active status. Add a simple list layout with Edit and Delete actions. For now, explain how the React state controls the form and list.

Test the form and list before connecting them to the backend.

### Stage 5 — Connect React to Express

Ask:

> Connect the React app to the Express API using the Fetch API. Load records when the page starts. Implement Create, Read, Update, and Delete against SQLite. Display loading, success, and error messages. Keep the code beginner-friendly and explain the request and response flow.

Confirm that the frontend API address and backend port match. If the frontend cannot connect, check the browser console and backend terminal.

### Stage 6 — Test all CRUD operations

Ask:

> Review the whole project and test the Create, Read, Update, and Delete flows. Check the Active checkbox, form validation, error handling, API URLs, and SQLite persistence. Fix any issues found and report which tests were actually performed. Do not claim tests passed if they were not run.

Use the manual test checklist below.

## 7. Running the App in VS Code

The exact commands depend on the `package.json` scripts the AI created. Ask the AI to show the correct commands for your project. A common setup is:

**Terminal 1 — Backend**

```bash
cd server
npm install
npm run dev
```

If the project does not define a `dev` script, use the script shown in `server/package.json`, or ask the AI to add a suitable script.

**Terminal 2 — Frontend**

Open another terminal using the **+** button in the VS Code terminal panel:

```bash
cd client
npm install
npm run dev
```

Vite will print a local development URL, commonly `http://localhost:5173`. Open the exact URL printed in your terminal.

Keep both terminals running while you use the app.

## 8. Manual Testing Checklist

Test the application yourself. Tick each item when it works.

- [ ] The app opens in the browser.
- [ ] The form accepts a name and description.
- [ ] The Active checkbox can be checked and unchecked.
- [ ] Adding a record displays it in the list.
- [ ] Refreshing the browser keeps the record.
- [ ] Editing a record loads its existing values.
- [ ] Saving an edit updates the displayed record.
- [ ] Deleting a record asks for confirmation, if implemented.
- [ ] The deleted record disappears from the list.
- [ ] Empty required fields show a useful message.
- [ ] An API or server error is handled with a readable message.
- [ ] The app still works after stopping and restarting the backend.

If a test fails, tell the AI the exact steps you took, what you expected, what happened instead, and any error message.

## 9. How to Ask AI to Fix Errors

Avoid saying only “fix my code.” Give the AI useful information.

Use this prompt:

> I am a beginner and this is the error I encountered:
>
> **What I was doing:** [describe the action]
>
> **Expected result:** [what should happen]
>
> **Actual result:** [what happened]
>
> **Error message:** [paste the complete error]
>
> Please inspect the relevant existing files before editing. Explain the likely cause in simple language, make the smallest necessary fix, and tell me how to verify it. Do not rewrite unrelated parts of the project.

Helpful information to share includes:
- The full terminal error
- The browser console error
- The API response or HTTP status
- The relevant source file
- What action caused the issue

Do not paste passwords, private API keys, or other secrets into the prompt.

## 10. Learn Instead of Copying Blindly

After the AI completes each stage, ask questions such as:

- “Explain this file line by line in beginner-friendly language.”
- “Why is this value passed as a prop?”
- “What does `useState` do here?”
- “Why do we use `useEffect` to load records?”
- “Explain this Fetch API request and its response.”
- “How does this Express route save data in SQLite?”
- “Give me a small exercise to modify this component.”
- “Quiz me on the code I just learned.”

Try making one small change yourself before asking the AI to do it. For example, add a new field or change the empty-list message. This helps you understand how the app is put together.

## 11. Common Beginner Problems

| Problem | What to check |
|---|---|
| `node` or `npm` is not recognized | Install Node.js LTS, restart VS Code, and check the versions again. |
| `npm run dev` fails | Check the current directory and the scripts in `package.json`. |
| Frontend cannot reach backend | Confirm both servers are running and the API URL and port are correct. |
| Browser reports a CORS error | Ask the AI to configure Express CORS for the frontend development origin. |
| SQLite module installation fails | Share the complete installation error and your Node.js version with the AI. |
| Records disappear after refresh | Confirm that Create and Update call the backend and that SQLite is being used rather than only React state. |
| Changes do not appear | Check the browser console, terminal output, and whether you edited the correct file. |
| Port is already in use | Stop the other process using that port or configure a different port consistently. |

## 12. Final Advice

1. Make one change at a time.
2. Test after each stage.
3. Read the code the AI creates.
4. Keep a copy of working code or use Git to track changes.
5. Ask the AI to explain before adding advanced features.
6. Never assume code works just because the AI generated it.
7. Keep the app small until you understand the full CRUD flow.

**The key idea:** React displays the interface, reusable components keep the UI organized, Express handles API requests, and SQLite stores the records permanently.
