import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FileText, Receipt } from "lucide-react";

export function TransparencyCards({
  transparency,
}: {
  transparency?: {
    reportMarkdown?: string;
    foodCosts?: number;
    medicalCosts?: number;
    otherCosts?: number;
  };
}) {
  return (
    <div>
      <h2 className="mb-6 text-2xl font-bold">
        Transparência e prestação de contas
      </h2>
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="space-y-4 p-6">
          <div className="bg-primary/10 flex h-12 w-12 items-center justify-center rounded-xl">
            <FileText className="text-primary h-6 w-6" />
          </div>
          <div>
            <h3 className="mb-2 font-semibold">Relatórios mensais</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {transparency?.reportMarkdown}
            </p>
          </div>
          <Button variant="outline" className="w-full">
            Ver relatórios anteriores
          </Button>
        </Card>

        <Card className="space-y-4 p-6">
          <div className="bg-primary/10 flex h-12 w-12 items-center justify-center rounded-xl">
            <Receipt className="text-primary h-6 w-6" />
          </div>
          <div>
            <h3 className="mb-2 font-semibold">Comprovantes</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Todos os apoiadores recebem comprovantes detalhados das despesas
              realizadas mensalmente.
            </p>
          </div>
          <Button variant="outline" className="w-full">
            Acessar comprovantes
          </Button>
        </Card>
      </div>
    </div>
  );
}

export default TransparencyCards;
