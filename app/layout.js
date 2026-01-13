// app/layout.js
import { UserProvider } from './context/UserContext'
import NavigationBar from '../components/NavigationBar'
import Footer from '../components/Footer'
import './globals.css'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className='flex flex-col min-h-screen'>
        <UserProvider>
          <NavigationBar />
          <div className="flex-1 overflow-auto">{children}</div>
          <Footer />
        </UserProvider>
      </body>
    </html>
  )
}



// Navigation and Footer are always visible when user move between pages on the app, so put these components in the root layout.









