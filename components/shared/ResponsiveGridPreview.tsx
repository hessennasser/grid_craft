"use client";
import React from 'react';
import { Card } from "@/components/ui/card";
import { useTheme } from 'next-themes';

interface ResponsiveGridPreviewProps {
    rows: number;
    columns: number;
    gap: number;
    cellColor: string;
    customClass?: string;
    breakpoint: 'sm' | 'md' | 'lg';
}

const ResponsiveGridPreview: React.FC<ResponsiveGridPreviewProps> = ({
    rows,
    columns,
    gap,
    cellColor,
    customClass,
    breakpoint
}) => {
    const { theme } = useTheme();
    const isDarkMode = theme === 'dark';

    const getPreviewSize = () => {
        switch (breakpoint) {
            case 'sm': return 'w-32 h-24';
            case 'md': return 'w-48 h-36';
            case 'lg': return 'w-64 h-48';
        }
    };

    return (
        <div className={`w-full ${getPreviewSize()} p-2 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: `repeat(${columns}, 1fr)`,
                    gridTemplateRows: `repeat(${rows}, 1fr)`,
                    gap: `${gap}px`,
                    height: '100%'
                }}
            >
                {Array(rows * columns).fill(0).map((_, i) => (
                    <Card
                        key={i}
                        className={`${customClass ? customClass : ""}`}
                        style={{ backgroundColor: cellColor }}
                    />
                ))}
            </div>
        </div>
    );
};

export default ResponsiveGridPreview;