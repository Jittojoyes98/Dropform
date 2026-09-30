import React from "react";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

const AntSwitch = ({
  className,
  checked,
  name,
  onChange,
  onCheckedChange,
  ...props
}) => {
  const handleChange = (value) => {
    if (onCheckedChange) {
      onCheckedChange(value);
    }
    if (onChange) {
      onChange({ target: { checked: value, name } });
    }
  };

  return (
    <Switch
      checked={checked}
      name={name}
      onCheckedChange={handleChange}
      className={cn(
        "h-4 w-7 data-[state=checked]:bg-[rgb(77,114,250)] data-[state=unchecked]:bg-black/25",
        "[&_[data-slot=switch-thumb]]:size-3 [&_[data-slot=switch-thumb]]:bg-white",
        className
      )}
      {...props}
    />
  );
};

export default AntSwitch;
