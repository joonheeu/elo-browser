import { PageBounds } from "~/elo/types";

type QueryParams = { [key: string]: string };

// API //
export interface EloOmniboxAPI {
  /**
   * Shows the omnibox
   */
  show: (bounds: PageBounds | null, params: QueryParams | null) => void;

  /**
   * Hides the omnibox
   */
  hide: () => void;
}
