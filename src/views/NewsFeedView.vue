<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import ThemeToggle from '../components/ThemeToggle.vue'
import { useFeaturedLinks } from '../composables/useFeaturedLinks'

const { addLink, hasLink } = useFeaturedLinks()

interface Article {
  id: number
  emoji: string
  title: string
  summary: string
  source: string
  date: string
  url: string
  added: boolean
}

const articles = ref<Article[]>([
  {
    id: 1,
    emoji: '🌐',
    title: 'The Next Frontier of Customer Engagement: AI-Enabled Customer Service',
    summary: 'AI-enabled customer service is now the quickest and most effective route for institutions to deliver personalized, proactive experiences that drive customer engagement.',
    source: 'McKinsey',
    date: '2023-03-27',
    url: 'https://www.mckinsey.com/capabilities/operations/our-insights/the-next-frontier-of-customer-engagement-ai-enabled-customer-service',
    added: false,
  },
  {
    id: 2,
    emoji: '🤖',
    title: '3 Bold and Actionable Predictions for the Future of GenAI',
    summary: 'By 2028, 33% of enterprise software applications will incorporate agentic AI capabilities, and agentic AI will make at least 15% of day-to-day work decisions autonomously.',
    source: 'Gartner',
    date: '2025-12-05',
    url: 'https://www.gartner.com/en/articles/3-bold-and-actionable-predictions-for-the-future-of-genai',
    added: false,
  },
  {
    id: 3,
    emoji: '🎯',
    title: 'The State of AI: How Organizations Are Rewiring to Capture Value',
    summary: 'Organizations seeing the highest AI impact are embedding it across business functions, investing in talent, and fundamentally rewiring how they operate.',
    source: 'McKinsey',
    date: '2025-03-25',
    url: 'https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai',
    added: false,
  },
  {
    id: 4,
    emoji: '💬',
    title: 'What Is Agentic AI?',
    summary: 'Agentic AI systems can independently make decisions, plan actions, and learn from outcomes, operating with minimal human oversight to complete complex multi-step tasks.',
    source: 'NVIDIA',
    date: '2025-01-15',
    url: 'https://www.nvidia.com/en-us/glossary/agentic-ai/',
    added: false,
  },
  {
    id: 5,
    emoji: '📊',
    title: 'How Artificial Intelligence Is Transforming the World',
    summary: 'AI is changing every walk of life from healthcare to transportation, impacting how customers interact with brands through personalization, chatbots, and predictive analytics.',
    source: 'Brookings Institution',
    date: '2024-04-24',
    url: 'https://www.brookings.edu/articles/how-artificial-intelligence-is-transforming-the-world/',
    added: false,
  },
  {
    id: 6,
    emoji: '🤝',
    title: 'Customer Experience in the Age of AI',
    summary: 'Companies that deliver personalized AI-driven experiences are seeing revenue gains of 10-15%, with customer satisfaction scores rising substantially across channels.',
    source: 'Harvard Business Review',
    date: '2024-03-07',
    url: 'https://hbr.org/2022/03/customer-experience-in-the-age-of-ai',
    added: false,
  },
  {
    id: 7,
    emoji: '📈',
    title: 'The Economic Potential of Generative AI',
    summary: 'Generative AI could add up to $4.4 trillion annually to the global economy, with customer operations being one of the highest-impact areas for productivity gains.',
    source: 'McKinsey',
    date: '2023-06-14',
    url: 'https://www.mckinsey.com/capabilities/mckinsey-digital/our-insights/the-economic-potential-of-generative-ai-the-next-productivity-frontier',
    added: false,
  },
  {
    id: 8,
    emoji: '🎙️',
    title: 'Prompt Engineering Guide',
    summary: 'A comprehensive resource covering prompt engineering techniques, from zero-shot and few-shot prompting to chain-of-thought reasoning for building better AI-powered applications.',
    source: 'DAIR.AI',
    date: '2024-02-20',
    url: 'https://www.promptingguide.ai/',
    added: false,
  },
])

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

function addToFeatured(article: Article) {
  if (article.added || hasLink(article.title)) return
  addLink(article.emoji, article.title, article.url)
  article.added = true
}

function deleteArticle(id: number) {
  const idx = articles.value.findIndex((a) => a.id === id)
  if (idx !== -1) articles.value.splice(idx, 1)
}
</script>

<template>
  <ThemeToggle />
  <div class="feed">
    <div class="feed-header">
      <h1 class="feed-title">News Feed</h1>
      <p class="feed-subtitle">AI &amp; Customer Experience</p>
    </div>

    <div class="articles">
      <article v-for="article in articles" :key="article.id" class="article-card">
        <div class="article-header">
          <h2 class="article-title"><span class="article-emoji">{{ article.emoji }}</span> {{ article.title }}</h2>
          <button class="delete-btn" @click="deleteArticle(article.id)" aria-label="Delete article">
            🗑️
          </button>
        </div>
        <p class="article-summary">{{ article.summary }}</p>
        <a :href="article.url" target="_blank" rel="noopener noreferrer" class="article-link">Read article &rarr;</a>
        <div class="article-meta">
          <span class="article-source">{{ article.source }}</span>
          <span class="article-date">{{ formatDate(article.date) }}</span>
        </div>
        <div class="article-actions">
          <button
            v-if="!article.added"
            class="add-featured-btn"
            @click="addToFeatured(article)"
          >
            + Add to Featured
          </button>
          <span v-else class="added-label">✓ Added to Featured Articles</span>
        </div>
      </article>
    </div>

    <RouterLink to="/" class="nav-link">&larr; Back to Home</RouterLink>
  </div>
</template>

<style scoped>
.feed {
  width: 100%;
  max-width: 480px;
  display: flex;
  flex-direction: column;
  padding-top: 2rem;
}

.feed-header {
  margin-bottom: 2rem;
}

.feed-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.25rem;
}

.feed-subtitle {
  color: var(--text-muted);
  font-size: 0.9rem;
}

.articles {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.article-card {
  background: var(--btn-bg);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 1.25rem;
  transition: transform 0.2s ease, box-shadow 0.25s ease;
}

.article-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.article-header {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
}

.article-title {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  line-height: 1.4;
  flex: 1;
}

.delete-btn {
  background: none;
  border: none;
  font-size: 1.1rem;
  cursor: pointer;
  padding: 0.25rem;
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

.article-summary {
  color: var(--text-muted);
  font-size: 0.85rem;
  line-height: 1.6;
  margin-bottom: 0.5rem;
}

.article-link {
  display: inline-block;
  color: var(--accent);
  font-size: 0.8rem;
  font-weight: 500;
  text-decoration: none;
  margin-bottom: 0.75rem;
  transition: color 0.2s ease;
}

.article-link:hover {
  color: var(--accent-hover);
}

.article-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.8rem;
  margin-bottom: 0.75rem;
}

.article-emoji {
  font-size: 1.1rem;
}

.article-source {
  color: var(--accent);
  font-weight: 500;
}

.article-date {
  color: var(--text-muted);
}

.article-actions {
  margin-top: 0.5rem;
}

.add-featured-btn {
  width: 100%;
  padding: 0.5rem;
  background: transparent;
  border: 1px solid var(--accent);
  border-radius: 8px;
  color: var(--accent);
  font-family: 'Inter', sans-serif;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.25s ease, color 0.25s ease, transform 0.2s ease;
}

.add-featured-btn:hover {
  background: var(--accent);
  color: #fff;
  transform: translateY(-1px);
}

.added-label {
  display: block;
  text-align: center;
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--text-muted);
  padding: 0.5rem;
}

.nav-link {
  margin-top: 2rem;
  margin-bottom: 2rem;
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
