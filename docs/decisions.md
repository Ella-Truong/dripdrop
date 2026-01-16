# Decisions vs Trade-offs

## 1. UserProvider Component
   
   It would be better to manage one shared authenticated user across all pages in website. Components like `NavigationBar` or pages like `favorites`, `cart items`, or and `profile` always have the current user without repeated fetches.

Decision: 

- Implement `UserProvider` using **React Context** and the `useContext` hook.
- Mark it as **Client Component** ('use client') because it:
    - Holds state (user, setUser)
    - Uses `useEffect` to fetch current profile
    - Shares state across pages vias context and `useContext`
- 


