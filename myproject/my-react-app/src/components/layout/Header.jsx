import { useState } from "react";
import Link  from "next/link";

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
  
    return (
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <div className="text-2xl font-bold text-blue-600">
              <Link href="/">MyLogo</Link>
            </div>
  
            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-6">
              <Link href="/" className="text-gray-600 hover:text-blue-500">Home</Link>
              <Link href="/about" className="text-gray-600 hover:text-blue-500">About</Link>
              <Link href="/services" className="text-gray-600 hover:text-blue-500">Services</Link>
              <Link href="/contact" className="text-gray-600 hover:text-blue-500">Contact</Link>
            </nav>
  
            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-gray-600 hover:text-blue-500 focus:outline-none"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? "✖" : "☰"}
            </button>
          </div>
  
          {/* Mobile Menu */}
          {menuOpen && (
            <nav className="md:hidden flex flex-col space-y-4 py-4 border-t">
              <Link href="/" className="text-gray-600 hover:text-blue-500">Home</Link>
              <Link href="/about" className="text-gray-600 hover:text-blue-500">About</Link>
              <Link href="/services" className="text-gray-600 hover:text-blue-500">Services</Link>
              <Link href="/contact" className="text-gray-600 hover:text-blue-500">Contact</Link>
            </nav>
          )}
        </div>
      </header>
    );
  }
  