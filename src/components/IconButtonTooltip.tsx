import React from "react";
import { IconButton, IconButtonProps, Tooltip } from "@chakra-ui/react";
import slugify from "slugify";

type IconButtonTooltipProps = Omit<IconButtonProps, "aria-label"> & {
  label: string;
};

function IconButtonTooltip({ label, ...props }: IconButtonTooltipProps) {
  const aria = slugify(label, { lower: true, trim: true });
  return (
    <Tooltip label={label}>
      <IconButton size="lg" aria-label={aria} {...props} />
    </Tooltip>
  );
}

export default IconButtonTooltip;
