import { Navvy } from '../../../services/navvy'
import { iBXRestGenericParams } from '../../../typification/rest/common'
import { $biconnector, $dataset, $fields, $update } from '../../../consts/part-name-methods'

export class BXRestNavvyBiConnectorDatasetFields {
  private readonly Navvy = new Navvy()

  public readonly update = (param: iBXRestGenericParams) =>
    this.Navvy.simple<boolean, boolean, iBXRestGenericParams>(
      [$biconnector, $dataset, $fields, $update],
      param
    )
}

