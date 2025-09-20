import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  useMemo,
} from "react";

interface LayoutContextValue {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  setSidebarOpen: (v: boolean) => void;
}

const LayoutContext = createContext<LayoutContextValue | undefined>(undefined);

const LOCAL_KEY = "sidebar-open";
const COLLAPSED_WIDTH = 70; // exported for reuse if needed
export const getCollapsedSidebarWidth = () => COLLAPSED_WIDTH;

export const LayoutProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_KEY);
      return saved ? JSON.parse(saved) : true;
    } catch {
      return true;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_KEY, JSON.stringify(sidebarOpen));
    } catch {}
  }, [sidebarOpen]);

  // keyboard shortcut Ctrl+B
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "b") {
        e.preventDefault();
        setSidebarOpen((prev) => !prev);
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  const toggleSidebar = useCallback(() => setSidebarOpen((p) => !p), []);

  // Memoize context value to prevent unnecessary re-renders
  const contextValue = useMemo(
    () => ({
      sidebarOpen,
      toggleSidebar,
      setSidebarOpen,
    }),
    [sidebarOpen, toggleSidebar]
  );

  return (
    <LayoutContext.Provider value={contextValue}>
      {children}
    </LayoutContext.Provider>
  );
};

export const useLayout = () => {
  const ctx = useContext(LayoutContext);
  if (!ctx) throw new Error("useLayout must be used within LayoutProvider");
  return ctx;
};
