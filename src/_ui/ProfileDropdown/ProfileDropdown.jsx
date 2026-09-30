import React from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useAuthContext } from "../../auth";

export default function ProfileDropdown({
  src,
  handleClose,
  handleOpen,
  userDetails,
  email,
}) {
  const [open, setOpen] = React.useState(false);
  const { setCurrentUser, signOut } = useAuthContext();

  const handleOpenChange = (nextOpen) => {
    setOpen(nextOpen);
    if (nextOpen) {
      handleClose?.({ type: "click" });
    } else {
      handleOpen?.({ type: "click" });
    }
  };

  const handleLogout = async () => {
    try {
      await signOut();
      setCurrentUser();
    } catch (error) {
      // show toast
    }
  };

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <div className="user-logo" aria-describedby={open ? "simple-popover" : undefined}>
          <img src={src} className="user-logo-image" alt="User avatar" />
        </div>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-auto p-0">
        <div className="dropdown-wrapper">
          <div>
            <div className="popover-user-logo">
              <img src={src} className="user-logo-image" alt="User avatar" />
              <div className="user-details">
                <p>{userDetails}</p>
                <p>{email}</p>
              </div>
            </div>
          </div>
          <div>
            <Button variant="ghost" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
