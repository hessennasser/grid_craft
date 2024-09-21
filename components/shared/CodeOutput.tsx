"use client"
import React from 'react';
import { Copy, Check, Download } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useTheme } from 'next-themes';

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
    const { theme, setTheme } = useTheme();
    const isDarkMode = theme === 'dark';

    return (
        <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2">Generated Code</h2>
            <Card className={`${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'} p-4 rounded-md overflow-x-auto`}>
                <pre>
                    <code>{generateGridCode()}</code>
                </pre>
            </Card>
            <div className="mt-4 flex space-x-4">
                <Button
                    variant="default"
                    className="flex items-center"
                    onClick={copyToClipboard}
                >
                    {copied ? <Check className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
                    {copied ? 'Copied!' : 'Copy Code'}
                </Button>
                <Button
                    variant="secondary"
                    className="flex items-center"
                    onClick={downloadCode}
                >
                    <Download className="mr-2 h-4 w-4" />
                    Download Code
                </Button>
            </div>
        </div>
    );
}