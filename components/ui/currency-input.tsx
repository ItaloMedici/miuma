"use client";

import { DollarSign } from "lucide-react";
import { forwardRef, useEffect, useState } from "react";
import { InputGroup, InputGroupAddon, InputGroupInput } from "./input-group";

interface CurrencyInputProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "value" | "onChange"
> {
  value?: number;
  onChange?: (value: number) => void;
  showIcon?: boolean;
}

const formatCurrency = (num: number): string => {
  const formatted = num.toFixed(2);
  const [integerPart, decimalPart] = formatted.split(".");

  // Adiciona separador de milhares
  const integerWithSeparator = integerPart.replace(
    /\B(?=(\d{3})+(?!\d))/g,
    "."
  );

  return `${integerWithSeparator},${decimalPart}`;
};

export const CurrencyInput = forwardRef<HTMLInputElement, CurrencyInputProps>(
  ({ value = 0, onChange, showIcon = true, ...props }, ref) => {
    const [displayValue, setDisplayValue] = useState(() =>
      formatCurrency(value)
    );

    useEffect(() => {
      setDisplayValue(formatCurrency(value));
    }, [value]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const input = e.target.value;

      const numbersOnly = input.replace(/\D/g, "");

      if (!numbersOnly) {
        setDisplayValue("");
        onChange?.(0);
        return;
      }

      const numericValue = parseInt(numbersOnly, 10) / 100;

      const formatted = formatCurrency(numericValue);
      setDisplayValue(formatted);

      onChange?.(numericValue);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (
        [
          "Backspace",
          "Delete",
          "Tab",
          "Escape",
          "Enter",
          "ArrowLeft",
          "ArrowRight",
          "ArrowUp",
          "ArrowDown",
        ].includes(e.key)
      ) {
        return;
      }

      if (
        (e.ctrlKey || e.metaKey) &&
        ["a", "c", "v", "x"].includes(e.key.toLowerCase())
      ) {
        return;
      }

      // Bloqueia tudo que não seja número
      if (!/^\d$/.test(e.key)) {
        e.preventDefault();
      }
    };

    return (
      <InputGroup>
        {showIcon && (
          <InputGroupAddon>
            <DollarSign className="h-4 w-4" />
          </InputGroupAddon>
        )}
        <InputGroupInput
          ref={ref}
          type="text"
          inputMode="numeric"
          value={displayValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="0,00"
          {...props}
        />
      </InputGroup>
    );
  }
);

CurrencyInput.displayName = "CurrencyInput";
