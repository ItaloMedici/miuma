"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { ReactNode, useState } from "react";

interface DatePickerProps {
  value?: string;
  onChange: (value: string) => void;
  label?: ReactNode;
  placeholder?: string;
  disabled?: boolean;
  minDate?: Date;
  maxDate?: Date;
}

const MIN_DATE = new Date("1900-01-01");
const MAX_DATE = new Date();

export function DatePicker({
  value,
  onChange,
  label,
  placeholder = "DD/MM/AAAA",
  disabled = false,
  minDate = MIN_DATE,
  maxDate = MAX_DATE,
}: DatePickerProps) {
  const [openCalendar, setOpenCalendar] = useState(false);

  const handleDateInputChange = (inputValue: string) => {
    if (!inputValue) {
      onChange("");
      return;
    }

    // Try to parse DD/MM/YYYY format
    const parts = inputValue.split("/");
    if (parts.length === 3) {
      const [day, month, year] = parts;
      const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
      if (!isNaN(date.getTime())) {
        const formattedDate = formatDateToISO(date);
        onChange(formattedDate);
      }
    }
  };

  const handleCalendarSelect = (date: Date | undefined) => {
    setOpenCalendar(false);

    if (!date) {
      onChange("");
      return;
    }
    onChange(formatDateToISO(date));
  };

  const formatDateToISO = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const formatDateDisplay = (dateString: string): string => {
    if (!dateString) return "";
    const [year, month, day] = dateString.split("-").map(Number);
    const date = new Date(year, month - 1, day);
    return format(date, "dd/MM/yyyy", { locale: ptBR });
  };

  const parseStoredDate = (dateString: string): Date | undefined => {
    if (!dateString) return undefined;
    const [year, month, day] = dateString.split("-").map(Number);
    return new Date(year, month - 1, day);
  };

  const isDateDisabled = (date: Date): boolean => {
    return date > maxDate || date < minDate;
  };

  return (
    <FormItem>
      {label && <FormLabel>{label}</FormLabel>}
      <Popover open={openCalendar} onOpenChange={setOpenCalendar}>
        <FormControl>
          <InputGroup>
            <InputGroupInput
              placeholder={placeholder}
              value={formatDateDisplay(value || "")}
              onChange={(e) => handleDateInputChange(e.target.value)}
              disabled={disabled}
            />
            <PopoverTrigger asChild>
              <InputGroupAddon align="inline-end">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7"
                  disabled={disabled}
                >
                  <CalendarIcon className="h-4 w-4" />
                </Button>
              </InputGroupAddon>
            </PopoverTrigger>
          </InputGroup>
        </FormControl>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={parseStoredDate(value || "")}
            onSelect={handleCalendarSelect}
            disabled={isDateDisabled}
            locale={ptBR}
            captionLayout="dropdown"
          />
        </PopoverContent>
      </Popover>
      <FormMessage />
    </FormItem>
  );
}
