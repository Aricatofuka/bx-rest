<script setup lang="ts">
import { computed } from 'vue'
import { AUTH_MODE_META, AUTH_MODE_ORDER, t, type Connection } from 'bx-rest-demo-shared'

const connection = defineModel<Connection>({ required: true })

defineProps<{
  applied: boolean
  isValid: boolean
}>()

const emit = defineEmits<{ connect: [] }>()

const meta = computed(() => AUTH_MODE_META[connection.value.authMode])
const modeStrings = computed(() => t.connection.modes[connection.value.authMode])
</script>

<template>
  <section class="connection-form">
    <div class="connection-form__row">
      <label>
        {{ t.connection.authModeLabel }}
        <select v-model="connection.authMode">
          <option v-for="mode in AUTH_MODE_ORDER" :key="mode" :value="mode">
            {{ t.connection.modes[mode].label }}
          </option>
        </select>
      </label>

      <label v-if="meta.needsPortalUrl" class="connection-form__grow">
        {{ t.connection.portalUrlLabel }}
        <input v-model="connection.portalUrl" type="text" :placeholder="t.connection.portalUrlPlaceholder" />
      </label>

      <label v-if="meta.valueKind !== 'none'" class="connection-form__grow">
        {{ meta.valueKind === 'webhookUrl' ? t.connection.webhookLabel : t.connection.tokenLabel }}
        <input
          v-model="connection.value"
          :type="meta.valueKind === 'token' ? 'password' : 'text'"
          :placeholder="meta.valueKind === 'webhookUrl' ? t.connection.webhookPlaceholder : t.connection.tokenPlaceholder"
        />
      </label>

      <button type="button" :disabled="!isValid" @click="emit('connect')">
        {{ applied ? t.connection.reconnectButton : t.connection.connectButton }}
      </button>
    </div>

    <p class="connection-form__mode-hint">{{ modeStrings.hint }}</p>

    <p class="connection-form__hint">
      {{ t.connection.privacyHint }}
      <span v-if="applied" class="connection-form__status"> {{ t.connection.appliedStatus }}</span>
    </p>
  </section>
</template>
