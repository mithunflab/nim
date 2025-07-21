import React, { useState } from 'react';
import { Button } from './button';
import { Input } from './input';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from './sheet';
import { Search, Star, Heart, Home, User, Settings } from 'lucide-react';

interface IconPickerProps {
  onIconSelect?: (iconName: string) => void;
  defaultIcon?: string;
  searchTerm?: string;
  size?: number;
  className?: string;
}

// Stub implementation with basic Lucide icons
const popularIcons = [
  { name: 'Star', Icon: Star },
  { name: 'Heart', Icon: Heart },
  { name: 'Home', Icon: Home },
  { name: 'User', Icon: User },
  { name: 'Settings', Settings },
  { name: 'Search', Icon: Search },
];

export function IconPicker({ 
  onIconSelect, 
  defaultIcon = 'Star',
  size = 24,
  className = '' 
}: IconPickerProps) {
  const [selectedIcon, setSelectedIcon] = useState(defaultIcon);
  const [isOpen, setIsOpen] = useState(false);

  const handleSelectIcon = (iconName: string) => {
    setSelectedIcon(iconName);
    onIconSelect?.(iconName);
    setIsOpen(false);
  };

  const SelectedIconComponent = popularIcons.find(icon => icon.name === selectedIcon)?.Icon || Star;

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className={className}>
          <SelectedIconComponent size={size} />
        </Button>
      </SheetTrigger>
      
      <SheetContent side="right" className="w-80">
        <SheetHeader>
          <SheetTitle>Select Icon</SheetTitle>
        </SheetHeader>
        
        <div className="space-y-4 py-4">
          <Input 
            placeholder="Search icons..." 
            className="w-full"
          />
          
          <div className="grid grid-cols-4 gap-2">
            {popularIcons.map((icon) => (
              <Button
                key={icon.name}
                variant="ghost"
                size="sm"
                className="h-12 w-12 p-0"
                onClick={() => handleSelectIcon(icon.name)}
              >
                <icon.Icon size={size} />
              </Button>
            ))}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default IconPicker;