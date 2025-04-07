import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/authContext'
import { doSignOut } from '../../firebase/auth'

const Header = () => {
    const navigate = useNavigate()
    const { userLoggedIn } = useAuth()
    return (
        <nav className='flex flex-row gap-x-4 w-full  z-20 fixed top-0 left-0 items-center  border-blue-500 bg-sky-100 shadow-lg px-6'>
            <div className='flex-1'>
                <Link to='/' className='text-3xl font-bold text-gray-900 hover:text-blue-600 transition-colors duration-300'>Virtual Herbal garden</Link>
            </div>
            <div className='flex flex-row gap-x-4 items-center'>
                {userLoggedIn ? (
                    <button
                        onClick={() => { doSignOut().then(() => { navigate('/login'); }) }}
                        className='text-xl text-white bg-blue-500 hover:bg-sky-700 transition-colors duration-300 border-2 border-blue-500 p-2 rounded-lg shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50'
                    >
                        Logout
                    </button>
                ) : (
                    <>
                        <Link
                            to='/login'
                            className='text-xl text-white bg-blue-500 hover:bg-blue-700 transition-colors duration-300 border-2 border-blue-500 p-2 rounded-lg shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50'
                        >
                            Login
                        </Link>
                        <Link
                            to='/register'
                            className='text-xl text-white bg-blue-500 hover:bg-blue-700 transition-colors duration-300 border-2 border-blue-500 p-2 rounded-lg shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ml-4'
                        >
                            Register
                        </Link>
                    </>
                )}
            </div>
        </nav>
    )
}

export default Header