import React from 'react';
import Link from 'next/link';

export const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-800 text-gray-200 py-6 border-t border-gray-700">
            <div className="container mx-auto text-center">
                <p className="text-sm mb-4">&copy; 2024 GridCraft. All rights reserved.</p>
                <div className="flex justify-center space-x-4">
                    <Link
                        href="https://hessennasser.github.io/smartdev-website/"
                        className="text-blue-400 hover:text-blue-300 underline transition-colors duration-300"
                        aria-label="Visit Hessen Nasser's website"
                    >
                        Hessen Nasser
                    </Link>
                </div>
            </div>
        </footer>
    );
};
