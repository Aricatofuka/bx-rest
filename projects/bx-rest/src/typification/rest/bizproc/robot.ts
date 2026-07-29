import { iBXRestBizprocRegistrationFields } from './base/registration'

/** Параметры `bizproc.robot.add`. */
export interface iBXRestParamBizprocRobotAdd
  extends iBXRestBizprocRegistrationFields {
  /** Уникальный в рамках приложения символьный код робота. */
  CODE: string
}

/** Параметры `bizproc.robot.update`. */
export interface iBXRestParamBizprocRobotUpdate {
  /** Символьный код зарегистрированного робота. */
  CODE: string
  /** Новые поля робота. */
  FIELDS: iBXRestBizprocRegistrationFields
}

/** Параметры `bizproc.robot.delete`. */
export interface iBXRestParamBizprocRobotDelete {
  /** Символьный код зарегистрированного робота. */
  CODE: string
}
