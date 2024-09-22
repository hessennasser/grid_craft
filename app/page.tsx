"use client";

import React, { useEffect, useState } from 'react';
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
  const [cellColor, setCellColor] = useState<string>('#ffffff');
  const [customClass, setCustomClass] = useState<string>('');
  const [responsiveSettings, setResponsiveSettings] = useState<{ [key: string]: { columns: number, rows: number } }>({
    sm: { columns: 1, rows: rows },
    md: { columns: 2, rows: Math.ceil(rows / 2) },
    lg: { columns: columns, rows: rows },
    xl: { columns: columns, rows: rows },
    '2xl': { columns: columns, rows: rows },
  });

  const breakpoints: Array<'sm' | 'md' | 'lg' | 'xl' | '2xl'> = ['sm', 'md', 'lg', 'xl', '2xl'];

  const generateGridCode = () => {
    switch (codeType) {
      case 'css':
        return `
.grid-container {
  display: grid;
  gap: ${gap}px;
  background-color: ${cellColor};
}

/* Mobile first approach */
.grid-container {
  grid-template-columns: 1fr;
  grid-template-rows: repeat(${rows}, 1fr);
}

@media (min-width: 640px) {
  .grid-container {
    grid-template-columns: repeat(${responsiveSettings.sm.columns}, 1fr);
    grid-template-rows: repeat(${responsiveSettings.sm.rows}, 1fr);
  }
}

@media (min-width: 768px) {
  .grid-container {
    grid-template-columns: repeat(${responsiveSettings.md.columns}, 1fr);
    grid-template-rows: repeat(${responsiveSettings.md.rows}, 1fr);
  }
}

@media (min-width: 1024px) {
  .grid-container {
    grid-template-columns: repeat(${responsiveSettings.lg.columns}, 1fr);
    grid-template-rows: repeat(${responsiveSettings.lg.rows}, 1fr);
  }
}

@media (min-width: 1280px) {
  .grid-container {
    grid-template-columns: repeat(${responsiveSettings.xl.columns}, 1fr);
    grid-template-rows: repeat(${responsiveSettings.xl.rows}, 1fr);
  }
}

@media (min-width: 1536px) {
  .grid-container {
    grid-template-columns: repeat(${responsiveSettings['2xl'].columns}, 1fr);
    grid-template-rows: repeat(${responsiveSettings['2xl'].rows}, 1fr);
  }
}
        `.trim();
      case 'tailwind':
        return `
<div class="grid gap-[${gap}px] bg-[${cellColor}] ${customClass}
  grid-cols-1 grid-rows-${rows}
  sm:grid-cols-${responsiveSettings.sm.columns} sm:grid-rows-${responsiveSettings.sm.rows}
  md:grid-cols-${responsiveSettings.md.columns} md:grid-rows-${responsiveSettings.md.rows}
  lg:grid-cols-${responsiveSettings.lg.columns} lg:grid-rows-${responsiveSettings.lg.rows}
  xl:grid-cols-${responsiveSettings.xl.columns} xl:grid-rows-${responsiveSettings.xl.rows}
  2xl:grid-cols-${responsiveSettings['2xl'].columns} 2xl:grid-rows-${responsiveSettings['2xl'].rows}">
  <!-- Grid items go here -->
</div>
        `.trim();
      case 'bootstrap':
        return `
<div class="container">
  <div class="row row-cols-1 row-cols-sm-${responsiveSettings.sm.columns} row-cols-md-${responsiveSettings.md.columns} row-cols-lg-${responsiveSettings.lg.columns} row-cols-xl-${responsiveSettings.xl.columns} row-cols-xxl-${responsiveSettings['2xl'].columns} g-${Math.round(gap / 4)} ${customClass}">
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

  useEffect(() => {
    const initialValue = document.body.style.zoom;

    // Change zoom level on mount
    document.body.style.zoom = "80%";

    return () => {
      // Restore default value
      document.body.style.zoom = initialValue;
    };
  }, []);


  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20 md:py-32 overflow-hidden">
        {/* Background decorative SVG */}
        <div className="absolute inset-0 z-0">
          <svg
            className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-20 animate-spin-slow"
            width="200%"
            height="200%"
            viewBox="0 0 1024 1024"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="512" cy="512" r="512" fill="url(#gradient)" />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(255,255,255,0.4)" />
                <stop offset="100%" stopColor="rgba(255,255,255,0.1)" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Main content */}
        <div className="container mx-auto relative z-10 text-center px-6">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight animate-fade-in-up">
            Build Powerful <span className="text-yellow-300">Responsive Grids</span>
          </h1>
          <p className="text-lg md:text-2xl font-light mb-8 max-w-4xl mx-auto animate-fade-in-up delay-200">
            Empower your design workflow with <span className="font-semibold">GridCraft</span>. Effortlessly create custom grid layouts and export code for CSS, Tailwind, or Bootstrap, optimized for modern development.
          </p>

          {/* CTA buttons */}
          <div className="space-y-4 md:space-y-0 md:space-x-6 flex flex-col md:flex-row justify-center animate-fade-in-up delay-500">
            <a
              href="#get-started"
              className="inline-block px-10 py-4 bg-white text-blue-800 font-semibold text-lg rounded-full shadow-lg transition-transform transform hover:scale-105 hover:bg-yellow-300"
            >
              Get Started
            </a>
            <a
              href="#learn-more"
              className="inline-block px-10 py-4 bg-blue-700 text-white font-semibold text-lg rounded-full shadow-lg transition-transform transform hover:scale-105 hover:bg-blue-600"
            >
              Learn More
            </a>
          </div>
        </div>

        {/* Floating decorative elements */}
        <div className="absolute top-1/3 right-0 transform translate-x-20">
          <div className="w-32 h-32 bg-yellow-300 rounded-full opacity-30 blur-3xl animate-bounce-slow"></div>
        </div>
        <div className="absolute bottom-0 left-1/4 transform -translate-x-20">
          <div className="w-48 h-48 bg-blue-200 rounded-full opacity-20 blur-3xl animate-bounce-slower"></div>
        </div>
      </section>


      <GridCraftFeatures />

      {/* Grid Generator Section */}
      <section id='get-started' className="container mx-auto py-20 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative">
          <GridPreview rows={rows} columns={columns} gap={gap} cellColor={cellColor} responsiveSettings={responsiveSettings}
          />
          <div>
            <GridSettings
              rows={rows} setRows={setRows}
              columns={columns} setColumns={setColumns}
              gap={gap} setGap={setGap}
              codeType={codeType} setCodeType={setCodeType}
              cellColor={cellColor} setCellColor={setCellColor}
              customClass={customClass} setCustomClass={setCustomClass}
              responsiveSettings={responsiveSettings}
              setResponsiveSettings={setResponsiveSettings}
              breakpoints={breakpoints}
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
    </div>
  );
};

export default GridCraft;
