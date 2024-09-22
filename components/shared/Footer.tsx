import React from 'react';
import Link from 'next/link';

export const Footer = () => {
    return (
        <footer className={`mt-8 py-4 border-t`}>
            <div className="container mx-auto text-center">
                <p>&copy; 2024 GridCraft. All rights reserved.</p>
                <div className="mt-2 space-x-2">
                    <Link href={"https://hessennasser.github.io/smartdev-website/"} className='underline' >
                        Hessen Nasser
                    </Link>
                </div>
            </div>
        </footer>
    );
}