"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@blyp/components/ui/Avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@blyp/components/ui/DropdownMenu";
import { authClient } from "@blyp/lib/auth-client";
import { Album, History, LogOut, UserCog } from "lucide-react";
import { useRouter } from "next/navigation";
import { type FunctionComponent } from "react";

type AvatarDropdownProps = {
  image: string;
  email: string;
  name: string;
};

export const AvatarDropdown: FunctionComponent<AvatarDropdownProps> = ({ image, email, name }) => {
  const router = useRouter();

  const handleSignout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/auth/login");
        },
      },
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="h-[2.21rem] w-[2.21rem]">
          <AvatarImage src={image} alt="profile" />
          <AvatarFallback className="bg-indigo-500 font-bold text-white">{name.at(0)}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" sideOffset={10} className="w-56">
        <DropdownMenuLabel>
          <p className="text-lg">{name}</p>
          <p className="text-primary/60 truncate">{email}</p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Album />
          Bookmarks
        </DropdownMenuItem>
        <DropdownMenuItem>
          <History />
          Reading history
        </DropdownMenuItem>
        <DropdownMenuItem>
          <UserCog />
          Account settings
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignout}>
          <LogOut />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
