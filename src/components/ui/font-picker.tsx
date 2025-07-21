import React, { useState } from 'react';
import { Button } from './button';
import { Popover, PopoverContent, PopoverTrigger } from './popover';
import { ChevronsUpDown, Type } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './select';

interface FontPickerProps {
  value?: string;
  defaultValue?: string;
  onChange?: (font: string) => void;
  className?: string;
}

const popularFonts = [
  'Arial',
  'Helvetica',
  'Times New Roman',
  'Georgia',
  'Verdana',
  'Tahoma',
  'Trebuchet MS',
  'Comic Sans MS',
  'Impact',
  'Lucida Console',
  'Courier New',
  'Palatino',
  'Garamond',
  'Bookman',
  'Avant Garde'
];

export function FontPicker({ 
  value, 
  defaultValue = 'Arial', 
  onChange, 
  className 
}: FontPickerProps) {
  const [selectedFont, setSelectedFont] = useState(value || defaultValue);

  const handleFontChange = (font: string) => {
    setSelectedFont(font);
    onChange?.(font);
  };

  return (
    <Select value={selectedFont} onValueChange={handleFontChange}>
      <SelectTrigger className={className}>
        <div className="flex items-center">
          <Type className="mr-2 h-4 w-4" />
          <SelectValue placeholder="Select font" />
        </div>
      </SelectTrigger>
      <SelectContent>
        {popularFonts.map((font) => (
          <SelectItem key={font} value={font}>
            <span style={{ fontFamily: font }}>{font}</span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default FontPicker;