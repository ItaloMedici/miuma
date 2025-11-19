import { Button } from "@/components/ui/button";
import { SearchX } from "lucide-react";
import Link from "next/link";

export default function ProfileNotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-8">
        <div className="flex justify-center">
          <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center">
            <SearchX className="w-12 h-12 text-muted-foreground" />
          </div>
        </div>

        <div className="space-y-3">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            Perfil não encontrado
          </h1>
          <p className="text-muted-foreground text-base md:text-lg">
            Não conseguimos encontrar o cuidador que você está procurando. O
            perfil pode ter sido removido ou o link está incorreto.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild size="lg">
            <Link href="/">Voltar para home</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/#cuidadores">Ver cuidadores</Link>
          </Button>
        </div>

        <p className="text-sm text-muted-foreground">
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
