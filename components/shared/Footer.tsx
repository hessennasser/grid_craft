"use client"
import React from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';

export const Footer = () => {
    const { theme, setTheme } = useTheme();
    const isDarkMode = theme === 'dark';

    return (
        <footer className={`mt-8 py-4 border-t`}>
            <div className="container mx-auto text-center">
                <p>&copy; 2024 GridCraft. All rights reserved.</p>
                <div className="mt-2 space-x-2">
                    <Link href={"https://hessennasser.github.io/smartdev-website/"} />
                </div>
            </div>
        </footer>
    );
}