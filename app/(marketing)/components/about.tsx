export const About = () => {
  return (
    <section
      id="sobre-nos"
      className="bg-muted/30 anchor-offset px-6 py-14 md:py-20"
    >
      <div className="container mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl">
          <div className="mb-12 space-y-4 text-center">
            <h2 className="text-4xl font-bold tracking-tight">
              Por que criamos a Miuma.
            </h2>
          </div>

          <div className="text-muted-foreground mb-12 space-y-6 text-lg leading-relaxed">
            <p>
              A Miuma nasceu da vontade de conectar pessoas que dedicam suas
              vidas ao cuidado animal com aquelas que desejam contribuir de
              forma significativa e transparente.
            </p>
            <p>
              Sabemos que milhares de cuidadores independentes enfrentam
              dificuldades diárias para manter seus resgates. Ao mesmo tempo,
              muitas pessoas querem ajudar, mas não encontram maneiras
              confiáveis de fazer sua contribuição chegar diretamente a quem
              precisa.
            </p>
            <p>
              Nossa missão é eliminar essa distância, criando uma plataforma
              onde a transparência e o impacto direto são prioridade. Cada real
              doado vai integralmente para o cuidador, e cada cuidador presta
              contas de forma clara e acessível.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="bg-background border-border rounded-2xl border p-6">
              <h3 className="mb-2 text-xl font-semibold">Nossa visão</h3>
              <p className="text-muted-foreground">
                Um mundo onde todo cuidador tem acesso ao suporte necessário
                para seguir transformando vidas.
              </p>
            </div>
            <div className="bg-background border-border rounded-2xl border p-6">
              <h3 className="mb-2 text-xl font-semibold">Nossos valores</h3>
              <p className="text-muted-foreground">
                Transparência total, impacto direto e respeito ao trabalho de
                cada cuidador.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
