"use client"
import { Fragment, useContext, useEffect } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/navigation';
import { MyContext } from '@/Context/AuthContext'
import axios from 'axios';
import Cookies from 'js-cookie';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbar() {

  const { state, dispatch } = useContext(MyContext)


  const getUserData = async (jwtData) => {
    try {
      
  
      if (!jwtData) {
        console.error('JWT token not found in local storage');
        return; // Exit early if token is not found
      }
  
      const response = await axios.post('/api/auth/getUserProfile', { jwt: jwtData });
      if (response.data.success) {
        dispatch({type : 'ADD_USER' , payload : response.data.user})
      }
  
      // Handle response data if needed
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }
  

  useEffect(() => {
    const jwtData = Cookies.get("MyToken");
    if (jwtData) {
      getUserData(jwtData);
      
    }
  }, [])

  const navigate = useRouter()


  const navigation = [
    { name: 'My Lectures', href: '', current: false },
    state?.user?.role === "ADMIN" ? { name: 'Create Course', href: '/createCourse', current: false } : null,
    { name: 'Home',  current: false },
    { name: 'About Me', current: false },
  ].filter(item => item !== null);



  const handleuserClicks = (name) => {
    if (name === 'My Lectures') {
      navigate.push('/user/my_lectures')
    } else if (name === 'Home') {
      navigate.push('/')
    } else if (name === 'Create Course') {
      navigate.push('/course/create')
    } else if (name === 'About Me') {
      // Smooth scroll to the About section
      const element = document.getElementById('About Me')
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  const handleLogout = () => {
    Cookies.remove('MyToken')
    // localStorage.removeItem('MyToken')
    dispatch({ type: 'REMOVE_USER' })
  }

  return (
    <Disclosure as="nav" className=" bg-blue-500 rounded-br-3xl rounded-bl-3xl">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <img
                    className="h-8 w-auto"
                    src="https://www.freeiconspng.com/thumbs/yellow-lightning-png/yellow-lightning-bolt-clipart-30.png"
                    alt="Logo"
                  />
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <p
                        key={item.name}
                        href={item.href}
                        onClick={() => handleuserClicks(item.name, item.href)}
                        className={classNames(
                          item.current ? 'bg-gray-900 text-white cursor-pointer' : 'text-white hover:bg-gray-700 hover:text-white',
                          'rounded-md px-3 py-2 text-sm font-medium cursor-pointer'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {/* <button
                  type="button"
                  className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button> */}

                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="relative flex rounded-full bg-white text-blue-500 text-sm focus:outline-none font-bold  ">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      <p className="h-8 w-8 rounded-full flex justify-center items-center text-lg">
                        {state?.user?.name ? state.user.name.slice(0, 1).toUpperCase() : "U"}
                      </p>
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <p
                            href="#"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700 cursor-pointer')}
                          >
                            Your Profile
                          </p>
                        )}
                      </Menu.Item>
                      {state?.user?.name ? (
                        <Menu.Item>
                          {({ active }) => (
                            <p
                              onClick={handleLogout}
                              href="#"
                              className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700 cursor-pointer')}
                            >
                              LogOut
                            </p>
                          )}
                        </Menu.Item>
                      ) : (
                        <Menu.Item>
                          {({ active }) => (
                            <p
                              onClick={() => navigate.push('/login')}
                              href=""
                              className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700 cursor-pointer')}
                            >
                              LogIn
                            </p>
                          )}
                        </Menu.Item>
                      )}
                    </Menu.Items>
                  </Transition>
                </Menu>

              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  onClick={() => handleuserClicks(item.name)}
                  className={classNames(
                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block rounded-md px-3 py-2 text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}
