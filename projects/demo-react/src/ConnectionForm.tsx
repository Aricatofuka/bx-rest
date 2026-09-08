import { AUTH_MODE_META, AUTH_MODE_ORDER, t, type AuthModeId, type Connection } from 'bx-rest-demo-shared'

interface Props {
  connection: Connection
  onChange: (connection: Connection) => void
  onConnect: () => void
  applied: boolean
  isValid: boolean
}

export function ConnectionForm({ connection, onChange, onConnect, applied, isValid }: Props) {
  const meta = AUTH_MODE_META[connection.authMode]
  const modeStrings = t.connection.modes[connection.authMode]

  return (
    <section className="connection-form">
      <div className="connection-form__row">
        <label>
          {t.connection.authModeLabel}
          <select
            value={connection.authMode}
            onChange={e => onChange({ ...connection, authMode: e.target.value as AuthModeId })}
          >
            {AUTH_MODE_ORDER.map(mode => (
              <option key={mode} value={mode}>
                {t.connection.modes[mode].label}
              </option>
            ))}
          </select>
        </label>

        {meta.needsPortalUrl && (
          <label className="connection-form__grow">
            {t.connection.portalUrlLabel}
            <input
              type="text"
              placeholder={t.connection.portalUrlPlaceholder}
              value={connection.portalUrl}
              onChange={e => onChange({ ...connection, portalUrl: e.target.value })}
            />
          </label>
        )}

        {meta.valueKind !== 'none' && (
          <label className="connection-form__grow">
            {meta.valueKind === 'webhookUrl' ? t.connection.webhookLabel : t.connection.tokenLabel}
            <input
              type={meta.valueKind === 'token' ? 'password' : 'text'}
              placeholder={meta.valueKind === 'webhookUrl' ? t.connection.webhookPlaceholder : t.connection.tokenPlaceholder}
              value={connection.value}
              onChange={e => onChange({ ...connection, value: e.target.value })}
            />
          </label>
        )}

        <button type="button" disabled={!isValid} onClick={onConnect}>
          {applied ? t.connection.reconnectButton : t.connection.connectButton}
        </button>
      </div>

      <p className="connection-form__mode-hint">{modeStrings.hint}</p>

      <p className="connection-form__hint">
        {t.connection.privacyHint}
        {applied && <span className="connection-form__status"> {t.connection.appliedStatus}</span>}
      </p>
    </section>
  )
}
