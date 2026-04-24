"use client";

import {
  createContext,
  useContext,
  useReducer,
  useCallback,
  ReactNode,
} from "react";

interface SidebarState {
  isCollapsed: boolean;
}

type SidebarAction =
  | { type: "TOGGLE" }
  | { type: "COLLAPSE" }
  | { type: "EXPAND" };

interface SidebarContextValue {
  isCollapsed: boolean;
  toggle: () => void;
  collapse: () => void;
  expand: () => void;
}

const initialState: SidebarState = {
  isCollapsed: false,
};

function sidebarReducer(
  state: SidebarState,
  action: SidebarAction,
): SidebarState {
  switch (action.type) {
    case "TOGGLE":
      return { ...state, isCollapsed: !state.isCollapsed };
    case "COLLAPSE":
      return { ...state, isCollapsed: true };
    case "EXPAND":
      return { ...state, isCollapsed: false };
    default:
      return state;
  }
}

export const SidebarContext = createContext<SidebarContextValue | null>(null);

export function SidebarProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(sidebarReducer, initialState);

  const toggle = useCallback(() => dispatch({ type: "TOGGLE" }), []);
  const collapse = useCallback(() => dispatch({ type: "COLLAPSE" }), []);
  const expand = useCallback(() => dispatch({ type: "EXPAND" }), []);

  return (
    <SidebarContext.Provider
      value={{ isCollapsed: state.isCollapsed, toggle, collapse, expand }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useSidebar(): SidebarContextValue {
  const ctx = useContext(SidebarContext);
  if (!ctx) throw new Error("useSidebar must be used inside <SidebarProvider>");
  return ctx;
}
