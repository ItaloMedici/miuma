import { Button, buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export const Hero = () => {
  return (
    <section className="pt-32 pb-20 px-6">
      <div className="container mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
                Conectamos quem cuida com quem quer ajudar.
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
                A Miuma permite que cuidadores independentes recebam apoio
                recorrente e transparente, garantindo que animais resgatados
                tenham uma vida digna e com amor.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href={"#cuidadores"}
                className={buttonVariants({ size: "lg" })}
              >
                Quero ajudar um cuidador
              </Link>
              <Button size="lg" variant="outline" className="text-base">
                Sou cuidador — criar meu perfil
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-4/3">
              <Image
                src="/hero.webp"
                alt="Pessoa cuidando de um cachorro e um gato, simbolizando o cuidado animal"
                layout="fill"
                objectFit="contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
