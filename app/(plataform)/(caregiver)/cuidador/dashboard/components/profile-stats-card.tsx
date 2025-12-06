"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface StatItem {
  label: string;
  value: string;
  variant?: "default" | "secondary" | "outline" | "destructive";
}

interface ProfileStatsCardProps {
  title: string;
  stats: StatItem[];
  description?: string;
}

export function ProfileStatsCard({
  title,
  stats,
  description,
}: ProfileStatsCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="space-y-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="flex items-center justify-between text-sm"
          >
            <span className="text-muted-foreground">{stat.label}</span>
            {stat.variant ? (
              <Badge variant={stat.variant}>{stat.value}</Badge>
            ) : (
              <span className="text-foreground font-medium">{stat.value}</span>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
