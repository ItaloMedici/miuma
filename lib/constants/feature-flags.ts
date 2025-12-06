export const FEATURE_FLAGS = {
  // V2 Features - Coming Soon
  ENABLE_RECURRING_SUBSCRIPTIONS: false, // Assinaturas mensais recorrentes
  ENABLE_DONATIONS: false, // Sistema de doações (PIX, cartão)
  ENABLE_TRANSPARENCY_DASHBOARD: false, // Dashboard de transparência financeira
  ENABLE_IMPACT_TRACKING: false, // Rastreamento de impacto e métricas
  ENABLE_COMMUNICATIONS: false, // Sistema de comunicação com apoiadores
  ENABLE_ANALYTICS: false, // Analytics avançado (page views, conversão)
  ENABLE_DONOR_MANAGEMENT: false, // Gerenciamento de apoiadores
  ENABLE_BILLING: false, // Gestão financeira e transações
  ENABLE_CAMPAIGNS: false, // Campanhas específicas de arrecadação
} as const;

export type FeatureFlag = keyof typeof FEATURE_FLAGS;
