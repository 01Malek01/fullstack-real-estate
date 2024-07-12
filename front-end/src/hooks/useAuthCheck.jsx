import { useAuth0 } from '@auth0/auth0-react';
import React from 'react'
import { toast } from 'react-toastify';

export function useAuthCheck() {
 const {isAuthenticated} = useAuth0();
 const validateLogin = () => {
  if(!isAuthenticated){
   toast.error("Please login to continue")
   return false
  }
  return true
 }
  return (
    {
     validateLogin
    }
  )
}

export default useAuthCheck
