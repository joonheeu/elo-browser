// API //
export interface EloOnboardingAPI {
  /**
   * Finishes the onboarding process
   */
  finish: () => void;

  /**
   * Resets the onboarding process
   */
  reset: () => void;
}
