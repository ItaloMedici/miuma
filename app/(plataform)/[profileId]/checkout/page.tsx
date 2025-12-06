import { mockCheckoutData } from "@/lib/mock/checkout";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { OrderSummaryContent, PaymentForm, StepsIndicator } from "./components";
import { MobileOrderDrawer } from "./components/MobileOrderDrawer";

interface PageProps {
  params: Promise<{ profileId: string }>;
}

export default async function CheckoutPage({ params }: PageProps) {
  const { profileId } = await params;

  // In the future, fetch the actual order data based on the id
  // For now, use mock data
  const orderSummary = mockCheckoutData;

  const returnUrl = `/${profileId}`;

  return (
    <>
      {/* Main Full Page Wrapper */}
      <div className="relative flex h-screen w-full flex-col overflow-hidden md:flex-row">
        {/* Left Panel: Order Summary (Drawer on Mobile, Sidebar on Desktop) */}
        <div className="bg-muted/30 border-border hidden flex-col justify-between overflow-hidden border-r p-6 md:flex md:w-5/12 lg:w-3/12 lg:p-12">
          <OrderSummaryContent orderSummary={orderSummary} />
        </div>

        {/* Right Panel: Checkout Form */}
        <div className="bg-background relative flex w-full items-start justify-center px-6 py-6 pb-28 sm:px-6 md:w-7/12 md:items-center md:p-8 lg:w-9/12 lg:p-12">
          {/* Decorative blobs - hidden on mobile for performance */}
          <div className="bg-primary/15 pointer-events-none absolute top-0 -right-60 hidden h-96 w-120 translate-x-1/3 -translate-y-1/3 rounded-full blur-3xl md:block" />

          <div className="relative z-10 w-full max-w-md">
            {/* Back Button */}
            <div className="absolute -top-16 left-0 hidden md:-top-24 md:block">
              <Link
                href={returnUrl || "/"}
                className="text-muted-foreground hover:text-foreground group flex items-center gap-1 text-xs transition-colors"
              >
                <ArrowLeft className="h-3 w-3 transition-transform group-hover:-translate-x-1" />
                Voltar às opções de doação
              </Link>
            </div>

            {/* Mobile Header Back */}
            <div className="mb-6 md:hidden">
              <Link
                href={returnUrl || "/"}
                className="text-muted-foreground hover:text-foreground group inline-flex items-center gap-1 text-xs transition-colors"
              >
                <ArrowLeft className="h-3 w-3" />
                Voltar
              </Link>
            </div>

            <StepsIndicator />

            <div className="mb-6 md:mb-8">
              <h2 className="text-foreground text-xl font-medium tracking-tight md:text-2xl">
                Método de Pagamento
              </h2>
              <p className="text-muted-foreground mt-1.5 text-sm md:mt-2 md:text-base">
                Complete sua doação com segurança.
              </p>
            </div>

            <PaymentForm total={orderSummary.total} />
          </div>
        </div>
      </div>

      <MobileOrderDrawer orderSummary={orderSummary} />
    </>
  );
}
