# Smart Health Mate

A full-stack educational health tracking application for recording basic personal health measurements and displaying simple dashboard calculations.

## Features
- Health record form
- MySQL data storage
- BMI calculation
- Blood pressure category display
- Heart-rate display
- Previous record history
- Delete records
- Responsive UI
- REST API

## Tech Stack
- HTML5
- CSS3
- JavaScript
- Node.js
- Express.js
- MySQL

## Project Structure
```text
smart-health-mate/
├── database/schema.sql
├── public/
│   ├── index.html
│   ├── style.css
│   └── app.js
├── .env.example
├── .gitignore
├── package.json
├── README.md
└── server.js
```

## Requirements
- Node.js
- MySQL Server

## Setup

### 1. Create database
Open MySQL Workbench and run the contents of:
```text
database/schema.sql
```

### 2. Configure database
Create `.env` from `.env.example`.

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=smart_health_mate
PORT=3001
```

### 3. Install dependencies
```bash
npm install
```

### 4. Start
```bash
npm start
```

Open:
`http://localhost:3001`

## Demo Flow
1. Enter a sample health record.
2. Save it.
3. Show BMI, BP and heart-rate dashboard values.
4. Add another record.
5. Show record history.
6. Delete a record.

## Important Note
This is an educational software project. The displayed BMI and blood-pressure categories are informational and are not a medical diagnosis or substitute for professional medical advice.

## Future Enhancements
- User authentication
- Charts and trends
- PDF health report
- Reminder notifications
- Doctor/clinic integration
- Export to CSV

## Academic Use
This project demonstrates a database-backed health monitoring web application.
