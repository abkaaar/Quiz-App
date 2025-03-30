import { Brain } from 'lucide-react';
import React from 'react';
import { Button } from './ui/button';
import Link from 'next/link';

const Navbar = () => {
    return (
        <>
            <header className="container mx-auto px-4 py-3 flex justify-between items-center from-blue-50 to-white">
                <div className="flex items-center space-x-2">
                    <Link href="/" className='flex items-center space-x-2'>
                        <Brain className="w-8 h-8 text-blue-600" />
                        <h1 className="text-2xl font-bold text-gray-800">Quizapp</h1>
                    </Link>
                </div>
                <nav className="space-x-4">
                    <Button variant="ghost">Features</Button>
                    <Button variant="ghost">How it works</Button>
                    <Button variant="default">Login</Button>
                </nav>
            </header>
        </>
    );
}

export default Navbar;
