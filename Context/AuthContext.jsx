"use client"
import React, { createContext, useReducer } from 'react'

export const MyContext = createContext()

const initialState = { user: null }

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_USER':
      console.log('User added:', action.payload);
      return { ...state, user: action.payload };

    case 'REMOVE_USER':
      console.log('User removed');
      return { ...state, user: null };

    default:
      return state;
  }
}

const AuthContext = ({ children }) => {

  const [state, dispatch] = useReducer(reducer, initialState);
  
  return (
    <MyContext.Provider value={{ state, dispatch }}>
      {children}
    </MyContext.Provider>
  )
}

export default AuthContext
