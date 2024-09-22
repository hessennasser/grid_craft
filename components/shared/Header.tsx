"use client"
import React from 'react';
import { useTheme } from 'next-themes';
import { Github, Moon, Sun } from 'lucide-react';
import { Switch } from "@/components/ui/switch";
import Link from 'next/link';

export const Header: React.FC = () => {
    const { theme, setTheme } = useTheme();
    const isDarkMode = theme === 'dark';

    return (
        <header className="p-4 border-b">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-2xl font-bold">GridCraft</h1>

                <nav className="flex items-center space-x-4">
                    <Link
                        href="https://github.com/hessennasser"
                        aria-label="GitHub repository"
                        className="text-white"
                    >
                        <Github className="h-5 w-5" />
                    </Link>

                    <div className="flex items-center">
                        <Switch
                            checked={isDarkMode}
                            onCheckedChange={() => setTheme(isDarkMode ? 'light' : 'dark')}
                            aria-label="Toggle Dark Mode"
                            className="bg-white dark:bg-gray-700"
                        />
                        {isDarkMode ? (
                            <Moon className="h-4 w-4 ml-2" aria-label="Dark mode icon" />
                        ) : (
                            <Sun className="h-4 w-4 ml-2" aria-label="Light mode icon" />
                        )}
                    </div>
                </nav>
            </div>
        </header>
    );
};
