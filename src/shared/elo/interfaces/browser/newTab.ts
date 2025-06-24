export type NewTabMode = "omnibox" | "tab";

// API //
export interface EloNewTabAPI {
  /**
   * Opens a new tab
   */
  open: () => void;
}
