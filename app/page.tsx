"use client";

import React, { useState } from 'react';
import { GridPreview } from '@/components/shared/GridPreview';
import { GridSettings } from '@/components/shared/GridSettings';
import { CodeOutput } from '@/components/shared/CodeOutput';
import GridCraftFeatures from '@/components/shared/GridCraftFeatures';

// Main GridCraft Component
const GridCraft: React.FC = () => {
  const [rows, setRows] = useState(3);
  const [columns, setColumns] = useState(3);
  const [gap, setGap] = useState(10);
  const [copied, setCopied] = useState(false);
  const [codeType, setCodeType] = useState<'css' | 'tailwind' | 'bootstrap'>('css');
  const [responsiveBreakpoint, setResponsiveBreakpoint] = useState<'sm' | 'md' | 'lg' | 'xl'>('md');
  const [cellColor, setCellColor] = useState<string>('#ffffff');

  const [customClass, setCustomClass] = useState<string>('');
  const [isResponsive, setIsResponsive] = useState<boolean>(false);

  const breakpointPrefix: Record<'sm' | 'md' | 'lg' | 'xl', string> = {
    sm: 'sm',
    md: 'md',
    lg: 'lg',
    xl: 'xl',
  };

  const generateGridCode = () => {
    const breakpointSizes: Record<'sm' | 'md' | 'lg' | 'xl', string> = {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    };

    const breakpoint = responsiveBreakpoint;
    const breakpointSize = breakpointSizes[breakpoint];

    const responsiveClasses = isResponsive ? ` ${breakpointPrefix[breakpoint]}:grid-cols-${columns} ${breakpointPrefix[breakpoint]}:grid-rows-${rows}` : '';

    const mediaQuery = isResponsive
      ? `
@media (min-width: ${breakpointSize}) {
  .grid-container {
    grid-template-columns: repeat(${columns}, 1fr);
    grid-template-rows: repeat(${rows}, 1fr);
  }
}
      `.trim()
      : '';

    switch (codeType) {
      case 'css':
        return `
.grid-container {
  display: grid;
  grid-template-columns: repeat(${columns}, 1fr);
  grid-template-rows: repeat(${rows}, 1fr);
  gap: ${gap}px;
  background-color: ${cellColor}; /* Apply cell color */
}
${mediaQuery}
      `.trim();
      case 'tailwind':
        return `
<div class="grid grid-cols-${columns} grid-rows-${rows} gap-[${gap}px] bg-[${cellColor}] ${customClass}${responsiveClasses}">
  <!-- Grid items go here -->
</div>
      `.trim();
      case 'bootstrap':
        return `
<div class="container">
  <div class="row row-cols-${columns} g-${Math.round(gap / 4)} ${customClass}">
    <!-- Repeat this div ${rows * columns} times -->
    <div class="col">
      <!-- Grid item content -->
    </div>
  </div>
</div>
      `.trim();
      default:
        return '';
    }
  };

  const copyToClipboard = (): void => {
    navigator.clipboard.writeText(generateGridCode());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadCode = (): void => {
    const element = document.createElement("a");
    const file = new Blob([generateGridCode()], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `gridcraft-${codeType}-grid.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <svg className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-20" width="200%" height="200%" viewBox="0 0 1024 1024" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="512" cy="512" r="512" fill="url(#gradient)" />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(255,255,255,0.2)" />
                <stop offset="100%" stopColor="rgba(255,255,255,0.05)" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div className="container mx-auto relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
            Welcome to GridCraft
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto">
            Create stunning and responsive grid layouts effortlessly. Customize and generate code for CSS, Tailwind, or Bootstrap with ease.
          </p>
          <a
            href="#get-started"
            className="inline-block px-8 py-3 bg-white text-blue-800 font-semibold text-lg rounded-full shadow-lg transition-transform transform hover:scale-105"
          >
            Get Started
          </a>
        </div>
      </section>

      {/* Grid Generator Section */}
      <section id='get-started' className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
          <GridPreview rows={rows} columns={columns} gap={gap} cellColor={cellColor} />
          <div>
            <GridSettings
              rows={rows} setRows={setRows}
              columns={columns} setColumns={setColumns}
              gap={gap} setGap={setGap}
              codeType={codeType} setCodeType={setCodeType}
              responsiveBreakpoint={responsiveBreakpoint} setResponsiveBreakpoint={setResponsiveBreakpoint}
              cellColor={cellColor} setCellColor={setCellColor}
              customClass={customClass} setCustomClass={setCustomClass}
              isResponsive={isResponsive} setIsResponsive={setIsResponsive}
            />
            <CodeOutput
              generateGridCode={generateGridCode}
              copyToClipboard={copyToClipboard}
              downloadCode={downloadCode}
              copied={copied}
            />
          </div>
        </div>
      </section>

      <GridCraftFeatures />
    </div>
  );
};

export default GridCraft;
