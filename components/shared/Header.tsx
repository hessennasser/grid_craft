"use client";
import React from 'react';
import { useTheme } from 'next-themes';
import { Github, Moon, Sun } from 'lucide-react';
import { Switch } from "@/components/ui/switch";
import Link from 'next/link';

export const Header: React.FC = () => {
    const { theme, setTheme } = useTheme();
    const isDarkMode = theme === 'dark';

    return (
        <header className="fixed w-full top-0 left-0 h-fit z-50 px-2 md:px-6 py-2">
            <div className="border-gray-200 dark:border-gray-700/50 bg-white/50 dark:bg-gray-900/50 p-4 shadow-md container mx-auto flex justify-between items-center rounded-lg backdrop-blur-md">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100">
                    <Link href="/">GridCraft</Link>
                </h1>

                <nav className="flex items-center space-x-6 md:space-x-8">
                    <Link
                        href="https://github.com/hessennasser"
                        aria-label="GitHub repository"
                        className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-300"
                    >
                        <Github className="h-6 w-6" />
                    </Link>

                    <div className="flex items-center space-x-4">
                        <Switch
                            checked={isDarkMode}
                            onCheckedChange={() => setTheme(isDarkMode ? 'light' : 'dark')}
                            aria-label="Toggle Dark Mode"
                            className="bg-gray-200 dark:bg-gray-600 rounded-full duration-300"
                        >
                            <span
                                className={`absolute left-1 top-1 w-4 h-4 bg-white dark:bg-gray-800 rounded-full transform transition-transform duration-300 ${isDarkMode ? 'translate-x-6' : 'translate-x-0'}`}
                            />
                        </Switch>
                        {isDarkMode ? (
                            <Moon className="h-5 w-5 text-gray-400 dark:text-gray-200" aria-label="Dark mode icon" />
                        ) : (
                            <Sun className="h-5 w-5 text-gray-400 dark:text-gray-200" aria-label="Light mode icon" />
                        )}
                    </div>
                </nav>
            </div>
        </header>
    );
};
