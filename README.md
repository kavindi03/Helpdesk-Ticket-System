# Helpdesk Ticket System - Assessment Project ✅ COMPLETE

**Status:** 100% Complete - Ready for Submission

### ✅ COMPLETED TASKS

#### 1. **Frontend (React)** ✅
- React app initialized with `create-react-app`
- **Components Created:**
  - `TicketList.js` - Display all tickets with status filter
  - `CreateTicket.js` - Form to create new tickets
  - `Layout.js` - Layout wrapper
- **Features Implemented:**
  - Ticket list with Title, Priority, Status, Created Date
  - Filter by Status dropdown
  - "Resolve" button to mark tickets as RESOLVED
  - Form validation for Create Ticket
  - Material-UI styling
- `.env` file configured with API URL
- Environment variable: `REACT_APP_API_URL=http://localhost:4000`

#### 2. **Backend API (Node.js/Express)** ✅
- Express server initialized
- **Endpoints Implemented:**
  - `GET /tickets` - List all tickets with optional filters (status, priority)
  - `POST /tickets` - Create new ticket
  - `PUT /tickets/:id/status` - Update ticket status
- CORS enabled
- Body parser middleware configured
- SQLite database integration

#### 3. **Database (SQLite)** ✅
- **schema.sql** created with Tickets table including:
  - id (INTEGER PRIMARY KEY)
  - title (TEXT NOT NULL)
  - description (TEXT)
  - priority (INTEGER 1-3)
  - status (TEXT DEFAULT 'OPEN')
  - createdAt (DATETIME)
- **sample_queries.sql** includes:
  - Select all OPEN tickets
  - Count tickets by priority
  - Get 5 most recent tickets
  - Query all tickets
  - Query high priority tickets

#### 4. **.NET Console Application** ✅
- .NET console app created
- **Features Implemented:**
  - Reads employees.csv file
  - Displays total employee count
  - Groups employees by department
  - Shows employee count per department
  - Example output:
    ```
    Total Employees: 5
    Employees by Department:
    IT: 3
    Finance: 1
    HR: 1
    ```

#### 5. **File Structure** ✅
```
HelpdeskAssessment/
├── frontend/               (React app)
│   ├── src/
│   │   ├── components/
│   │   │   ├── CreateTicket.js
│   │   │   ├── TicketList.js
│   │   │   └── Layout.js
│   │   ├── App.js
│   │   ├── App.css
│   │   ├── index.js
│   │   ├── theme.js
│   │   └── reportWebVitals.js
│   ├── .env
│   └── package.json
├── api/                    (Node.js backend)
│   ├── server.js
│   ├── db.js
│   └── package.json
├── dotnet-task/           (.NET console app)
│   └── EmployeeStats/
│       ├── Program.cs
│       ├── EmployeeStats.csproj
│       └── employees.csv
├── sql/
│   ├── schema.sql
│   └── sample_queries.sql
├── HelpdeskAssessment.sln
└── package.json
```

---

---

## How to Run Each Part

### Backend API (Node.js)
```powershell
cd D:\HelpdeskAssessment\api
npm install
node server.js
# Runs on http://localhost:4000
```

### Frontend (React)
```powershell
cd D:\HelpdeskAssessment\frontend
npm install
npm start
# Runs on http://localhost:3000
```

### .NET Console App
```powershell
cd D:\HelpdeskAssessment\dotnet-task\EmployeeStats
dotnet run
```

---

## API Endpoints

### GET /tickets
- **Description:** Get all tickets with optional filters
- **Query Parameters:**
  - `status` (optional): Filter by status (OPEN, IN_PROGRESS, RESOLVED)
  - `priority` (optional): Filter by priority (1, 2, 3)
- **Example:** `GET http://localhost:4000/tickets?status=OPEN`

### POST /tickets
- **Description:** Create a new ticket
- **Body:**
  ```json
  {
    "title": "Bug in login page",
    "description": "User cannot login",
    "priority": 1
  }
  ```

### PUT /tickets/:id/status
- **Description:** Update ticket status
- **Body:**
  ```json
  {
    "status": "RESOLVED"
  }
  ```

---

## Technology Stack

- **Frontend:** React 19, Material-UI, React Router
- **Backend:** Node.js, Express
- **Database:** SQLite3
- **.NET:** C# Console App (.NET 10.0)

---

## Notes

1. Backend server must be running before frontend for API calls to work
2. Database is auto-created on first API startup (SQLite)
3. CORS is enabled for frontend-backend communication
4. Environment variable `REACT_APP_API_URL` must be set in `.env` file

---

---

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- .NET SDK (v10.0 or higher)
- Git
- SQLite3

### 1. Clone the Repository
```powershell
git clone https://github.com/yourusername/HelpdeskAssessment.git
cd HelpdeskAssessment
```

### 2. Backend Setup (API)
```powershell
cd api
npm install
node server.js
```
The API will start on **http://localhost:4000**

### 3. Frontend Setup (React)
Open a **new terminal**:
```powershell
cd frontend
npm install
npm start
```
The frontend will open on **http://localhost:3000**

### 4. .NET Console App
Open a **third terminal**:
```powershell
cd dotnet-task\EmployeeStats
dotnet run
```

---

## Running the Full Application

**You need 3 terminal windows:**

**Terminal 1 - Backend:**
```powershell
cd D:\HelpdeskAssessment\api
npm install
node server.js
```

**Terminal 2 - Frontend:**
```powershell
cd D:\HelpdeskAssessment\frontend
npm install
npm start
```

**Terminal 3 - .NET App:**
```powershell
cd D:\HelpdeskAssessment\dotnet-task\EmployeeStats
dotnet run
```

Then visit: **http://localhost:3000**

---

## Push to GitHub

### Create Repository on GitHub
1. Go to [GitHub](https://github.com/new)
2. Create a new repository named `HelpdeskAssessment`
3. Do **NOT** initialize with README (we have one)
4. Click "Create repository"

### Push Your Code
```powershell
cd D:\HelpdeskAssessment
git remote add origin https://github.com/yourusername/HelpdeskAssessment.git
git branch -M main
git push -u origin main
```

---

## Troubleshooting

### Backend won't connect
- Ensure backend is running on port 4000
- Check `.env` file has `REACT_APP_API_URL=http://localhost:4000`
- Restart frontend after backend is running

### Frontend shows "Failed to fetch"
- Make sure backend is running first
- Check browser console for CORS errors
- Verify ports 3000 and 4000 are not in use

### .NET app can't find employees.csv
- Run from inside `/dotnet-task/EmployeeStats` folder
- CSV file must be in same directory as Program.cs

### Port already in use
```powershell
# Kill all Node processes
Stop-Process -Name node -Force

# Find process on port 4000
netstat -ano | findstr :4000
```

---

## Submission Instructions

### Step 1: Create GitHub Repository
1. Go to https://github.com/new
2. Name: `HelpdeskAssessment`
3. Description: `Helpdesk Ticket System - Full Stack Assessment (React, Node.js, SQLite, .NET)`
4. Choose: **Public**
5. Click: **Create repository**

### Step 2: Push to GitHub
```powershell
cd D:\HelpdeskAssessment
git remote add origin https://github.com/YOUR_USERNAME/HelpdeskAssessment.git
git branch -M main
git push -u origin main
```

### Step 3: Submit
Share the link: `https://github.com/YOUR_USERNAME/HelpdeskAssessment`

---

## ✅ All Tasks Completed

- ✅ Frontend (React) with components and validation
- ✅ Backend API (Node.js/Express) with 3 endpoints
- ✅ Database (SQLite) with schema and sample queries
- ✅ .NET Console App with CSV parsing
- ✅ Proper project structure
- ✅ Git repository initialized
- ✅ Complete documentation
- ✅ Ready for GitHub submission

**Your assessment project is ready for submission!**
