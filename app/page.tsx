"use client"
import React, { useState } from 'react';
import { GridPreview } from '@/components/shared/GridPreview';
import { GridSettings } from '@/components/shared/GridSettings';
import { CodeOutput } from '@/components/shared/CodeOutput';

const GridCraft: React.FC = () => {
  const [rows, setRows] = useState(3);
  const [columns, setColumns] = useState(3);
  const [gap, setGap] = useState(10);
  const [copied, setCopied] = useState(false);
  const [codeType, setCodeType] = useState<'css' | 'tailwind' | 'bootstrap'>('css');
  const [responsiveBreakpoint, setResponsiveBreakpoint] = useState<'sm' | 'md' | 'lg' | 'xl'>('md');

  const generateGridCode = () => {
    switch (codeType) {
      case 'css':
        return `
.grid-container {
  display: grid;
  grid-template-columns: repeat(${columns}, 1fr);
  grid-template-rows: repeat(${rows}, 1fr);
  gap: ${gap}px;
}
        `.trim();
      case 'tailwind':
        return `
<div class="grid grid-cols-${columns} grid-rows-${rows} gap-[${gap}px]">
  <!-- Grid items go here -->
</div>
        `.trim();
      case 'bootstrap':
        return `
<div class="container">
  <div class="row row-cols-${columns} g-${Math.round(gap / 4)}">
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
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <GridPreview rows={rows} columns={columns} gap={gap} />
      <div>
        <GridSettings
          rows={rows} setRows={setRows}
          columns={columns} setColumns={setColumns}
          gap={gap} setGap={setGap}
          codeType={codeType} setCodeType={setCodeType}
          responsiveBreakpoint={responsiveBreakpoint} setResponsiveBreakpoint={setResponsiveBreakpoint}
        />
        <CodeOutput
          generateGridCode={generateGridCode}
          copyToClipboard={copyToClipboard}
          downloadCode={downloadCode}
          copied={copied}
        />
      </div>
    </div>
  );
};

export default GridCraft;
