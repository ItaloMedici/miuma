"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Circle } from "lucide-react";
import Link from "next/link";

interface ProfileCompletionCardProps {
  percentage: number;
  items: Array<{ completed: boolean; label: string }>;
}

export function ProfileCompletionCard({
  percentage,
  items,
}: ProfileCompletionCardProps) {
  return (
    <Card className="">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Complete seu perfil</span>
          <span className="text-muted-foreground text-sm font-normal">
            {percentage}%
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <ul className="space-y-2">
          {items.map((item) => (
            <li key={item.label} className="flex items-center gap-2 text-sm">
              {item.completed ? (
                <CheckCircle2 className="h-4 w-4 text-lime-600" />
              ) : (
                <Circle className="text-muted-foreground h-4 w-4" />
              )}
              <span
                className={
                  item.completed ? "text-foreground" : "text-muted-foreground"
                }
              >
                {item.label}
              </span>
            </li>
          ))}
        </ul>

        <Button asChild className="w-full">
          <Link href={`/cuidador/perfil`}>Editar Perfil</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
