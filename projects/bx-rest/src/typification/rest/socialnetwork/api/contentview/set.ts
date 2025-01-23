import { iBXRestYesNo } from '../../../base/yes-no'

export interface iBXRestParamSocialNetWorkApiContentViewSet {
  viewXMLIdList: {
    xmlId: string
    save: iBXRestYesNo
  }[]
}

export interface iBXRestSocialNetWorkApiContentViewSet {
  SUCCESS: iBXRestYesNo
}