import { IPCListener } from "~/elo/types";

// API //
export interface EloActionsAPI {
  /**
   * Listen for copy link action
   */
  onCopyLink: IPCListener<[]>;

  /**
   * Listen for generic incoming actions
   */
  onIncomingAction: IPCListener<[string]>;
}
