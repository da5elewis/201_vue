<script setup lang="ts">
defineProps<{
  icon: string
  headline: string
  summary: string
  link: string
  source: string
  date: string
  added: boolean
}>()

defineEmits<{
  (e: 'add'): void
  (e: 'delete'): void
}>()

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}
</script>

<template>
  <v-card variant="tonal" rounded="lg" class="news-card">
    <div style="padding: 24px;">
      <div style="display: flex; align-items: flex-start; gap: 12px;">
        <div style="flex: 1;">
          <div class="text-subtitle-2 font-weight-bold" style="line-height: 1.4;">
            <v-icon size="18" style="vertical-align: middle; margin-right: 6px;">{{ icon }}</v-icon>
            {{ headline }}
          </div>
        </div>
        <v-btn
          icon
          variant="text"
          size="x-small"
          aria-label="Delete article"
          class="delete-btn"
          @click="$emit('delete')"
        >
          <v-icon size="18">mdi-delete-outline</v-icon>
        </v-btn>
      </div>

      <p class="text-body-2 text-medium-emphasis" style="margin-top: 16px; line-height: 1.6;">{{ summary }}</p>

      <div style="margin-top: 12px;">
        <v-btn
          :href="link"
          target="_blank"
          rel="noopener noreferrer"
          variant="text"
          color="primary"
          size="small"
          class="text-none font-weight-medium"
          style="padding-left: 0;"
          append-icon="mdi-arrow-right"
        >
          Read article
        </v-btn>
      </div>

      <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 16px;">
        <span class="text-caption font-weight-medium" style="color: rgb(var(--v-theme-primary));">{{ source }}</span>
        <span class="text-caption text-medium-emphasis">{{ formatDate(date) }}</span>
      </div>

      <div style="margin-top: 16px;">
        <v-btn
          v-if="!added"
          variant="outlined"
          color="primary"
          block
          size="small"
          class="text-none font-weight-bold"
          @click="$emit('add')"
        >
          + Add to Featured
        </v-btn>
        <div v-else style="text-align: center; padding: 8px;" class="text-caption text-medium-emphasis">
          ✓ Added to Featured Articles
        </div>
      </div>
    </div>
  </v-card>
</template>

<style scoped>
.news-card {
  transition: transform 0.2s ease, box-shadow 0.25s ease;
}

.news-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.delete-btn {
  opacity: 0.5;
  transition: opacity 0.2s ease;
}

.delete-btn:hover {
  opacity: 1;
}
</style>
