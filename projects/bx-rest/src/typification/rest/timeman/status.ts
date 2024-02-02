type BXRestTimeManStatusDay = 'OPENED' | 'CLOSE' | 'PAUSED' | 'EXPIRED'

export interface iBXRestParamTimeManStatus {
  USER_ID: number
}

export interface iBXRestTimeManStatus extends iBXRestTimeManStatusBase {
  TIME_START: Date | undefined,
  TIME_FINISH: Date | undefined,
  DURATION: number,
  TIME_LEAKS: number,
}

export interface iBXRestTimeManStatusHttp extends iBXRestTimeManStatusBase {
  TIME_START: string | null,
  TIME_FINISH: string | null,
  DURATION: string,
  TIME_LEAKS: string,
}

interface iBXRestTimeManStatusBase {
  STATUS: BXRestTimeManStatusDay,
  ACTIVE: boolean,
  IP_OPEN: string,
  IP_CLOSE: string,
  LAT_OPEN: number,
  LON_OPEN: number,
  LAT_CLOSE: number,
  LON_CLOSE: number,
  TZ_OFFSET: number
}