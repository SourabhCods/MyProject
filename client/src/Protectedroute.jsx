import { Navigate } from "react-router-dom"
import { auth } from "./firebaseInit.js"
import { useEffect, useState } from "react"

const ProtectedRoute = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser)
      setLoading(false)
    });

    return () => unsubscribe()
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  return user ? children : <Navigate to="/login" />
}

export default ProtectedRoute
