"use client"

import React, { useContext, useRef } from 'react';
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation';
import { MyContext } from '@/Context/AuthContext';
import Link from 'next/link';
import axios from 'axios';
import { api } from '@/lib/config/configure';

const Login = () => {

  const { state, dispatch } = useContext(MyContext)

  const navigate = useRouter()
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Accessing input values using refs
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    let userLoginData = { email, password }

    try {
      console.log(userLoginData, 'userLoginData');
      const responce = await api.post('/api/auth/signin', userLoginData)
      if (responce.data.success) {
        console.log(responce.data, 'data.user');
        toast.success('Login successfull')
        dispatch({ type: "ADD_USER", payload: responce.data.user });
        console.log(responce.data.jwt , 'jwt jwt');
        localStorage.setItem('MyToken', JSON.stringify(responce.data.jwt))
        navigate.push('/')
      }
    } catch (error) {
      toast.error(error.response?.data.message)
      console.error(error)
    }
  };

  return (
    <div className="max-w-md mx-auto m-8">
      <h2 className="text-3xl font-semibold text-center mb-4">Login {state?.user?.name}</h2>
      <form onSubmit={handleSubmit} className="space-y-4 px-2">
        <div>
          <label htmlFor="email" className="block text-gray-700">Email</label>
          <input
            ref={emailRef}
            type="email"
            id="email"
            name="email"
            className="w-full border rounded-md px-3 py-2 mt-1 focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-gray-700">Password</label>
          <input
            ref={passwordRef}
            type="password"
            id="password"
            name="password"
            className="w-full border rounded-md px-3 py-2 mt-1 focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <p className=' my-2'>Create an account <Link href={'/register'} className=' text-blue-400'>Register</Link></p>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300">Login</button>
      </form>
    </div>
  );
};

export default Login;
