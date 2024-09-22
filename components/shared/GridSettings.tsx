import React, { useState } from 'react';
import { Label } from "@/components/ui/label";
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { ColorPicker, IColor } from 'react-color-palette';
import "react-color-palette/css";

type CodeType = 'css' | 'tailwind' | 'bootstrap';
type ResponsiveBreakpoint = 'sm' | 'md' | 'lg' | 'xl';

interface GridSettingsProps {
    rows: number;
    setRows: (value: number) => void;
    columns: number;
    setColumns: (value: number) => void;
    gap: number;
    setGap: (value: number) => void;
    codeType: CodeType;
    setCodeType: (value: CodeType) => void;
    responsiveBreakpoint: ResponsiveBreakpoint;
    setResponsiveBreakpoint: (value: ResponsiveBreakpoint) => void;
    cellColor: string;
    setCellColor: (value: string) => void;
    customClass: string;
    setCustomClass: (value: string) => void;
    isResponsive: boolean;
    setIsResponsive: (value: boolean) => void;
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
    setResponsiveBreakpoint,
    cellColor,
    setCellColor,
    customClass,
    setCustomClass,
    isResponsive,
    setIsResponsive
}) => {
    const [showColorPicker, setShowColorPicker] = useState(false);

    const hexToIColor = (hex: string): IColor => {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return {
            hex,
            rgb: {
                r, g, b,
                a: 1
            },
            hsv: {
                h: 0, s: 0, v: 0,
                a: 1
            },
        };
    };

    const [color, setColor] = useState<IColor>(hexToIColor(cellColor));

    const handleColorChange = (color: IColor) => {
        setColor(color);
        setCellColor(color.hex);
    };

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-semibold mb-4">Grid Settings</h2>
            <div className="space-y-4">
                <div className="space-y-2">
                    <Label>Rows: {rows}</Label>
                    <Slider
                        value={[rows]}
                        onValueChange={(value) => setRows(value[0])}
                        max={12}
                        step={1}
                    />
                </div>
                <div className="space-y-2">
                    <Label>Columns: {columns}</Label>
                    <Slider
                        value={[columns]}
                        onValueChange={(value) => setColumns(value[0])}
                        max={12}
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
                <div className="flex items-center space-x-2">
                    <Switch
                        id="responsive-mode"
                        checked={isResponsive}
                        onCheckedChange={setIsResponsive}
                        className="bg-white dark:bg-gray-700"
                    />
                    <Label htmlFor="responsive-mode">Responsive Mode</Label>
                </div>
                {isResponsive && (
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
                <div className="space-y-2">
                    <Label>Cell Color</Label>
                    <div className="flex items-center space-x-2">
                        <div
                            className="w-10 h-10 rounded cursor-pointer border"
                            style={{ backgroundColor: cellColor }}
                            onClick={() => setShowColorPicker(!showColorPicker)}
                        ></div>
                        <Input
                            value={cellColor}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCellColor(e.target.value)}
                            placeholder="#RRGGBB"
                        />
                    </div>
                    {showColorPicker && (
                        <ColorPicker
                            color={color}
                            onChange={handleColorChange}
                        />
                    )}
                </div>
                <div className="space-y-2">
                    <Label>Custom Class</Label>
                    <Input
                        value={customClass}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCustomClass(e.target.value)}
                        placeholder="Enter custom CSS class"
                    />
                </div>
            </div>
        </div>
    );
};
