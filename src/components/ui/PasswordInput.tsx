"use client";

import type React from "react";

import { useState } from "react";
import { Input } from "@blyp/components/ui/Input";
import { Button } from "@blyp/components/ui/Button";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@blyp/lib/utils";

interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export function PasswordInput({ className, ...props }: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <Input type={showPassword ? "text" : "password"} className={cn("pr-10", className)} {...props} />
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="absolute top-0 right-0 h-full px-3 py-2 hover:bg-transparent"
        onClick={() => setShowPassword(!showPassword)}
        aria-label={showPassword ? "Hide password" : "Show password"}
      >
        {showPassword ? (
          <EyeOff className="text-muted-foreground h-4 w-4" />
        ) : (
          <Eye className="text-muted-foreground h-4 w-4" />
        )}
      </Button>
    </div>
  );
}
