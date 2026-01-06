# Resilient Live Polling System

A real-time, resilient live polling system built as part of the **Intervue.io – SDE Intern Assignment**. The system supports two personas (Teacher and Student) and ensures correct state recovery, timer synchronization, and vote integrity even across refreshes and late joins.

---

## 🔗 Live Links

* **Frontend (Vercel):** [https://intervue-live-pool.vercel.app/](https://intervue-live-pool.vercel.app/)
* **Backend (Render):** [https://intervue-live-pool.onrender.com](https://intervue-live-pool.onrender.com)
* **GitHub Repository:** [https://github.com/ROHITH0999/intervue-live-pool](https://github.com/ROHITH0999/intervue-live-pool)

---

## 🧠 System Overview

This application is designed with the **backend as the single source of truth**. All critical state such as the active poll, timer, and votes are persisted in the database and synchronized to clients using WebSockets.

Key goals:

* Real-time updates
* Refresh-safe UI state recovery
* Late-joiner timer synchronization
* One vote per student enforced on the backend

---

## 👥 Personas

### 👩‍🏫 Teacher (Admin)

* Create a poll with:

  * Question
  * Multiple options
  * Configurable time limit
* View live voting results in real time
* Poll automatically ends when the timer expires

### 👨‍🎓 Student (User)

* Enter name on first visit (per tab/session)
* Instantly receive the active poll
* See the **remaining time** (not full duration if joined late)
* Vote only once per poll
* View live results after voting

---

## ⏱️ How Timer Synchronization Works

1. When a teacher creates a poll, the backend stores:

   * `startTime`
   * `endTime`
2. The server calculates remaining time as:

```text
remainingTime = endTime - currentServerTime
```

3. Whenever a student connects or refreshes, the backend sends the current poll state along with the correct `remainingTime`.

➡️ This ensures:

* Late joiners see reduced time
* Page refresh does not reset the timer

---

## 🔄 State Recovery (Resilience)

* Poll state is stored in MongoDB
* On refresh or reconnect:

  * Backend checks for an ACTIVE poll
  * Sends the poll state to the client via Socket.io

➡️ The UI resumes exactly where it left off.

---

## 🔐 Vote Integrity

* Each vote is associated with a unique socket/session
* Backend checks prevent multiple votes per student per poll
* Even if the client is manipulated, duplicate votes are rejected

---

## 🏗️ Tech Stack

### Frontend

* React.js (Vite)
* TypeScript
* Socket.io Client
* Deployed on **Vercel**

### Backend

* Node.js + Express
* TypeScript
* Socket.io
* MongoDB (local for dev, Atlas for production)
* Deployed on **Render**

---

## 📂 Project Structure

```
intervue-live-pool/
├── backend/
│   ├── src/
│   │   ├── config/        # DB configuration
│   │   ├── models/        # Poll & Vote schemas
│   │   ├── services/      # Business logic
│   │   ├── sockets/       # Socket.io handlers
│   │   └── server.ts
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── pages/         # Teacher & Student pages
│   │   ├── hooks/         # useSocket hook
│   │   └── App.tsx
│   └── package.json
└── README.md
```

---

## ▶️ How to Run Locally

### Prerequisites

* Node.js
* MongoDB (local)

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Open:

* Teacher: [http://localhost:5173](http://localhost:5173)
* Student: [http://localhost:5173/student](http://localhost:5173/student)

---

## ✅ Assignment Requirements Covered

* ✔ Real-time polling using WebSockets
* ✔ Persistent state with database
* ✔ Refresh-safe UI recovery
* ✔ Late joiner timer synchronization
* ✔ Backend-enforced vote integrity
* ✔ Clean separation of concerns
* ✔ Hosted frontend and backend

---

## 📌 Notes

* Backend is intentionally designed as the source of truth
* UI is minimal by design; focus is on correctness and system behavior

---

## 🙌 Author

**Rohith T R**
SDE Intern Applicant – Intervue.io

---

Thank you for reviewing this project.
