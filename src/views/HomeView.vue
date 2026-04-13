<script setup lang="ts">
import { ref } from 'vue'
import ThemeToggle from '../components/ThemeToggle.vue'

interface Link {
  id: number
  emoji: string
  title: string
  url: string
}

const links = ref<Link[]>([
  { id: 1, emoji: '🤖', title: 'What Is Agentic AI?', url: 'https://www.nvidia.com/en-us/glossary/agentic-ai/' },
  { id: 2, emoji: '📊', title: 'The State of AI in 2025', url: 'https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai' },
  { id: 3, emoji: '💡', title: 'Prompt Engineering Guide', url: 'https://www.promptingguide.ai/' },
  { id: 4, emoji: '🔮', title: 'AI and the Future of Work', url: 'https://www.brookings.edu/articles/how-artificial-intelligence-is-transforming-the-world/' },
  { id: 5, emoji: '🛠️', title: 'Building LLM-Powered Applications', url: 'https://docs.llamaindex.ai/en/stable/' },
])

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

let nextId = 6

function addLink() {
  const emoji = newEmoji.value.trim()
  const title = newTitle.value.trim()
  const url = newUrl.value.trim()
  if (!title || !url) return
  links.value.push({ id: nextId++, emoji: emoji || '🔗', title, url })
  newEmoji.value = ''
  newTitle.value = ''
  newUrl.value = ''
}
</script>

<template>
  <ThemeToggle />
  <div class="card">
    <div class="avatar"></div>
    <h1 class="heading">AI Resources</h1>
    <p class="tagline">Curated articles and insights on artificial intelligence, agentic systems, and the future of work.</p>

    <div class="links">
      <a
        v-for="link in links"
        :key="link.id"
        :href="link.url"
        target="_blank"
        rel="noopener noreferrer"
        class="link-btn"
      >
        <span class="link-emoji">{{ link.emoji }}</span>
        <span class="link-title">{{ link.title }}</span>
      </a>
    </div>

    <form class="add-form" @submit.prevent="addLink">
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

.avatar {
  width: 96px;
  height: 96px;
  border-radius: 50%;
  background: var(--btn-bg);
  border: 3px solid var(--border);
  margin-bottom: 1.5rem;
}

.heading {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  text-align: center;
}

.tagline {
  color: var(--text-muted);
  font-size: 0.9rem;
  text-align: center;
  line-height: 1.5;
  margin-bottom: 2rem;
  max-width: 380px;
}

.links {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 2rem;
}

.link-btn {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0.875rem 1.25rem;
  padding-left: 5px;
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

.emoji-input {
  width: 80px;
  text-align: center;
  font-size: 1.25rem;
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
</style>
