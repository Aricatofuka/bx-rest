import { BXRestNavvyCrmSettingsMode } from './settings/mode'

export class BXRestNavvyCrmSettings {
  /**
   * Режим работы CRM (`crm.settings.mode.*`).
   */
  public readonly mode = new BXRestNavvyCrmSettingsMode()
}

