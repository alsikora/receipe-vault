import Link from "next/link";
import {Logo} from "@/components/Logo";
import {createClient} from "@/prismicio";
import React from "react";
import {PrismicNextLink} from "@prismicio/next";

export const Header = async () => {
  const client = createClient()
  const settings = await client.getSingle("settings")
  
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Logo className="w-12 h-12 mr-2 text-amber-700"/>
              <span className="text-2xl font-bold text-amber-700">Recipe Vault</span>
            </Link>
          </div>

          <nav className="hidden md:flex space-x-8">
            {settings.data.navigation.map((item, index) =>
              <PrismicNextLink field={item.link} key={index}
                               className="text-gray-700 hover:text-amber-700 font-medium transition-colors duration-200"/>
            )}
          </nav>

          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-500 hover:text-amber-700 transition-colors duration-200">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                   stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round"
                      d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"/>
              </svg>
            </button>

            {/* Mobile menu button */}
            <button className="md:hidden p-2 text-gray-500 hover:text-amber-700 transition-colors duration-200">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                   stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu (hidden by default) */}
      {/* Add mobile menu implementation if needed */}
    </header>
  )
}