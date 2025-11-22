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
      <div className="w-full h-screen flex flex-col md:flex-row relative overflow-hidden">
        {/* Left Panel: Order Summary (Drawer on Mobile, Sidebar on Desktop) */}
        <div className="hidden md:flex md:w-5/12 lg:w-3/12 bg-muted/30 p-6 lg:p-12 border-r border-border flex-col justify-between overflow-hidden">
          <OrderSummaryContent orderSummary={orderSummary} />
        </div>

        {/* Right Panel: Checkout Form */}
        <div className="w-full md:w-7/12 lg:w-9/12 bg-background px-6 py-6 pb-28 sm:px-6 md:p-8 lg:p-12 flex items-start md:items-center justify-center relative">
          {/* Decorative blobs - hidden on mobile for performance */}
          <div className="hidden md:block absolute top-0 -right-60 w-120 h-96 bg-primary/15 rounded-full blur-3xl pointer-events-none translate-x-1/3 -translate-y-1/3" />

          <div className="w-full max-w-md relative z-10">
            {/* Back Button */}
            <div className="absolute -top-16 md:-top-24 left-0 hidden md:block">
              <Link
                href={returnUrl || "/"}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 group"
              >
                <ArrowLeft className="w-3 h-3 transition-transform group-hover:-translate-x-1" />
                Voltar às opções de doação
              </Link>
            </div>

            {/* Mobile Header Back */}
            <div className="md:hidden mb-6">
              <Link
                href={returnUrl || "/"}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1 group"
              >
                <ArrowLeft className="w-3 h-3" />
                Voltar
              </Link>
            </div>

            <StepsIndicator />

            <div className="mb-6 md:mb-8">
              <h2 className="text-xl md:text-2xl font-medium tracking-tight text-foreground">
                Método de Pagamento
              </h2>
              <p className="text-sm md:text-base text-muted-foreground mt-1.5 md:mt-2">
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
