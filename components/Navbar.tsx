"use client"
import { Brain } from 'lucide-react';
import React, { useState } from 'react';
import { Button } from './ui/button';
import Link from 'next/link';


import { Menu, X } from 'lucide-react';

import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose
} from './ui/sheet';

const Navbar = () => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <header className="container mx-auto px-4 py-3 flex justify-between items-center from-blue-50 to-white bg-white shadow-md rounded-lg">
                <div className="flex items-center space-x-2">
                    <Link href="/" className='flex items-center space-x-2'>
                        <Brain className="w-8 h-8 text-blue-600" />
                        <h1 className="text-2xl font-bold text-gray-800">Quizapp</h1>
                    </Link>
                </div>
                
                {/* Desktop Navigation */}
                <nav className="hidden md:flex space-x-4">
                    <Button variant="ghost">Features</Button>
                    <Button variant="ghost">How it works</Button>
                    <Button variant="default">Login</Button>
                </nav>
                
                {/* Mobile Burger Menu */}
                <Sheet open={open} onOpenChange={setOpen}>
                    <SheetTrigger asChild className="md:hidden">
                        <Button variant="ghost" size="icon">
                            <Menu className="h-6 w-6" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="right" className="w-64">
                        <div className="flex flex-col mt-8 space-y-4">
                            <SheetClose asChild>
                                <Button variant="ghost" className="justify-start">Features</Button>
                            </SheetClose>
                            <SheetClose asChild>
                                <Button variant="ghost" className="justify-start">How it works</Button>
                            </SheetClose>
                            <SheetClose asChild>
                                <Button variant="default" className="justify-start">Login</Button>
                            </SheetClose>
                        </div>
                    </SheetContent>
                </Sheet>
            </header>
        </>
    );
}

export default Navbar;
