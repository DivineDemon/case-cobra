import Image from "next/image";
import { LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs";

import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogContent,
  DialogDescription,
} from "./ui/dialog";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";

const LoginModal = ({
  isOpen,
  setOpen,
}: {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <Dialog onOpenChange={setOpen} open={isOpen}>
      <DialogContent className="absolute z-[999999999999]">
        <DialogHeader>
          <div className="relative mx-auto size-24 mb-2">
            <Image
              fill
              alt="snake"
              src="/snake-1.png"
              className="object-contain"
            />
          </div>
          <DialogTitle className="text-3xl text-center font-bold tracking-tight text-gray-900">
            Log in to Continue
          </DialogTitle>
          <DialogDescription className="text-base text-center py-2">
            <span className="font-medium text-zinc-900">
              Your configuration was saved!
            </span>
            &nbsp;Please login or create an account to complete your purchase.
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-6 divide-x divide-gray-200">
          <LoginLink className={cn(buttonVariants({ variant: "outline" }))}>
            Login
          </LoginLink>
          <RegisterLink className={cn(buttonVariants({ variant: "default" }))}>
            Sign up
          </RegisterLink>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
