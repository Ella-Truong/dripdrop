#Project Overview

## 🎯 Purpose

My goal is to built a **full-stack web application** using **JavaScript** and through this project, I would review what I have learned and have a deep understand about how **data flow through the entire system**, from the user interface to the backend and database, and back to the user.

This project focuses less on "just making features" and more on understanding **what actually happens step by step** in a real application.

Building this project helps me answer quesitons: 
- What happens when a user types my website URL in the browser or clicks a link to my site?
- How does the frontend render the first page the user sees?
- How does the backend handle requests and fetch data from the database?
- How is the page delivered to the user, and how does the app update dynamically after that?
  
---

## ⚙️ Tech Stack

- **Frontend:** Next.js (App Router) + React
- **Backend:** Next.js API Routes (Server-side JavaScript)
- **Database:** Supabase (PostgreSQL)
- **Authentication:** Supabase Auth
- **Styling:** Tailwind CSS
- **Language:** JavaScript

---

## What happen when user visit my web app?

### 1. Users open the website 🌐
- The users click on a link or directly type the URL in their browsers
- The browser sends a request to the server
- This request goes through the **Next.js App Router**

### 2. Frontend / Server Response 🖥️
- Next.js determines which page should be rendered based on the URL
- Server Components can fetch data from the database before sending the page
- API routes handle any backend logic needed for that page

### 3. Database Interaction 📦
- If the page needs data (like a list of items or user info), the backend queries the database
- Supabase returns the requested data to the backend
- Data is processed or formatted for the frontend

### 4. Page Rendering 🎨
- The server sends HTML + initial data to the browser (Server-Side Rendering)
- Client Components take over for interactive elements, managing state and dynamic updates
- The user sees the page and can interact with it in real time

### 5. Continuous Interaction 🔁
- Any further interaction (clicks, form submissions, navigation) triggers:
  - API requests
  - Server processing
  - Database queries
  - Updates sent back to the frontend
- React updates the UI dynamically without full page reloads


## High-Level Data Flow Diagram 🔄

When a user visits the website, the data flow looks like this:

Browser (Client) 🌐  
      │  
      ▼  
+---------------------+  
|  Next.js Frontend   |  ← Server Components render pages  
|  & Client Components|  ← Manage user interaction and state  
+---------------------+  
      │  
      ▼  
+---------------------+  
|   API Routes /      |  ← Handle requests from frontend  
|   Backend Logic     |  
+---------------------+  
      │  
      ▼  
+---------------------+  
|    Database         |  ← Supabase (PostgreSQL)  
|    Queries          |  
+---------------------+  
      │  
      ▼  
Browser (Client) 🌐  ← Receives rendered page / API response  
      │  
      ▼  
User interacts → React updates UI dynamically (Client Components)


