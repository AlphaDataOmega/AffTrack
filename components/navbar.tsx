"use client";

import { Zap, LayoutDashboard, LogOut, Menu, Moon, Settings, Sun, Users, Link2, LineChart, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useState } from "react";
import { SettingsModal } from "./settings/settings-modal";

export default function Navbar() {
  const { setTheme } = useTheme();
  const [showSettings, setShowSettings] = useState(false);

  return (
    <>
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-16 items-center px-4 container mx-auto">
          <Link href="/dashboard" className="flex items-center gap-2 mr-6">
            <Zap className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl">AffTrack</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-4 flex-1">
            <Button variant="ghost" asChild>
              <Link href="/dashboard">
                <LayoutDashboard className="h-4 w-4 mr-2" />
                Dashboard
              </Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/assets">
                <Link2 className="h-4 w-4 mr-2" />
                Assets
              </Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/reports">
                <LineChart className="h-4 w-4 mr-2" />
                Reports
              </Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/users">
                <Users className="h-4 w-4 mr-2" />
                Users
              </Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/activity">
                <Activity className="h-4 w-4 mr-2" />
                Activity
              </Link>
            </Button>
          </div>

          <div className="flex items-center space-x-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")}>Light</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>System</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setShowSettings(true)}
            >
              <Settings className="h-5 w-5" />
            </Button>

            <Button variant="ghost" size="icon">
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </nav>

      <SettingsModal 
        open={showSettings} 
        onOpenChange={setShowSettings}
      />
    </>
  );
}