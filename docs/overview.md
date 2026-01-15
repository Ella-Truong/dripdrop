# Project Overview

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


---
## 🗂️ App Router Learning Goals

### File-Based Routing
- Routes are created using folders in the `app/` directory
- Folder structure maps directly to URLs
- Examples:
  - `app/page.js` → `/`
  - `app/login/page.js` → `/login`
  - `app/api/favorites/route.js` → API endpoint

### Server vs Client Components
- **Server Components (default):** Fetch data, access environment variables, handle server logic  
- **Client Components:** Handle user interaction, manage state, and send requests to APIs  

This helps me understand **what code runs on the server vs the client**.

### Data Fetching Patterns
- Server Components fetch data on page load  
- Client Components fetch data dynamically after user actions  
- API routes provide endpoints for client requests


## ☁️ Deployment Understanding

### Build Process
- Next.js builds the project for production  
- Server Components are prepared for server execution  
- API routes become serverless functions  
- Static pages may be pre-rendered  

### Environment Variables
- Local development: `.env.local`  
- Production: environment variables on deployment platform  
- Keeps sensitive keys secure  

### Production Request Flow
1. User visits deployed website  
2. Requests are routed to server-side pages or API routes  
3. Server-side code executes, fetching data as needed  
4. Pages or API responses are sent to the browser  
5. Client-side JavaScript manages dynamic updates

---
## ☁️ Deployment on Vercel

One of the goals of this project is to understand how to deploy a full-stack **Next.js App Router application** on **Vercel**, the platform made by the creators of Next.js.

### Deployment Steps
1. Connect your GitHub repository to Vercel  
2. Set up environment variables (Supabase URL, Supabase anon key)  
3. Configure build settings (Next.js defaults work automatically)  
4. Deploy the app — Vercel builds the project and prepares:
   - Server Components for server execution  
   - API Routes as serverless functions  
   - Static pages for pre-rendering  
5. Visiting the Vercel URL triggers the same request flow as local development, but running in production  

### Why Vercel
- Optimized for Next.js  
- Serverless functions simplify backend deployment  
- Handles build, caching, and routing automatically  
- Provides a production URL for testing and sharing  

This helps me understand how a **full-stack JavaScript project runs in a live environment**.

---

## 🎓 Learning Objectives
- Understand full-stack data flow from browser → backend → database → browser  
- Learn how Next.js App Router works  
- Understand server vs client execution  
- Practice deploying a full-stack app  
- Debug issues that appear in production  
- Build confidence in full-stack JavaScript development 

