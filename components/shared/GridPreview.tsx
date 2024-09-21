"use client"
import React from 'react';
import { Card } from "@/components/ui/card";
import { useTheme } from 'next-themes';

const GridCell = ({ isDarkMode }: { isDarkMode: boolean }) => (
    <Card className={`${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} flex items-center justify-center`}>
        <div className={`w-4 h-4 ${isDarkMode ? 'bg-gray-500' : 'bg-gray-400'} rounded-sm`}></div>
    </Card>
);

export const GridPreview = ({ rows, columns, gap }: {
    rows: number, columns: number, gap: number
}) => {
    const { theme, setTheme } = useTheme();
    const isDarkMode = theme === 'dark';

    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">Grid Preview</h2>
            <Card className={`p-4 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: `repeat(${columns}, 1fr)`,
                        gridTemplateRows: `repeat(${rows}, 1fr)`,
                        gap: `${gap}px`,
                        height: '300px'
                    }}
                >
                    {Array(rows * columns).fill(0).map((_, i) => <GridCell key={i} isDarkMode={isDarkMode} />)}
                </div>
            </Card>
        </div>
    );
}