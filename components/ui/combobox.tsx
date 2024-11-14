"use client";

import * as React from "react";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export type ComboboxOption = {
  label: string;
  value: string | number;
};

type ComboboxProps = {
  dataList: ComboboxOption[];
  inputName: string;
  inputValue: number | string | undefined;
  valueType: "string" | "number";
  setInputValue: (name: string, value: number | string | undefined) => void;
};

export function Combobox({
  dataList,
  inputName,
  inputValue,
  valueType,
  setInputValue,
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false);

  const handleChange = (value: string | number) => {
    const formattedValue = valueType === "number" ? Number(value) : value;
    setInputValue(inputName, formattedValue);
  };

  const selectedLabel = () => {
    const matchingItem = dataList.find(
      (data) =>
        (valueType === "number" ? Number(data.value) : data.value) ===
        inputValue
    );
    return matchingItem ? matchingItem.label : "Pilih salah satu";
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          disabled={dataList.length === 0}
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between h-10"
        >
          {selectedLabel()}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full lg:w-[450px] p-0">
        <Command>
          <CommandInput placeholder="Cari.." className="h-9" />
          <CommandList>
            <CommandEmpty>Tidak ada</CommandEmpty>
            <CommandGroup>
              {dataList.map((data) => (
                <CommandItem
                  key={data.value}
                  onSelect={() => {
                    handleChange(
                      data.value === String(inputValue) ? "" : data.value
                    );
                    setOpen(false);
                  }}
                  className={cn(
                    (valueType === "number"
                      ? Number(data.value)
                      : data.value) === inputValue
                      ? "bg-green-500 data-[selected=true]:bg-green-500 data-[selected=true]:text-white text-white"
                      : "bg-transparent"
                  )}
                >
                  {data.label}
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4",
                      (valueType === "number"
                        ? Number(data.value)
                        : data.value) === inputValue
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
}
