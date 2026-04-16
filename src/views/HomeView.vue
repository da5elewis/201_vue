<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import ThemeToggle from '../components/ThemeToggle.vue'
import { useFeaturedLinks } from '../composables/useFeaturedLinks'

const { links, addLink, removeLink } = useFeaturedLinks()

const newIcon = ref('')
const newTitle = ref('')
const newUrl = ref('')
const showIconPicker = ref(false)

const iconOptions = [
  'mdi-robot', 'mdi-chart-bar', 'mdi-lightbulb-on', 'mdi-crystal-ball', 'mdi-wrench',
  'mdi-link', 'mdi-book-open-variant', 'mdi-brain', 'mdi-rocket-launch', 'mdi-flash',
  'mdi-target', 'mdi-laptop', 'mdi-web', 'mdi-pencil', 'mdi-flask',
  'mdi-trending-up', 'mdi-school', 'mdi-hammer-wrench', 'mdi-creation', 'mdi-fire',
  'mdi-cog', 'mdi-database', 'mdi-cloud', 'mdi-shield-check', 'mdi-chart-line',
  'mdi-account-group', 'mdi-code-tags', 'mdi-message-text', 'mdi-star', 'mdi-eye',
  'mdi-puzzle', 'mdi-earth', 'mdi-cellphone', 'mdi-camera', 'mdi-palette',
  'mdi-heart', 'mdi-lock', 'mdi-magnify', 'mdi-bell', 'mdi-bookmark',
]

function selectIcon(icon: string) {
  newIcon.value = icon
  showIconPicker.value = false
}

function handleAddLink() {
  const title = newTitle.value.trim()
  const url = newUrl.value.trim()
  if (!title || !url) return
  addLink(newIcon.value || 'mdi-link', title, url)
  newIcon.value = ''
  newTitle.value = ''
  newUrl.value = ''
}
</script>

<template>
  <ThemeToggle />
  <v-container class="d-flex justify-center pa-4" style="min-height: 100vh;">
    <v-card flat class="card-wrapper" color="transparent" max-width="480" width="100%">

      <!-- Header -->
      <div class="d-flex align-center ga-4 mb-6">
        <v-avatar size="96" rounded="lg">
          <v-img src="/ai-insights.svg" alt="AI Insights" />
        </v-avatar>
        <div>
          <h1 class="text-h5 font-weight-bold">AI Insights</h1>
          <p class="text-body-2 text-medium-emphasis mt-1" style="line-height: 1.5;">
            Curated articles and insights on artificial intelligence, agentic systems, and the future of work.
          </p>
        </div>
      </div>

      <!-- Section Title -->
      <div class="text-overline text-medium-emphasis mb-3">Featured Articles</div>

      <!-- Link Buttons -->
      <div class="d-flex flex-column ga-3 mb-16">
        <div v-for="link in links" :key="link.id" class="d-flex align-center ga-2">
          <v-btn
            :href="link.url"
            target="_blank"
            rel="noopener noreferrer"
            variant="tonal"
            block
            class="link-btn justify-start text-none"
            height="48"
          >
            <v-icon size="20" class="link-icon">{{ link.icon }}</v-icon>
            <span class="text-body-2 font-weight-medium">{{ link.title }}</span>
          </v-btn>
          <v-btn
            icon
            variant="text"
            size="small"
            @click="removeLink(link.id)"
            aria-label="Delete link"
            class="delete-btn"
          >
            <v-icon size="18">mdi-delete-outline</v-icon>
          </v-btn>
        </div>
      </div>

      <!-- Add Link Form -->
      <div style="padding-top: 24px; padding-bottom: 8px;">
        <v-divider />
      </div>
      <v-form @submit.prevent="handleAddLink" class="d-flex flex-column ga-2">
        <div class="position-relative" style="padding-top: 8px;">
          <v-btn
            variant="text"
            color="primary"
            class="text-none font-weight-medium px-0"
            @click="showIconPicker = !showIconPicker"
          >
            <v-icon size="18" class="mr-1">{{ newIcon || 'mdi-link' }}</v-icon>
            Choose icon
          </v-btn>
          <v-card
            v-if="showIconPicker"
            class="icon-picker-card"
            elevation="8"
            rounded="lg"
          >
            <div class="d-flex flex-wrap pa-2" style="max-width: 280px;">
              <v-btn
                v-for="icon in iconOptions"
                :key="icon"
                variant="text"
                size="small"
                min-width="40"
                height="40"
                @click="selectIcon(icon)"
              >
                <v-icon size="20">{{ icon }}</v-icon>
              </v-btn>
            </div>
          </v-card>
        </div>
        <v-text-field
          v-model="newTitle"
          placeholder="Article title"
          variant="outlined"
          density="comfortable"
          hide-details
        />
        <v-text-field
          v-model="newUrl"
          placeholder="https://..."
          type="url"
          variant="outlined"
          density="comfortable"
          hide-details
        />
        <v-btn type="submit" color="primary" block variant="flat" class="text-none font-weight-bold">
          Add Link
        </v-btn>
      </v-form>

      <!-- Nav Link -->
      <div class="text-center mt-6">
        <v-btn
          :to="{ name: 'news' }"
          variant="text"
          color="primary"
          class="text-none font-weight-medium"
          append-icon="mdi-arrow-right"
        >
          News Feed
        </v-btn>
      </div>
    </v-card>
  </v-container>
</template>

<style scoped>
.card-wrapper {
  padding-top: 1rem;
}

.link-btn {
  padding-left: 8px !important;
  letter-spacing: normal !important;
  transition: transform 0.2s ease, box-shadow 0.25s ease;
}

.link-icon {
  margin-right: 5px;
}

.link-btn:hover {
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

.icon-picker-card {
  position: absolute;
  bottom: calc(100% + 0.5rem);
  left: 0;
  z-index: 10;
}
</style>
