"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowRight,
  Calendar,
  CreditCard,
  FileText,
  HelpCircle,
  Lock,
  ShieldCheck,
  User,
} from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { CardBrand } from "@/interfaces/checkout";
import {
  detectCardBrand,
  formatCardNumber,
  formatExpirationDate,
  getCvcLength,
  isValidCardNumber,
} from "@/lib/utils/card";
import { formatCurrency } from "@/lib/utils/currency";
import { formatDocument, isValidDocument } from "@/lib/utils/document";
import { CardBrandIcons } from "./CardBrandIcons";

// Form validation schema
const paymentFormSchema = z.object({
  cardNumber: z
    .string()
    .min(1, "Número do cartão é obrigatório")
    .refine((value: string) => {
      const cleaned = value.replace(/\s/g, "");
      return cleaned.length >= 13 && cleaned.length <= 19;
    }, "Número do cartão inválido")
    .refine(isValidCardNumber, "Número do cartão inválido"),
  expirationDate: z
    .string()
    .min(1, "Data de validade é obrigatória")
    .regex(/^(0[1-9]|1[0-2])\s\/\s\d{2}$/, "Formato inválido (MM / AA)")
    .refine((value: string) => {
      const [month, year] = value.split(" / ");
      const currentYear = new Date().getFullYear() % 100;
      const currentMonth = new Date().getMonth() + 1;
      const cardYear = parseInt(year, 10);
      const cardMonth = parseInt(month, 10);

      if (cardYear < currentYear) return false;
      if (cardYear === currentYear && cardMonth < currentMonth) return false;

      return true;
    }, "Cartão expirado"),
  cvc: z
    .string()
    .min(3, "CVC é obrigatório")
    .regex(/^\d{3,4}$/, "CVC inválido"),
  cardholderName: z
    .string()
    .min(3, "Nome do titular é obrigatório")
    .max(100, "Nome muito longo")
    .regex(/^[a-zA-ZÀ-ÿ\s]+$/, "Nome inválido"),
  document: z
    .string()
    .min(1, "CPF ou CNPJ é obrigatório")
    .refine(isValidDocument, "CPF ou CNPJ inválido"),
  saveCard: z.boolean(),
});

type PaymentFormValues = z.infer<typeof paymentFormSchema>;

interface PaymentFormProps {
  total: number;
}

export function PaymentForm({ total }: PaymentFormProps) {
  const [cardBrand, setCardBrand] = useState<CardBrand>("unknown");

  const form = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentFormSchema),
    defaultValues: {
      cardNumber: "",
      expirationDate: "",
      cvc: "",
      cardholderName: "",
      document: "",
      saveCard: false,
    },
    reValidateMode: "onBlur",
  });

  const onSubmit = (data: PaymentFormValues) => {
    console.log("Payment submitted:", data);
    // Handle payment submission here
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    const brand = detectCardBrand(formatted);
    form.setValue("cardNumber", formatted);
    setCardBrand(brand);
  };

  const handleExpirationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatExpirationDate(e.target.value);
    form.setValue("expirationDate", formatted);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 md:space-y-6"
      >
        {/* Card Number */}
        <FormField
          control={form.control}
          name="cardNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs md:text-sm">
                Número do Cartão
              </FormLabel>
              <FormControl>
                <div className="group relative">
                  <div className="text-muted-foreground group-focus-within:text-primary absolute top-1/2 left-3 -translate-y-1/2 transition-colors md:left-4">
                    <CreditCard className="h-4 w-4" />
                  </div>
                  <Input
                    {...field}
                    placeholder="0000 0000 0000 0000"
                    className="h-11 pr-20 pl-10 text-sm md:h-12 md:pl-11 md:text-base"
                    maxLength={19}
                    onChange={handleCardNumberChange}
                  />
                  {cardBrand !== "unknown" && (
                    <div className="absolute top-1/2 right-3 -translate-y-1/2 md:right-4">
                      <CardBrandIcons brand={cardBrand} />
                    </div>
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Grid for Expiry, CVC */}
        <div className="grid grid-cols-2 gap-3 md:gap-5">
          <FormField
            control={form.control}
            name="expirationDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs md:text-sm">Validade</FormLabel>
                <FormControl>
                  <div className="group relative">
                    <div className="text-muted-foreground group-focus-within:text-primary absolute top-1/2 left-3 -translate-y-1/2 transition-colors md:left-4">
                      <Calendar className="h-4 w-4" />
                    </div>
                    <Input
                      {...field}
                      placeholder="MM / AA"
                      className="h-11 pl-10 text-sm md:h-12 md:pl-11 md:text-base"
                      maxLength={7}
                      onChange={handleExpirationChange}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="cvc"
            render={({ field }) => {
              const cardNumber = form.getValues("cardNumber");
              const cvcLength = getCvcLength(cardNumber);

              return (
                <FormItem>
                  <FormLabel className="flex items-center gap-1 text-xs md:text-sm">
                    CVC
                    <HelpCircle className="text-muted-foreground h-3 w-3 cursor-help" />
                  </FormLabel>
                  <FormControl>
                    <div className="group relative">
                      <div className="text-muted-foreground group-focus-within:text-primary absolute top-1/2 left-3 -translate-y-1/2 transition-colors md:left-4">
                        <Lock className="h-4 w-4" />
                      </div>
                      <Input
                        {...field}
                        placeholder={cardBrand === "amex" ? "1234" : "123"}
                        className="h-11 pl-10 text-sm md:h-12 md:pl-11 md:text-base"
                        maxLength={cvcLength}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, "");
                          field.onChange(value);
                        }}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
        </div>

        {/* Cardholder Name */}
        <FormField
          control={form.control}
          name="cardholderName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs md:text-sm">
                Nome do Titular
              </FormLabel>
              <FormControl>
                <div className="group relative">
                  <div className="text-muted-foreground group-focus-within:text-primary absolute top-1/2 left-3 -translate-y-1/2 transition-colors md:left-4">
                    <User className="h-4 w-4" />
                  </div>
                  <Input
                    {...field}
                    placeholder="Nome completo no cartão"
                    className="h-11 pl-10 text-sm md:h-12 md:pl-11 md:text-base"
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Document (CPF/CNPJ) */}
        <FormField
          control={form.control}
          name="document"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs md:text-sm">CPF ou CNPJ</FormLabel>
              <FormControl>
                <div className="group relative">
                  <div className="text-muted-foreground group-focus-within:text-primary absolute top-1/2 left-3 -translate-y-1/2 transition-colors md:left-4">
                    <FileText className="h-4 w-4" />
                  </div>
                  <Input
                    {...field}
                    placeholder="000.000.000-00"
                    className="h-11 pl-10 text-sm md:h-12 md:pl-11 md:text-base"
                    maxLength={18}
                    onChange={(e) => {
                      const formatted = formatDocument(e.target.value);
                      field.onChange(formatted);
                    }}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Save Card */}
        <FormField
          control={form.control}
          name="saveCard"
          render={({ field }) => (
            <FormItem className="pt-1 md:pt-2">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="save-card"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
                <Label
                  htmlFor="save-card"
                  className="text-muted-foreground cursor-pointer text-[11px] leading-tight select-none md:text-xs"
                >
                  Salvar este cartão para doações futuras
                </Label>
              </div>
            </FormItem>
          )}
        />

        <Button
          type="submit"
          size={"lg"}
          className="shadow-primary/20 group flex w-full transform items-center justify-center gap-2 shadow-lg transition-all active:scale-[0.99]"
        >
          <span>Assinar {formatCurrency(total)}</span>
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>

        <div className="text-muted-foreground mt-3 flex items-center justify-center gap-1.5 md:mt-4 md:gap-2">
          <ShieldCheck className="h-3 w-3" />
          <span className="text-[9px] font-medium tracking-wider uppercase md:text-[10px]">
            Pagamento Seguro e Criptografado
          </span>
        </div>
      </form>
    </Form>
  );
}
