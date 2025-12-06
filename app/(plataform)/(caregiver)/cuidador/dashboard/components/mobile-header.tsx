"use client";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { DashboardSidebar } from "./dashboard-sidebar";

export function MobileHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="border-border bg-background sticky top-0 z-30 flex items-center justify-between border-b px-4 py-2 md:hidden">
      <Link href="/" className="flex items-center gap-2">
        <Image
          src="/logo-horizontal.svg"
          alt="Miuma"
          width={70}
          height={16}
          className="h-4 w-auto"
        />
      </Link>
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <Button variant="ghost" size="icon" className="text-muted-foreground">
            <Menu className="h-5 w-5" />
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader className="sr-only">
            <DrawerTitle>Menu de Navegação</DrawerTitle>
          </DrawerHeader>
          <div className="max-h-[80vh] overflow-y-auto">
            <DashboardSidebar isMobile onNavigate={() => setOpen(false)} />
          </div>
        </DrawerContent>
      </Drawer>
    </header>
  );
}
