import { CheckCircle2, ShieldCheck, UserCheck } from "lucide-react";

export const Trust = () => {
  const trustFeatures = [
    {
      icon: UserCheck,
      title: "Conversa direta",
      description:
        "Cada cuidador passa por uma conversa com nossa equipe antes de ter seu perfil aprovado na plataforma.",
    },
    {
      icon: ShieldCheck,
      title: "Conhecimento pessoal",
      description:
        "Conversamos com cada cuidador para conhecer sua história, seu trabalho e seu compromisso com os animais.",
    },
    {
      icon: CheckCircle2,
      title: "Curadoria ativa",
      description:
        "Nossa equipe acompanha os perfis ativos para manter a qualidade e confiança da comunidade.",
    },
  ];

  return (
    <section className="bg-muted/30 px-6 py-14 md:py-20">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-16 space-y-4 text-center">
          <h2 className="text-4xl font-bold tracking-tight">
            Segurança e confiança em cada perfil.
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
            Todos os cuidadores passam por uma seleção manual rigorosa antes de
            estarem ativos no site
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {trustFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="corner-squircle bg-background border-border space-y-4 rounded-4xl border p-4 md:p-8"
              >
                <div className="bg-fifth/10 flex h-12 w-12 items-center justify-center rounded-xl">
                  <Icon className="text-fifth h-6 w-6" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground mx-auto max-w-3xl text-sm leading-relaxed">
            <strong className="text-foreground">
              Compromisso com a segurança:
            </strong>{" "}
            Apenas cuidadores aprovados por nossa equipe têm perfis visíveis na
            plataforma. Esse processo garante que você está apoiando pessoas
            reais comprometidas com o bem-estar animal.
          </p>
        </div>
      </div>
    </section>
  );
};
