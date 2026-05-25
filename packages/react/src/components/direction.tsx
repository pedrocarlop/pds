"use client";

import * as React from "react";
import { Direction } from "radix-ui";

export interface DirectionProviderProps
  extends Omit<
    React.ComponentPropsWithoutRef<typeof Direction.DirectionProvider>,
    "dir"
  > {
  dir?: React.ComponentPropsWithoutRef<
    typeof Direction.DirectionProvider
  >["dir"];
  direction?: React.ComponentPropsWithoutRef<
    typeof Direction.DirectionProvider
  >["dir"];
}

export function DirectionProvider({
  dir,
  direction,
  ...props
}: DirectionProviderProps) {
  return (
    <Direction.DirectionProvider
      dir={direction ?? dir ?? "ltr"}
      {...props}
    />
  );
}

export const useDirection: typeof Direction.useDirection =
  Direction.useDirection;
