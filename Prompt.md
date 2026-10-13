
# Project: Simple React CRUD Web Application with SQLite

## ROLE

Act as a beginner-friendly Full-Stack Developer and instructor. Build a simple, functional CRUD web application for educational purposes. Keep the code clean, easy to understand, and easy for a student to modify.

## 1. TECHNOLOGY STACK

- **Frontend:** React.js with Vite
- **Backend:** Node.js with Express.js
- **Database:** SQLite
- **Language:** JavaScript
- **Styling:** Simple CSS
- **API Communication:** Fetch API

Use SQLite for permanent data storage. Do not use localStorage as a replacement for the database.

## 2. APPLICATION PURPOSE

Create a simple CRUD application that allows users to manage a list of records.

Each record should contain:

- ID (automatically generated)
- Name (text input)
- Description (text input or textarea)
- Active status (checkbox)

The application should demonstrate the four basic CRUD operations:

- **Create:** Add a new record.
- **Read:** Display saved records.
- **Update:** Edit an existing record.
- **Delete:** Remove a record after confirmation.

## 3. SEPARATE REUSABLE REACT COMPONENTS

Create separate component files for the following elements:

1. `Button.jsx`

   - Reusable button component.
   - Support different labels and click handlers.
   - Use it for Add, Edit, Update, Cancel, and Delete actions.
2. `Input.jsx`

   - Reusable text input component.
   - Accept a label, placeholder, value, and onChange handler.
   - Use it for the Name field.
3. `Checkbox.jsx`

   - Reusable checkbox component.
   - Accept a label, checked value, and onChange handler.
   - Use it for the Active status.
4. `TextView.jsx`

   - Reusable component for displaying entered or saved text.
   - Display the record name, description, and status.
   - Make it easy to see the text entered by the user.
5. `RecordForm.jsx`

   - Combine the Input, Checkbox, and Button components.
   - Handle adding and editing records.
   - Show the current values when editing a record.
6. `RecordList.jsx`

   - Display all saved records.
   - Use TextView to display record information.
   - Provide Edit and Delete buttons for each record.
7. `App.jsx`

   - Main application component.
   - Manage application state and connect the form, list, and API.

Keep each component in its own file.

## 4. SIMPLE USER INTERFACE

Create a clean, beginner-friendly interface containing:

- Page title: "Simple CRUD Application"
- A form with Name, Description, and Active checkbox.
- An Add Record button.
- A list of saved records below the form.
- Edit and Delete buttons for every record.
- A Cancel button when editing.
- A simple message when no records exist.
- A success or error message after an operation.

Use basic CSS with a centered container, readable text, simple spacing, and clearly distinguishable buttons. Make the layout responsive for desktop and mobile screens.

Avoid unnecessary animations, complex dashboards, authentication, and advanced UI libraries.

## 5. SQLITE DATABASE AND BACKEND

Create a Node.js Express backend that connects to a local SQLite database using the `better-sqlite3` package.

Create a database file named `database.sqlite` and automatically create a `records` table if it does not exist.

Table structure:

- `id`: INTEGER PRIMARY KEY AUTOINCREMENT
- `name`: TEXT NOT NULL
- `description`: TEXT
- `is_active`: INTEGER NOT NULL DEFAULT 0

Create the following REST API endpoints:

- `GET /api/records` — Retrieve all records.
- `GET /api/records/:id` — Retrieve one record.
- `POST /api/records` — Create a record.
- `PUT /api/records/:id` — Update a record.
- `DELETE /api/records/:id` — Delete a record.

Validate required fields and return appropriate HTTP status codes and readable error messages.

Use parameterized database queries to prevent SQL injection.

## 6. FRONTEND FUNCTIONALITY

Implement the following behavior:

- Load saved records from SQLite when the application starts.
- Allow users to enter a name and description.
- Allow users to select or deselect the Active checkbox.
- Display the entered information in the record list after saving.
- Save new records to SQLite through the backend API.
- Allow users to edit a record and save the changes.
- Allow users to delete records after confirmation.
- Refresh the displayed list after successful CRUD operations.
- Show a loading message while fetching data.
- Show a friendly message if the database or API request fails.
- Clear the form after successfully adding a record.
- When editing, populate the form with the selected record's existing values.

All saved records must remain available after refreshing the browser or restarting the application.

## 7. SUGGESTED PROJECT STRUCTURE

simple-crud-app/

- client/
  - src/
    - components/
      - Button.jsx
      - Input.jsx
      - Checkbox.jsx
      - TextView.jsx
      - RecordForm.jsx
      - RecordList.jsx
    - App.jsx
    - main.jsx
    - styles.css
  - package.json
  - index.html
- server/
  - database.js
  - server.js
  - package.json
  - database.sqlite (created automatically)

## 8. EDUCATIONAL REQUIREMENTS

Since this project is for learning purposes:

- Keep the code simple and avoid unnecessary abstractions.
- Use functional React components and the `useState` and `useEffect` hooks.
- Use props to pass values and event handlers to child components.
- Demonstrate controlled inputs in React.
- Explain how the frontend communicates with the backend API.
- Explain how Express executes SQLite queries.
- Add short comments to important parts of the code.
- Avoid TypeScript, Redux, complex state management, and ORM libraries.
- Do not put all components in a single file.
- Do not store database records only in React state.

## 9. SETUP AND RUNNING INSTRUCTIONS

Provide complete installation and execution instructions for Windows using the VS Code terminal.

Include the exact commands to:

1. Create the project and install the dependencies.
2. Install the frontend and backend packages.
3. Start the Express backend.
4. Start the React development server.
5. Open the application in the browser.
6. Verify that records are saved in SQLite.

Use separate terminal commands for the frontend and backend.

## 10. FINAL REQUIREMENTS

Generate all required source files with complete, working code.

Do not provide pseudocode, incomplete snippets, or placeholder functions.

Before finishing:

- Verify that frontend API URLs match the backend routes.
- Check that the SQLite table is created automatically.
- Check Create, Read, Update, and Delete operations.
- Check that the checkbox value is stored and retrieved correctly.
- Ensure that each reusable component works correctly.
- Fix any errors discovered during testing.

Finally, explain the project structure and the purpose of each component in simple terms suitable for a beginner student.

Build the simplest working implementation possible while following all requirements above.
