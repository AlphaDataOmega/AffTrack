"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { AuthLayout } from "@/components/auth/auth-layout";

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Add registration logic here
    setTimeout(() => setIsLoading(false), 1000);
  };

  return (
    <AuthLayout
      testimonial={{
        quote: "Being able to self-host and customize the platform to our needs has been a game-changer. The community is incredibly helpful.",
        author: "Michael Chen",
        role: "Full Stack Developer"
      }}
    >
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Create an account</h1>
          <p className="text-sm text-muted-foreground">
            Enter your details to get started
          </p>
        </div>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              placeholder="John Doe"
              type="text"
              autoCapitalize="none"
              autoComplete="name"
              autoCorrect="off"
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              autoCapitalize="none"
              autoComplete="new-password"
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm-password">Confirm Password</Label>
            <Input
              id="confirm-password"
              type="password"
              autoCapitalize="none"
              autoComplete="new-password"
              disabled={isLoading}
            />
          </div>
          <Button className="w-full" disabled={isLoading}>
            {isLoading && (
              <span className="mr-2 h-4 w-4 animate-spin">⏳</span>
            )}
            Sign Up
          </Button>
        </form>
        <div className="text-center text-sm text-muted-foreground">
          <Link 
            href="/login" 
            className="hover:text-primary underline underline-offset-4"
          >
            Already have an account? Sign In
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
}