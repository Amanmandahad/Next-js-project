"use client"
import React from 'react'
import { SessionProvider } from 'next-auth/react'
const Provider = ({children,session}) => {
  return (
    <session session={session}>
   {children}
    </session>
  )
}

export default Provider
