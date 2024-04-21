import Link from 'next/link';
import React from 'react'

const Footer = () => {

  const handleSmoothScroll = (id) => {
    setOpen(false)
    if (id === '/') {
      return navigate('/')
    }

    const targetElement = document.getElementById(id);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };
  return (
    <div id='About Me' className=' h-72 footerCss mt-44'>

      <footer className="flex h-full flex-col space-y-10 justify-center py-9 bg-gray-900">
        {/* pages: [
                {name: 'Home', id: '/', href: '/' },
                {name: 'Products', id: 'Prod', href: '#Prod' },
                {name: 'About Me', id: 'About', href: '#About' },
                ] */}
        <nav className="flex justify-center flex-wrap gap-6 text-gray-100 font-medium">
          <Link className="hover:text-gray-500" href="/">Home</Link>
          <Link className="hover:text-gray-500" href="#Prod">Products</Link>
          <Link className="hover:text-gray-500" href="#">Services</Link>
          <Link className="hover:text-gray-500" href="#">Media</Link>
          <Link className="hover:text-gray-500" href="#">Gallery</Link>
          <Link className="hover:text-gray-500" href="#">Contact</Link>
        </nav>

        <div className="flex justify-center space-x-5">
          <Link href="https://www.linkedin.com/in/deveshdighe" target="_blank" rel="noopener noreferrer">
            <img src="https://img.icons8.com/fluent/30/000000/linkedin-2.png" />
          </Link>
          <Link href="https://www.instagram.com/im___deveshhh?igsh=MTMwHR2Ym01NXhmaA==" target="_blank" rel="noopener noreferrer">
            <img src="https://img.icons8.com/fluent/30/000000/instagram-new.png" />
          </Link>
          <Link href="https://github.com/DeveshDighe" target="_blank" rel="noopener noreferrer">
            <img src="https://img.icons8.com/fluent/30/000000/github.png" />
          </Link>
          <Link href="https://twitter.com/devesh_dighe" target="_blank" rel="noopener noreferrer">
            <img src="https://img.icons8.com/fluent/30/000000/twitter.png" alt="Twitter" />
          </Link>


        </div>
        <p className="text-center text-gray-400 font-medium">🤍 Thank You For Visiting 🤍</p>
      </footer>
    </div>
  )
}

export default Footer