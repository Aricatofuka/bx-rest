import { BXRestNavvyBiConnectorConnector } from './connector'
import { BXRestNavvyBiConnectorDataset } from './dataset'
import { BXRestNavvyBiConnectorSource } from './source'

export class BXRestNavvyBiConnector {
  /**
   * Коннекторы BIconnector (`biconnector.connector.*`).
   */
  public readonly connector = new BXRestNavvyBiConnectorConnector()
  /**
   * Датасеты BIconnector (`biconnector.dataset.*`).
   */
  public readonly dataset = new BXRestNavvyBiConnectorDataset()
  /**
   * Источники данных BIconnector (`biconnector.source.*`).
   */
  public readonly source = new BXRestNavvyBiConnectorSource()
}

