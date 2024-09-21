"use client"
import React from 'react';
import { Label } from "@/components/ui/label";
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface GridSettingsProps {
    rows: number;
    setRows: (value: number) => void;
    columns: number;
    setColumns: (value: number) => void;
    gap: number;
    setGap: (value: number) => void;
    codeType: 'css' | 'tailwind' | 'bootstrap';
    setCodeType: (value: 'css' | 'tailwind' | 'bootstrap') => void;
    responsiveBreakpoint: 'sm' | 'md' | 'lg' | 'xl';
    setResponsiveBreakpoint: (value: 'sm' | 'md' | 'lg' | 'xl') => void;
}

export const GridSettings: React.FC<GridSettingsProps> = ({
    rows,
    setRows,
    columns,
    setColumns,
    gap,
    setGap,
    codeType,
    setCodeType,
    responsiveBreakpoint,
    setResponsiveBreakpoint
}) => (
    <div>
        <h2 className="text-xl font-semibold mb-4">Grid Settings</h2>
        <div className="space-y-6">
            <div className="space-y-2">
                <Label>Rows: {rows}</Label>
                <Slider
                    value={[rows]}
                    onValueChange={(value) => setRows(value[0])}
                    max={10}
                    step={1}
                />
            </div>
            <div className="space-y-2">
                <Label>Columns: {columns}</Label>
                <Slider
                    value={[columns]}
                    onValueChange={(value) => setColumns(value[0])}
                    max={10}
                    step={1}
                />
            </div>
            <div className="space-y-2">
                <Label>Gap: {gap}px</Label>
                <Slider
                    value={[gap]}
                    onValueChange={(value) => setGap(value[0])}
                    max={50}
                    step={1}
                />
            </div>
            <div className="space-y-2">
                <Label>Code Type</Label>
                <Select onValueChange={setCodeType} defaultValue={codeType}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select code type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="css">CSS</SelectItem>
                        <SelectItem value="tailwind">Tailwind</SelectItem>
                        <SelectItem value="bootstrap">Bootstrap</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            {codeType === 'tailwind' && (
                <div className="space-y-2">
                    <Label>Responsive Breakpoint</Label>
                    <Select onValueChange={setResponsiveBreakpoint} defaultValue={responsiveBreakpoint}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select breakpoint" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="sm">sm</SelectItem>
                            <SelectItem value="md">md</SelectItem>
                            <SelectItem value="lg">lg</SelectItem>
                            <SelectItem value="xl">xl</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            )}
        </div>
    </div>
);
