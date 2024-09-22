"use client";

import React from 'react';
import { Copy, Check, Download } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useTheme } from 'next-themes';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { solarizedlight, solarizedDarkAtom } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface CodeOutputProps {
    generateGridCode: () => string;
    copyToClipboard: () => void;
    downloadCode: () => void;
    copied: boolean;
}

export const CodeOutput: React.FC<CodeOutputProps> = ({
    generateGridCode,
    copyToClipboard,
    downloadCode,
    copied
}) => {
    const { theme } = useTheme();
    const isDarkMode = theme === 'dark';
    const syntaxStyle = isDarkMode ? solarizedDarkAtom : solarizedlight;
    const code = generateGridCode();

    return (
        <div className="mt-6">
            <h2 className="text-2xl font-semibold mb-4">Generated Code</h2>
            <Card className={`p-4 rounded-md overflow-x-auto ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                <SyntaxHighlighter language="css" style={syntaxStyle} showLineNumbers>
                    {code}
                </SyntaxHighlighter>
            </Card>
            <div className="mt-4 flex space-x-4">
                <Button
                    variant="default"
                    className="flex items-center space-x-2 hover:bg-blue-600 hover:text-white transition-all duration-300"
                    onClick={copyToClipboard}
                >
                    {copied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
                    <span>{copied ? 'Copied!' : 'Copy Code'}</span>
                </Button>
                <Button
                    variant="secondary"
                    className="flex items-center space-x-2 hover:bg-gray-700 hover:text-white transition-all duration-300"
                    onClick={downloadCode}
                >
                    <Download className="h-5 w-5" />
                    <span>Download Code</span>
                </Button>
            </div>
        </div>
    );
};
