export const WS_NAMESPACES = {
  CRYPTO_V1: '/crypto-v1',
} as const

export type WsNamespaceKey = keyof typeof WS_NAMESPACES
