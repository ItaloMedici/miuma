"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Clock } from "lucide-react";

interface ComingSoonCardProps {
  title: string;
  description: string;
  icon: string;
  version: string;
}

export function ComingSoonCard({
  title,
  description,
  icon,
  version,
}: ComingSoonCardProps) {
  return (
    <Card className="relative overflow-hidden border-dashed">
      <div className="absolute top-2 right-2">
        <Badge variant="secondary" className="text-xs">
          {version}
        </Badge>
      </div>

      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="bg-muted flex h-10 w-10 items-center justify-center rounded-lg text-2xl">
            {icon}
          </div>
          <div>
            <CardTitle className="text-base">{title}</CardTitle>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <CardDescription className="flex items-start gap-2">
          <Clock className="text-muted-foreground mt-0.5 h-4 w-4 shrink-0" />
          <span>{description}</span>
        </CardDescription>
      </CardContent>
    </Card>
  );
}
