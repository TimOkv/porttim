import { clsx, type ClassValue } from "clsx";
import type { CSSProperties } from "react";
import { twMerge } from "tailwind-merge";
export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));
// Порядковый номер блока в ряду: по нему .reveal сдвигает начало появления.
export const delay = (step: number) => ({ "--d": step }) as CSSProperties;
