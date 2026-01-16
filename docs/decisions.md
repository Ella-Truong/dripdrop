# Decisions vs Trade-offs

## 1. UserProvider Component
### Why?
   It would be better to manage one shared authenticated user across all pages in website. Components like `NavigationBar` or pages like `favorites`, `cart items`, and `profile` always have the current user without repeated fetches.

### Decision: 

- Implement `UserProvider` using **React Context** and the `useContext` hook.
- Mark it as **Client Component** ('use client') because it:
    - Holds state (user, setUser)
    - Uses `useEffect` to fetch current profile
    - Shares state across pages vias context and `useContext`
- Wrap it around the **Root Layout** (app/layout.js) so all client components have access to the user context

### Concept and Flow: 
1. Create Context:
   ` const UserContext = createContext()`
   
   - Stores shared state `{user, setUSer}`

2. Wrap components with provider:
   ```text
   <UserProvider>
      <NavigationBar />
      <div>{children}</div>
      <Footer/>
   </UserProvder>
   ```
   - `<UserProvider>` internally uses `<UserContext.Provider>`
   - Initializes `user` state and fetches profile


3. Provide value to children:
   ```text
   <UserContext.Provider value={{user, setUser}}>
      {children}
   </UserContext.Provider>
   ```
   - All nested components can access `user` and `setUser`

4. Consume in child component:
   ```text
   const {user, setUser} = useUser()
   ```
   - `useUser()` is a custom hook: `export const useUser = () => useContext(UserContext)`
   - Components line `NavigationBar` can render UI based on `user` or update it on login/logout
  
### Trade-offs:
Managing user state in UserProvider is convenient for global access and instant UI updates but requires client-side fetching, may show a brief unauthenticated state on first render, and depends on additional logic for token refresh and server side security check (handled in lib/supabase/serverClient.js)


## 2. Manually setting Cookies Configuration 
### Why? 
- Prevent the client from accessing the refresh token, increasing security against XSS atacks
- Avoids automatic logout after the default 1-hour access token expiry
- Provide consistent authentication across page reloads and multiple tabs
- Allows full control over refresh token flow and server-side authorization checks



