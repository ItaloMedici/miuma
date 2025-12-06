import { Button } from "@/components/ui/button";
import { SearchX } from "lucide-react";
import Link from "next/link";

export default function ProfileNotFound() {
  return (
    <div className="bg-background flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md space-y-8 text-center">
        <div className="flex justify-center">
          <div className="bg-muted flex h-24 w-24 items-center justify-center rounded-full">
            <SearchX className="text-muted-foreground h-12 w-12" />
          </div>
        </div>

        <div className="space-y-3">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
            Perfil não encontrado
          </h1>
          <p className="text-muted-foreground text-base md:text-lg">
            Não conseguimos encontrar o cuidador que você está procurando. O
            perfil pode ter sido removido ou o link está incorreto.
          </p>
        </div>

        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <Button asChild size="lg">
            <Link href="/">Voltar para home</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/#cuidadores">Ver cuidadores</Link>
          </Button>
        </div>

        <p className="text-muted-foreground text-sm">
          Se você acredita que isso é um erro,{" "}
          <Link href="/contato" className="text-primary hover:underline">
            entre em contato conosco
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
