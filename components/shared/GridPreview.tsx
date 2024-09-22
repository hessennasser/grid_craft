"use client";
import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { useTheme } from 'next-themes';
import { Button } from '../ui/button';
import html2canvas from 'html2canvas';
import ResponsiveGridPreview from './ResponsiveGridPreview';

interface ResponsiveSettings {
    [key: string]: { columns: number; rows: number };
}

interface GridPreviewProps {
    rows: number;
    columns: number;
    gap: number;
    cellColor: string;
    customClass?: string;
    responsiveSettings: ResponsiveSettings;
}

interface GridCellProps {
    isDarkMode: boolean;
    color: string;
    customClass?: string;
}

const GridCell: React.FC<GridCellProps> = ({ isDarkMode, color, customClass }) => (
    <Card className={`flex items-center justify-center ${customClass ? customClass : ""}`} style={{ backgroundColor: color }}>
        <div className={`w-4 h-4 ${isDarkMode ? 'bg-gray-500' : 'bg-gray-400'} rounded-sm`}></div>
    </Card>
);

export const GridPreview: React.FC<GridPreviewProps> = ({
    rows,
    columns,
    gap,
    cellColor,
    customClass,
    responsiveSettings
}) => {
    const { theme } = useTheme();
    const isDarkMode = theme === 'dark';
    const [selectedCell, setSelectedCell] = useState<number | null>(null);

    const handleCellClick = (index: number) => {
        setSelectedCell(index === selectedCell ? null : index);
    };

    // const handleExportAsImage = () => {
    //     const gridElement = document.getElementById('grid-preview-container');
    //     if (gridElement) {
    //         html2canvas(gridElement).then(canvas => {
    //             const link = document.createElement('a');
    //             link.href = canvas.toDataURL('image/png');
    //             link.download = 'grid-preview.png';
    //             link.click();
    //         });
    //     }
    // };

    return (
        <div className='lg:sticky lg:top-20 h-fit'>
            <h2 className="text-2xl font-semibold mb-4">Grid Preview</h2>
            <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <div
                    id="grid-preview-container"
                    style={{
                        display: 'grid',
                        gridTemplateColumns: `repeat(${columns}, 1fr)`,
                        gridTemplateRows: `repeat(${rows}, 1fr)`,
                        gap: `${gap}px`,
                        height: '400px'
                    }}
                >
                    {Array(rows * columns).fill(0).map((_, i) => (
                        <div
                            key={i}
                            onClick={() => handleCellClick(i)}
                            className={`cursor-pointer transition-all duration-200 rounded-xl ${selectedCell === i ? 'ring-2 ring-blue-500' : ''}`}
                        >
                            <GridCell isDarkMode={isDarkMode} color={cellColor} customClass={customClass} />
                        </div>
                    ))}
                </div>
            </div>
            {selectedCell !== null && (
                <div className="mt-4">
                    <p>Selected Cell: Row {Math.floor(selectedCell / columns) + 1}, Column {(selectedCell % columns) + 1}</p>
                </div>
            )}
            <h3 className="text-xl font-semibold mt-8 mb-4">Responsive Previews</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <h4 className="text-sm font-medium mb-2">Small<span className='text-green-500 text-xs'>{" (sm)"}</span></h4>
                    <ResponsiveGridPreview
                        rows={responsiveSettings.sm.rows}
                        columns={responsiveSettings.sm.columns}
                        gap={gap}
                        cellColor={cellColor}
                        customClass={customClass}
                        breakpoint="sm"
                    />
                </div>
                <div>
                    <h4 className="text-sm font-medium mb-2">Medium<span className='text-green-500 text-xs'>{" (md)"}</span></h4>
                    <ResponsiveGridPreview
                        rows={responsiveSettings.md.rows}
                        columns={responsiveSettings.md.columns}
                        gap={gap}
                        cellColor={cellColor}
                        customClass={customClass}
                        breakpoint="md"
                    />
                </div>
                <div>
                    <h4 className="text-sm font-medium mb-2">Large<span className='text-green-500 text-xs'>{" (lg)"}</span></h4>
                    <ResponsiveGridPreview
                        rows={responsiveSettings.lg.rows}
                        columns={responsiveSettings.lg.columns}
                        gap={gap}
                        cellColor={cellColor}
                        customClass={customClass}
                        breakpoint="lg"
                    />
                </div>
            </div>
        </div>
    );
};