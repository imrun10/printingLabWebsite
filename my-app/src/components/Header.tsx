"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { fetchUser } from '@/api/database/fetch';
import { Typography } from '@mui/material';
import Link from 'next/link';
import supabase from '@/database/superbase';
import { useRouter } from 'next/navigation';

const Header: React.FC = (user) => {
    const router = useRouter();
    const [checkUser, setCheckUser] = useState<any>(null)

    async function logOut() {
        let { error } = await supabase.auth.signOut()
        router.push('/login')
    }

    useEffect(() => {
        const checkUser = async () => {
            const user = await fetchUser();
            if (user) {
                console.log("Signed in already", user);
                setCheckUser(user)
            } else {
                console.log("Not signed in");
                setCheckUser(null)
            }
        };

        checkUser();
    }, []);

    return (
        <header>
            <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
                <div className="flex justify-between items-center mx-auto max-w-screen-xl">
                    <a href="https://flowbite.com" className="flex items-center">
                        <img src="https://flowbite.com/docs/images/logo.svg" className="mr-3 h-6 sm:h-9" alt="Flowbite Logo" />
                        <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Flowbite</span>
                    </a>
                    <div className="flex-grow flex justify-center">
                        <ul className="flex space-x-4">
                            <li>
                                <a href="#" className="block py-2 px-3 text-gray-700 border-b border-transparent hover:border-primary-700 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white dark:border-gray-700">Dashboard</a>
                            </li>
                            <li>
                                <a href="#" className="block py-2 px-3 text-gray-700 border-b border-transparent hover:border-primary-700 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white dark:border-gray-700">Marketplace</a>
                            </li>
                            <li>
                                <a href="#" className="block py-2 px-3 text-gray-700 border-b border-transparent hover:border-primary-700 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white dark:border-gray-700">Account</a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        {checkUser == null ?
                            <a href="/login" className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800">Log in</a>
                            :
                            <button onClick={logOut} className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800">Log Out</button>
                        }
                        <button data-collapse-toggle="mobile-menu-2" type="button" className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="mobile-menu-2" aria-expanded="false">
                            <span className="sr-only">Open main menu</span>
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path>
                            </svg>
                            <svg className="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;


