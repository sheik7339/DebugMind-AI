"use client";

export interface HistoryEntry {
  id: string;
  date: string;
  lang: string;
  error: string;
  cause: string;
  explanation: string;
  correctedCode: string;
  severity: "Critical" | "Warning" | "Minor";
}

export const getHistory = (): HistoryEntry[] => {
  if (typeof window === "undefined") return [];
  const saved = localStorage.getItem("debugmind_history");
  return saved ? JSON.parse(saved) : [];
};

export const saveHistory = (entry: Omit<HistoryEntry, "id" | "date">) => {
  const history = getHistory();
  const newEntry: HistoryEntry = {
    ...entry,
    id: Math.random().toString(36).substr(2, 9),
    date: new Date().toLocaleString(),
  };
  localStorage.setItem("debugmind_history", JSON.stringify([newEntry, ...history]));
  return newEntry;
};

export const deleteHistory = (id: string) => {
  const history = getHistory();
  const filtered = history.filter((h) => h.id !== id);
  localStorage.setItem("debugmind_history", JSON.stringify(filtered));
};
