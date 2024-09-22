import React, { useState } from 'react';
import { Label } from "@/components/ui/label";
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { ColorPicker, IColor } from 'react-color-palette';
import "react-color-palette/css";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

type CodeType = 'css' | 'tailwind' | 'bootstrap';
type Breakpoint = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

interface ResponsiveSettings {
    [key: string]: { columns: number; rows: number };
}

interface GridSettingsProps {
    rows: number;
    setRows: (value: number) => void;
    columns: number;
    setColumns: (value: number) => void;
    gap: number;
    setGap: (value: number) => void;
    codeType: CodeType;
    setCodeType: (value: CodeType) => void;
    cellColor: string;
    setCellColor: (value: string) => void;
    customClass: string;
    setCustomClass: (value: string) => void;
    responsiveSettings: ResponsiveSettings;
    setResponsiveSettings: (value: ResponsiveSettings) => void;
    breakpoints: Breakpoint[];
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
    cellColor,
    setCellColor,
    customClass,
    setCustomClass,
    responsiveSettings,
    setResponsiveSettings,
    breakpoints
}) => {
    const [showColorPicker, setShowColorPicker] = useState(false);

    const hexToIColor = (hex: string): IColor => {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return {
            hex,
            rgb: { r, g, b, a: 1 },
            hsv: { h: 0, s: 0, v: 0, a: 1 },
        };
    };

    const [color, setColor] = useState<IColor>(hexToIColor(cellColor));

    const handleColorChange = (color: IColor) => {
        setColor(color);
        setCellColor(color.hex);
    };

    const handleResponsiveSettingChange = (breakpoint: Breakpoint, property: 'columns' | 'rows', value: number) => {
        setResponsiveSettings({
            ...responsiveSettings,
            [breakpoint]: {
                ...responsiveSettings[breakpoint],
                [property]: value
            }
        });
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
                <Accordion type="single" className="w-full" defaultValue={"responsive-settings"}>
                    <AccordionItem value="responsive-settings">
                        <AccordionTrigger>Responsive Settings</AccordionTrigger>
                        <AccordionContent>
                            {breakpoints.map((breakpoint) => (
                                <div key={breakpoint} className="mb-4">
                                    <h3 className="text-lg font-semibold mb-2">{breakpoint} Breakpoint</h3>
                                    <div className="space-y-2">
                                        <Label>Columns: {responsiveSettings[breakpoint].columns}</Label>
                                        <Slider
                                            value={[responsiveSettings[breakpoint].columns]}
                                            onValueChange={(value) => handleResponsiveSettingChange(breakpoint, 'columns', value[0])}
                                            max={12}
                                            step={1}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Rows: {responsiveSettings[breakpoint].rows}</Label>
                                        <Slider
                                            value={[responsiveSettings[breakpoint].rows]}
                                            onValueChange={(value) => handleResponsiveSettingChange(breakpoint, 'rows', value[0])}
                                            max={12}
                                            step={1}
                                        />
                                    </div>
                                </div>
                            ))}
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
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
                    <Label>Custom Class <span className='text-green-500 text-xs'>{"(Added on Tailwind & Bootstrap)"}</span></Label>
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