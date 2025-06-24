import type { EloAppAPI } from "~/elo/interfaces/app/app";
import type { EloExtensionsAPI } from "~/elo/interfaces/app/extensions";
import type { EloWindowsAPI } from "~/elo/interfaces/app/windows";

import type { EloBrowserAPI } from "~/elo/interfaces/browser/browser";
import type { EloInterfaceAPI } from "~/elo/interfaces/browser/interface";
import type { EloNavigationAPI } from "~/elo/interfaces/browser/navigation";
import type { EloNewTabAPI } from "~/elo/interfaces/browser/newTab";
import type { EloOmniboxAPI } from "~/elo/interfaces/browser/omnibox";
import type { EloPageAPI } from "~/elo/interfaces/browser/page";
import type { EloTabsAPI } from "~/elo/interfaces/browser/tabs";

import type { EloProfilesAPI } from "~/elo/interfaces/sessions/profiles";
import type { EloSpacesAPI } from "~/elo/interfaces/sessions/spaces";

import type { EloActionsAPI } from "~/elo/interfaces/app/actions";
import type { EloShortcutsAPI } from "~/elo/interfaces/app/shortcuts";
import type { EloUpdatesAPI } from "~/elo/interfaces/app/updates";
import type { EloIconsAPI } from "~/elo/interfaces/settings/icons";
import type { EloOnboardingAPI } from "~/elo/interfaces/settings/onboarding";
import type { EloOpenExternalAPI } from "~/elo/interfaces/settings/openExternal";
import type { EloSettingsAPI } from "~/elo/interfaces/settings/settings";

declare global {
  /**
   * The Flow API instance exposed by the Electron preload script.
   * This is defined in electron/preload.ts and exposed via contextBridge
   */
  const flow: {
    // App APIs
    app: EloAppAPI;
    windows: EloWindowsAPI;
    extensions: EloExtensionsAPI;
    updates: EloUpdatesAPI;
    actions: EloActionsAPI;
    shortcuts: EloShortcutsAPI;

    // Browser APIs
    browser: EloBrowserAPI;
    tabs: EloTabsAPI;
    page: EloPageAPI;
    navigation: EloNavigationAPI;
    interface: EloInterfaceAPI;
    omnibox: EloOmniboxAPI;
    newTab: EloNewTabAPI;

    // Session APIs
    profiles: EloProfilesAPI;
    spaces: EloSpacesAPI;

    // Settings APIs
    settings: EloSettingsAPI;
    icons: EloIconsAPI;
    openExternal: EloOpenExternalAPI;
    onboarding: EloOnboardingAPI;
  };
}
