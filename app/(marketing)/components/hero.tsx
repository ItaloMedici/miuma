import { buttonVariants } from "@/components/ui/button";
import { signUpLinks } from "@/lib/contants/links";
import Image from "next/image";
import Link from "next/link";

export const Hero = () => {
  return (
    <section className="px-6 pt-32 pb-18 md:pb-20">
      <div className="container mx-auto max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl leading-tight font-bold tracking-tight lg:text-6xl">
                Conectamos quem cuida com quem quer ajudar.
              </h1>
              <p className="text-muted-foreground max-w-xl text-lg leading-relaxed">
                A Miuma permite que cuidadores independentes recebam apoio
                recorrente e transparente, garantindo que animais resgatados
                tenham uma vida digna e com amor.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                href={"#cuidadores"}
                className={buttonVariants({ size: "lg" })}
              >
                Quero ajudar um cuidador
              </Link>
              <Link
                href={signUpLinks.caregiver}
                className={buttonVariants({ size: "lg", variant: "outline" })}
              >
                Sou cuidador — criar meu perfil
              </Link>
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
