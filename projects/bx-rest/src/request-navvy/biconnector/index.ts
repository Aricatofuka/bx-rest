import { BXRestNavvyBiConnectorConnector } from './connector'
import { BXRestNavvyBiConnectorDataset } from './dataset'
import { BXRestNavvyBiConnectorSource } from './source'

export class BXRestNavvyBiConnector {
  public readonly connector = new BXRestNavvyBiConnectorConnector()
  public readonly dataset = new BXRestNavvyBiConnectorDataset()
  public readonly source = new BXRestNavvyBiConnectorSource()
}

