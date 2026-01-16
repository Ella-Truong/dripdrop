# Decisions vs Trade-offs

## 1. UserProvider Component
   
   It would be better to manage one shared authenticated user across all pages in website. Components like `NavigationBar` or pages like `favorites`, `cart items`, and `profile` always have the current user without repeated fetches.

### Decision: 

- Implement `UserProvider` using **React Context** and the `useContext` hook.
- Mark it as **Client Component** ('use client') because it:
    - Holds state (user, setUser)
    - Uses `useEffect` to fetch current profile
    - Shares state across pages vias context and `useContext`
- Wrap it around the **Root Layout** (app/layout.js) so all client components have access to the user context

### Concept: 
- `useContext` : allow any child component to access the value provided by a context without passing props through every level of the tree
- Example:
  
   `const {user, setUser} = useUser();`

  Here, `useUser()` is a *custom hook* that internally calls `useContext(UserContext)` to give access to the shared user state.


  


