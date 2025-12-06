"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Edit, ExternalLink, Share2 } from "lucide-react";
import Link from "next/link";

interface QuickActionsCardProps {
  profileSlug: string;
}

export function QuickActionsCard({ profileSlug }: QuickActionsCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Ações Rápidas</CardTitle>
        <CardDescription>Gerencie seu perfil e compartilhe</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <Button asChild variant="outline" className="w-full justify-start">
          <Link href={`/${profileSlug}`} target="_blank">
            <ExternalLink className="mr-2 h-4 w-4" />
            Ver Perfil Público
          </Link>
        </Button>

        <Button asChild variant="outline" className="w-full justify-start">
          <Link href="/cuidador/perfil">
            <Edit className="mr-2 h-4 w-4" />
            Editar Perfil
          </Link>
        </Button>

        <Button
          variant="outline"
          className="w-full justify-start"
          onClick={() => {
            const url = `${window.location.origin}/${profileSlug}`;
            navigator.clipboard.writeText(url);
            // TODO: Show toast notification
          }}
        >
          <Share2 className="mr-2 h-4 w-4" />
          Copiar Link
        </Button>
      </CardContent>
    </Card>
  );
}
