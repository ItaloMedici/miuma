import { Button } from "@/components/ui/button";
import { Heart, UserPlus } from "lucide-react";

export const DualCTA = () => {
  return (
    <section className="py-14 md:py-20 px-6">
      <div className="container mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="p-4 md:p-12 rounded-2xl bg-primary/5 border border-primary/20 space-y-6">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Heart className="w-6 h-6 text-primary" />
            </div>
            <div className="space-y-4">
              <h3 className="text-3xl font-bold">
                Comece a apoiar um cuidador hoje.
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Sua contribuição pode mudar a vida de quem dedica seu tempo e
                recursos aos animais mais vulneráveis.
              </p>
            </div>
            <Button size="lg" className="w-full sm:w-auto">
              Quero ajudar agora
            </Button>
          </div>

          <div className="p-4 md:p-12  rounded-2xl bg-third/5 border border-third/20 space-y-6">
            <div className="w-12 h-12 rounded-xl bg-third/10 flex items-center justify-center">
              <UserPlus className="w-6 h-6 text-third" />
            </div>
            <div className="space-y-4">
              <h3 className="text-3xl font-bold">
                Crie seu perfil e receba apoio recorrente.
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Se você é cuidador, a Miuma é o lugar onde seu trabalho será
                reconhecido e apoiado de forma justa.
              </p>
            </div>
            <Button size="lg" variant="third" className="w-full sm:w-auto">
              Criar perfil de cuidador
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
