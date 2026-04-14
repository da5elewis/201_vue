<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import ThemeToggle from '../components/ThemeToggle.vue'
import { useFeaturedLinks } from '../composables/useFeaturedLinks'

const { links, addLink, removeLink } = useFeaturedLinks()

const newEmoji = ref('')
const newTitle = ref('')
const newUrl = ref('')
const showEmojiPicker = ref(false)

const emojiOptions = [
  '🤖', '📊', '💡', '🔮', '🛠️', '🔗', '📚', '🧠', '🚀', '⚡',
  '🎯', '💻', '🌐', '📝', '🔬', '📈', '🎓', '🏗️', '✨', '🔥',
]

function selectEmoji(emoji: string) {
  newEmoji.value = emoji
  showEmojiPicker.value = false
}

function handleAddLink() {
  const title = newTitle.value.trim()
  const url = newUrl.value.trim()
  if (!title || !url) return
  addLink(newEmoji.value || '🔗', title, url)
  newEmoji.value = ''
  newTitle.value = ''
  newUrl.value = ''
}
</script>

<template>
  <ThemeToggle />
  <div class="card">
    <div class="header">
      <img src="/ai-insights.svg" alt="AI Insights" class="avatar" />
      <div class="header-text">
        <h1 class="heading">AI Insights</h1>
        <p class="tagline">Curated articles and insights on artificial intelligence, agentic systems, and the future of work.</p>
      </div>
    </div>

    <h2 class="section-title">Featured Articles</h2>

    <div class="links">
      <div v-for="link in links" :key="link.id" class="link-row">
        <a
          :href="link.url"
          target="_blank"
          rel="noopener noreferrer"
          class="link-btn"
        >
          <span class="link-emoji">{{ link.emoji }}</span>
          <span class="link-title">{{ link.title }}</span>
        </a>
        <button class="delete-btn" @click="removeLink(link.id)" aria-label="Delete link">
          🗑️
        </button>
      </div>
    </div>

    <form class="add-form" @submit.prevent="handleAddLink">
      <div class="emoji-picker-wrapper">
        <button type="button" class="emoji-toggle" @click="showEmojiPicker = !showEmojiPicker">
          {{ newEmoji || '🔗' }}
        </button>
        <div v-if="showEmojiPicker" class="emoji-picker">
          <button
            v-for="emoji in emojiOptions"
            :key="emoji"
            type="button"
            class="emoji-option"
            @click="selectEmoji(emoji)"
          >
            {{ emoji }}
          </button>
        </div>
      </div>
      <input v-model="newTitle" type="text" placeholder="Article title" class="input" />
      <input v-model="newUrl" type="url" placeholder="https://..." class="input" />
      <button type="submit" class="submit-btn">Add Link</button>
    </form>

    <RouterLink to="/news" class="nav-link">News Feed &rarr;</RouterLink>
  </div>
</template>

<style scoped>
.card {
  width: 100%;
  max-width: 480px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 2rem;
}

.header {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  margin-bottom: 2rem;
  width: 100%;
}

.avatar {
  width: 96px;
  height: 96px;
  border-radius: 12px;
  object-fit: cover;
  border: 2px solid var(--border);
  flex-shrink: 0;
}

.header-text {
  flex: 1;
}

.heading {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.tagline {
  color: var(--text-muted);
  font-size: 0.85rem;
  line-height: 1.5;
}

.section-title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 1rem;
  width: 100%;
}

.links {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 2rem;
}

.link-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.link-btn {
  display: flex;
  align-items: center;
  flex: 1;
  padding: 0.875rem 1.25rem;
  padding-left: 8px;
  background: var(--btn-bg);
  border: 1px solid var(--border);
  border-radius: 12px;
  color: var(--text);
  text-decoration: none;
  text-align: left;
  font-size: 0.95rem;
  font-weight: 500;
  transition: background-color 0.25s ease, transform 0.2s ease, box-shadow 0.25s ease;
}

.link-emoji {
  font-size: 1.25rem;
  margin-right: 0.5rem;
  flex-shrink: 0;
}

.link-title {
  flex: 1;
}

.link-btn:hover {
  background: var(--btn-hover);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.link-btn:active {
  transform: translateY(0);
}

.add-form {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  border-top: 1px solid var(--border);
  padding-top: 1.5rem;
}

.input {
  width: 100%;
  padding: 0.75rem 1rem;
  background: var(--btn-bg);
  border: 1px solid var(--border);
  border-radius: 10px;
  color: var(--text);
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  outline: none;
  transition: border-color 0.2s ease;
}

.input::placeholder {
  color: var(--text-muted);
}

.input:focus {
  border-color: var(--accent);
}

.submit-btn {
  padding: 0.75rem;
  background: var(--accent);
  color: #fff;
  border: none;
  border-radius: 10px;
  font-family: 'Inter', sans-serif;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.25s ease, transform 0.2s ease;
}

.submit-btn:hover {
  background: var(--accent-hover);
  transform: translateY(-1px);
}

.submit-btn:active {
  transform: translateY(0);
}

.delete-btn {
  background: none;
  border: none;
  font-size: 1.1rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 8px;
  transition: background-color 0.2s ease, transform 0.2s ease;
  flex-shrink: 0;
  opacity: 0.5;
}

.delete-btn:hover {
  background: var(--btn-hover);
  opacity: 1;
  transform: scale(1.15);
}

.emoji-picker-wrapper {
  position: relative;
}

.emoji-toggle {
  width: 48px;
  height: 48px;
  font-size: 1.5rem;
  background: var(--btn-bg);
  border: 1px solid var(--border);
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: border-color 0.2s ease;
}

.emoji-toggle:hover {
  border-color: var(--accent);
}

.emoji-picker {
  position: absolute;
  bottom: calc(100% + 0.5rem);
  left: 0;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 4px;
  padding: 0.5rem;
  background: var(--btn-bg);
  border: 1px solid var(--border);
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
  z-index: 10;
}

.emoji-option {
  width: 40px;
  height: 40px;
  font-size: 1.25rem;
  background: none;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.15s ease;
}

.emoji-option:hover {
  background: var(--btn-hover);
}

.nav-link {
  margin-top: 1.5rem;
  color: var(--accent);
  text-decoration: none;
  font-weight: 500;
  font-size: 0.95rem;
  transition: color 0.2s ease;
}

.nav-link:hover {
  color: var(--accent-hover);
}
</style>
