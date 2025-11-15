export const About = () => {
  return (
    <section id="sobre-nos" className="py-20 px-6 bg-muted/30 anchor-offset">
      <div className="container mx-auto max-w-7xl">
        <div className="max-w-3xl mx-auto">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-4xl font-bold tracking-tight">
              Por que criamos a Miuma.
            </h2>
          </div>

          <div className="space-y-6 text-lg text-muted-foreground leading-relaxed mb-12">
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

          <div className="grid sm:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-background border border-border">
              <h3 className="text-xl font-semibold mb-2">Nossa visão</h3>
              <p className="text-muted-foreground">
                Um mundo onde todo cuidador tem acesso ao suporte necessário
                para seguir transformando vidas.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-background border border-border">
              <h3 className="text-xl font-semibold mb-2">Nossos valores</h3>
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
