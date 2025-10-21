'use client';
import { Check, ChevronsUpDown } from "lucide-react";
import React, { useMemo, useState } from "react";
import { CircleFlag } from "react-circle-flags";
import { Controller } from "react-hook-form";
import countryList from "react-select-country-list";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

const CountrySelectField = ({
  name,
  label,
  control,
  error,
  required = false
}: CountrySelectProps) => {
  const [open, setOpen] = useState(false);
  const options = useMemo(() => countryList().getData(), []);

  return (
    <div className="space-y-2">
      <Label htmlFor={name} className="form-label">
        {label}
      </Label>

      <Controller
        name={name}
        control={control}
        rules={{ required: required ? `Please select ${label.toLowerCase()}` : false }}
        render={({ field }) => {
          const selectedCountry = options.find((country: CountryOption) => country.value === field.value);
          return (
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="select-trigger w-full justify-between bg-gray-800 border-gray-800 text-white hover:bg-gray-700 hover:text-white"
                >
                  {selectedCountry ? (
                    <div className="flex items-center gap-2">
                      <CircleFlag
                        countryCode={field.value.toLowerCase()}
                        height="20"
                        width="20"
                      />
                      <span>{selectedCountry.label}</span>
                    </div>
                  ) : (
                    <span className="text-gray-400">Select country...</span>
                  )}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>

              <PopoverContent
                align="start"
                sideOffset={4}
                className="p-0 bg-gray-800 border-gray-700 w-[var(--radix-popper-anchor-width)]"
              >
                <Command className="bg-gray-800 w-full">
                  <CommandInput
                    placeholder="Search country..."
                    className="text-white border-gray-700"
                  />
                  <CommandList>
                    <CommandEmpty className="text-gray-400 py-6 text-center text-sm">
                      No country found.
                    </CommandEmpty>
                    <CommandGroup className="max-h-64 overflow-auto"
                      style={{
                        scrollbarWidth: 'thin',
                        scrollbarColor: '#4b5563 #1f2937'
                      }}>
                      {options.map((country: CountryOption) => (
                        <CommandItem
                          key={country.value}
                          value={country.label}
                          onSelect={() => {
                            field.onChange(country.value);
                            setOpen(false);
                          }}
                          className="flex items-center gap-2 cursor-pointer hover:bg-gray-700 text-white aria-selected:bg-gray-700"
                        >
                          <CircleFlag
                            countryCode={country.value.toLowerCase()}
                            height="20"
                            width="20"
                          />
                          <span className="flex-1">{country.label}</span>
                          <Check
                            className={cn(
                              "h-4 w-4",
                              field.value === country.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          );
        }}
      />
      <sup className="text-xs text-gray-50">Help us show market data and news relevant to you.</sup>
      {error && <p className="text-sm text-red-500">{error.message}</p>}
    </div>
  );
};

export default CountrySelectField;