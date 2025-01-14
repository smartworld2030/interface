export const TOKEN_PRICE_REQUEST = 'TOKEN_PRICE_REQUEST'
export const TOKEN_PRICE_SUCCESS = 'TOKEN_PRICE_SUCCESS'
export const TOKEN_PRICE_FAILURE = 'TOKEN_PRICE_FAILURE'

export const STT_PRICE_REQUEST = 'STT_PRICE_REQUEST'
export const STT_PRICE_SUCCESS = 'STT_PRICE_SUCCESS'
export const STT_PRICE_FAILURE = 'STT_PRICE_FAILURE'

export const BANK_TOKEN_BALANCE_REQUEST = 'BANK_TOKEN_BALANCE_REQUEST'
export const BANK_TOKEN_BALANCE_SUCCESS = 'BANK_TOKEN_BALANCE_SUCCESS'
export const BANK_TOKEN_BALANCE_FAILURE = 'BANK_TOKEN_BALANCE_FAILURE'

export const BANK_SATOSHI_BALANCE_REQUEST = 'BANK_SATOSHI_BALANCE_REQUEST'
export const BANK_SATOSHI_BALANCE_SUCCESS = 'BANK_SATOSHI_BALANCE_SUCCESS'
export const BANK_SATOSHI_BALANCE_FAILURE = 'BANK_SATOSHI_BALANCE_FAILURE'

export interface DefaultBankState {
  bankLoading: boolean
  address: { [key: number]: string }
  tokens: TokenBalances
  prices: TokenPrices
  dollar: DoloarPrices
  totalSupply: number
  total: string
  satoshi?: TokenBalances
  error?: string
}
export type DoloarPrices = {
  BTC: number
}
export type TokenBalances = {
  STT?: number
  STTS?: number
  BTCB?: number
  BNB?: number
}

export type TokenPrices = {
  STT: number
  STTS: number
  BTCB: number
  BNB: number
}
export type SatoshiPrice = 'sttsToSatoshi' | 'bnbToSatoshi' | 'btcToSatoshi'

export type TokenPriceRequestAction = {
  type: typeof TOKEN_PRICE_REQUEST
}

export type TokenPriceSuccessAction = {
  type: typeof TOKEN_PRICE_SUCCESS
  payload: {
    prices: TokenPrices
    dollar?: DoloarPrices
    tokens?: TokenBalances
    totalSupply: number
  }
}

export interface TokenPriceFailureAction {
  type: typeof TOKEN_PRICE_FAILURE
  error: string
}

export type SttPriceRequestAction = {
  type: typeof STT_PRICE_REQUEST
}

export type SttPriceSuccessAction = {
  type: typeof STT_PRICE_SUCCESS
  payload: number
}

export interface SttPriceFailureAction {
  type: typeof STT_PRICE_FAILURE
  error: string
}

export type BankSatoshiRequestAction = {
  type: typeof BANK_SATOSHI_BALANCE_REQUEST
}

export type BankSatoshiSuccessAction = {
  type: typeof BANK_SATOSHI_BALANCE_SUCCESS
  payload: { satoshi: TokenBalances; total: string }
}
export interface BankSatoshiFailureAction {
  type: typeof BANK_SATOSHI_BALANCE_FAILURE
  error: string
}

export interface BankTokenRequestAction {
  type: typeof BANK_TOKEN_BALANCE_REQUEST
}
export interface BankTokenSuccessAction {
  type: typeof BANK_TOKEN_BALANCE_SUCCESS
  payload: { tokens: TokenBalances }
}
export interface BankTokenFailureAction {
  type: typeof BANK_TOKEN_BALANCE_FAILURE
  error: string
}

export type BankActionTypes =
  | TokenPriceRequestAction
  | TokenPriceSuccessAction
  | TokenPriceFailureAction
  | SttPriceRequestAction
  | SttPriceSuccessAction
  | SttPriceFailureAction
  | BankTokenRequestAction
  | BankTokenSuccessAction
  | BankTokenFailureAction
  | BankSatoshiRequestAction
  | BankSatoshiSuccessAction
  | BankSatoshiFailureAction
