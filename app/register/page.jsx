"use client"

import React, { useRef } from 'react';
import {toast} from 'react-hot-toast'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';


const Register = () => {
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  const navigate = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Accessing input values using refs
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;

    if (password !== confirmPassword) {
      toast.error('password and confirmPassword did not match')
    }

    let registerData = { name, email, password, confirmPassword }

    try {
      const responce = await axios.post('/api/auth/signup', registerData)
      if (responce.data.success) {
        toast.success(responce.data.message)
        navigate.push('/login')
      }
    } catch (error) {
      toast.error(error.response.data.error)
    }
  };

  return (
    <div className="max-w-md mx-auto m-8 ">
      <h2 className="text-3xl font-semibold text-center mb-4">Register</h2>
      <form onSubmit={handleSubmit} className="space-y-4 px-2">
        <div>
          <label htmlFor="name" className="block text-gray-700">Name</label>
          <input
            ref={nameRef}
            type="text"
            id="name"
            name="name"
            className="w-full border rounded-md px-3 py-2 mt-1 focus:outline-none focus:border-blue-500"
            required
          />
        </div>
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
        <div>
          <label htmlFor="confirmPassword" className="block text-gray-700">Confirm Password</label>
          <input
            ref={confirmPasswordRef}
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            className="w-full border rounded-md px-3 py-2 mt-1 focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <p className=' my-2'>Already have an account <Link href={'/login'} className=' text-blue-400'>Login</Link></p>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300">Register</button>
      </form>
    </div>
  );
};

export default Register;
