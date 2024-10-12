'use client';

import * as React from 'react';
import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

export function Combobox({
  options,
  placeholder = '',
  className,
  defaultValue = '',
  onChange,
}) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(defaultValue || '');

  const handleSelect = currentValue => {
    const newValue = currentValue === value ? '' : currentValue;
    setValue(newValue);
    setOpen(false);

    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <div className={className}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant='outline'
            role='combobox'
            aria-expanded={open}
            className='w-full justify-between bg-transparent overflow-hidden'
          >
            {value
              ? options.find(option => option.value === value)?.label
              : placeholder}
            <CaretSortIcon className='ml-2 h-4 w-4 shrink-0 opacity-50' />
          </Button>
        </PopoverTrigger>

        <PopoverContent className='w-full p-0'>
          <Command>
            <CommandList>
              <CommandGroup>
                {options.map(option => (
                  <CommandItem
                    key={option.value}
                    value={option.value}
                    onSelect={handleSelect}
                  >
                    {option.label}
                    <CheckIcon
                      className={cn(
                        'ml-auto h-4 w-4',
                        value === option.value ? 'opacity-100' : 'opacity-0'
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
