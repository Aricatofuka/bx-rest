import { iBXRestYesNo } from '../../../base/YesNo'

export interface iBXRestParamSocialNetWorkApiContentViewSet {
  viewXMLIdList: {
    xmlId: string
    save: iBXRestYesNo
  }[]
}

export interface iBXRestSocialNetWorkApiContentViewSet {
  SUCCESS: iBXRestYesNo
}