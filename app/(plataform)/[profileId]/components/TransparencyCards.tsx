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
      <h2 className="text-2xl font-bold mb-6">
        Transparência e prestação de contas
      </h2>
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="p-6 space-y-4">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <FileText className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold mb-2">Relatórios mensais</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {transparency?.reportMarkdown}
            </p>
          </div>
          <Button variant="outline" className="w-full">
            Ver relatórios anteriores
          </Button>
        </Card>

        <Card className="p-6 space-y-4">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <Receipt className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold mb-2">Comprovantes</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
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
