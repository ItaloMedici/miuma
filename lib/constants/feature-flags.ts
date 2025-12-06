export const FEATURE_FLAGS = {
  ENABLE_RECURRING_SUBSCRIPTIONS: false,
  ENABLE_TRANSPARENCY_DASHBOARD: false,
  ENABLE_IMPACT_TRACKING: false,
} as const;

export type FeatureFlag = keyof typeof FEATURE_FLAGS;
