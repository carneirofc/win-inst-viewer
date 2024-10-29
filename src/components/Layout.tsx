import { ReactNode } from "react";
import { useAtomValue } from "jotai";
import { classesAtom } from "../atoms/settings";

export function Layout({ children }: { children: ReactNode }) {
  const classes = useAtomValue(classesAtom);

  return <div className={classes.layout}>{children}</div>;
}
