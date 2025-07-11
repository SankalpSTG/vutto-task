import React, { useEffect, useState } from "react"
import { Navigate } from "react-router-dom"
import { ClientApi } from "./api/Api"
import { API_ENDPOINTS } from "./constants/api-endpoints"

interface Props {
  children: React.ReactNode
}

const ProtectedRoute: React.FC<Props> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  useEffect(() => {
    const isLoggedIn = async () => {
      try{
        await ClientApi.post(API_ENDPOINTS.isLoggedIn)
        setIsAuthenticated(true)
      }catch(error){
        setIsAuthenticated(false)
      }
    }
    isLoggedIn()
  }, [])
  if (isAuthenticated === null) return <></>
  if (!isAuthenticated) return <Navigate to="/login" replace />
  return <>{children}</>
}

export default ProtectedRoute
