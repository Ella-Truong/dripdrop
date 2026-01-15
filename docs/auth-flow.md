# Authentication & Access Flow 🔑 🛒

This diagram shows the **full authentication flow** in DripDrop — from **user actions** to **backend operations**, including **conditional access to favorites/cart**.

---

## Full Flow: Sign Up → Login → Session → Favorites/Cart

### Sign Up 


1️⃣ User visits site 🌐
       │
       ▼
2️⃣ User clicks "Join now" button 🖱️ on nav bar
       │
       ▼
3️⃣ User fills in info (username, phone, email, password) 👤
       │
       ▼
4️⃣ User clicks "Sign Up" button 🖱️ on SignUpForm
       │
       ▼
5️⃣ Frontend calls Supabase:
       supabase.auth.signUp({ email, password }) 📤
       │  → duplicate email ? direct user to login page : creates user in user table in Supabase Auth 
       ▼
6️⃣ Supabase stores user in Auth table 🗄️
       │
       ▼
7️⃣ Supabase sends verification email ✉️
       │
       ▼
8️⃣ User clicks verification link in email ✅
       │
       ▼
9️⃣ Backend creates profile in "profiles" table 🗃️
       supabase.from('profiles').insert({username, phone })
       │
       ▼
🔟 User is redirected to login page 👤


---
### Sign In


1️⃣1️⃣ User clicks "Sign in" button 🖱️ on nav bar
       │
       ▼
1️⃣2️⃣ User enters email & password 👤
       │
       ▼
1️⃣3️⃣ User clicks "Login" button 🖱️ on LoginForm
       │
       ▼
1️⃣4️⃣ Frontend calls Supabase:
       supabase.auth.signInWithPassword({ email, password }) 📤
       │  → Authenticates user
       ▼
1️⃣5️⃣ Supabase verifies credentials and returns session tokens 🔑
       │
       ▼
1️⃣6️⃣ Frontend stores session (cookies or local storage) 🖥️
       │
       ▼
1️⃣7️⃣ User is now logged in → sees user's username on navigation bar 🎨

---

### Accessing Favorites / Cart 👀


1️⃣ User clicks "Favorites" button 🖱️ or "Cart" icon on nav bar
       │
       ▼
2️⃣ Next.js App Router / Server Component checks session via cookies 🔍
       │
       ├─ If logged in ✅ → continue
       │       │
       │       ▼
       │    Frontend calls API (GET /favorites or GET /cart) 📤
       │       │
       │       ▼
       │    API route verifies session server-side 🔐
       │       │
       │       ▼
       │    Supabase returns favorites/cart 🗄️
       │       │
       │       ▼
       │    Frontend renders data dynamically 🔄
       │
       └─ If NOT logged in ❌ → redirect to Sign Up page 🔁

