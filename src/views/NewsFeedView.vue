<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import ThemeToggle from '../components/ThemeToggle.vue'
import NewsCard from '../components/NewsCard.vue'
import { useFeaturedLinks } from '../composables/useFeaturedLinks'

const { addLink, hasLink } = useFeaturedLinks()

interface Article {
  id: number
  icon: string
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
    icon: 'mdi-web',
    title: 'The Next Frontier of Customer Engagement: AI-Enabled Customer Service',
    summary: 'AI-enabled customer service is now the quickest and most effective route for institutions to deliver personalized, proactive experiences that drive customer engagement.',
    source: 'McKinsey',
    date: '2023-03-27',
    url: 'https://www.mckinsey.com/capabilities/operations/our-insights/the-next-frontier-of-customer-engagement-ai-enabled-customer-service',
    added: false,
  },
  {
    id: 2,
    icon: 'mdi-robot',
    title: '3 Bold and Actionable Predictions for the Future of GenAI',
    summary: 'By 2028, 33% of enterprise software applications will incorporate agentic AI capabilities, and agentic AI will make at least 15% of day-to-day work decisions autonomously.',
    source: 'Gartner',
    date: '2025-12-05',
    url: 'https://www.gartner.com/en/articles/3-bold-and-actionable-predictions-for-the-future-of-genai',
    added: false,
  },
  {
    id: 3,
    icon: 'mdi-target',
    title: 'The State of AI: How Organizations Are Rewiring to Capture Value',
    summary: 'Organizations seeing the highest AI impact are embedding it across business functions, investing in talent, and fundamentally rewiring how they operate.',
    source: 'McKinsey',
    date: '2025-03-25',
    url: 'https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai',
    added: false,
  },
  {
    id: 4,
    icon: 'mdi-forum',
    title: 'What Is Agentic AI?',
    summary: 'Agentic AI systems can independently make decisions, plan actions, and learn from outcomes, operating with minimal human oversight to complete complex multi-step tasks.',
    source: 'NVIDIA',
    date: '2025-01-15',
    url: 'https://www.nvidia.com/en-us/glossary/agentic-ai/',
    added: false,
  },
  {
    id: 5,
    icon: 'mdi-chart-box',
    title: 'How Artificial Intelligence Is Transforming the World',
    summary: 'AI is changing every walk of life from healthcare to transportation, impacting how customers interact with brands through personalization, chatbots, and predictive analytics.',
    source: 'Brookings Institution',
    date: '2024-04-24',
    url: 'https://www.brookings.edu/articles/how-artificial-intelligence-is-transforming-the-world/',
    added: false,
  },
  {
    id: 6,
    icon: 'mdi-handshake',
    title: 'Customer Experience in the Age of AI',
    summary: 'Companies that deliver personalized AI-driven experiences are seeing revenue gains of 10-15%, with customer satisfaction scores rising substantially across channels.',
    source: 'Harvard Business Review',
    date: '2024-03-07',
    url: 'https://hbr.org/2022/03/customer-experience-in-the-age-of-ai',
    added: false,
  },
  {
    id: 7,
    icon: 'mdi-trending-up',
    title: 'The Economic Potential of Generative AI',
    summary: 'Generative AI could add up to $4.4 trillion annually to the global economy, with customer operations being one of the highest-impact areas for productivity gains.',
    source: 'McKinsey',
    date: '2023-06-14',
    url: 'https://www.mckinsey.com/capabilities/mckinsey-digital/our-insights/the-economic-potential-of-generative-ai-the-next-productivity-frontier',
    added: false,
  },
  {
    id: 8,
    icon: 'mdi-book-open-variant',
    title: 'Prompt Engineering Guide',
    summary: 'A comprehensive resource covering prompt engineering techniques, from zero-shot and few-shot prompting to chain-of-thought reasoning for building better AI-powered applications.',
    source: 'DAIR.AI',
    date: '2024-02-20',
    url: 'https://www.promptingguide.ai/',
    added: false,
  },
])

function addToFeatured(article: Article) {
  if (article.added || hasLink(article.title)) return
  addLink(article.icon, article.title, article.url)
  article.added = true
}

function deleteArticle(id: number) {
  const idx = articles.value.findIndex((a) => a.id === id)
  if (idx !== -1) articles.value.splice(idx, 1)
}

const lastFetched = ref(new Date())

function formatTimestamp(date: Date): string {
  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  })
}

function refreshArticles() {
  articles.value.forEach((a) => (a.added = false))
  lastFetched.value = new Date()
}
</script>

<template>
  <ThemeToggle />
  <v-container class="d-flex justify-center pa-4">
    <div style="width: 100%; max-width: 480px;">

      <!-- Header -->
      <div class="mb-10">
        <h1 class="text-h5 font-weight-bold">News Feed</h1>
        <p class="text-body-2 text-medium-emphasis">AI &amp; Customer Experience</p>
        <div class="d-flex align-center justify-space-between mt-3">
          <span class="text-caption text-medium-emphasis">Updated {{ formatTimestamp(lastFetched) }}</span>
          <v-btn
            size="small"
            color="primary"
            variant="flat"
            class="text-none font-weight-bold"
            style="padding-left: 2px; padding-right: 2px;"
            @click="refreshArticles"
          >
            Refresh articles
          </v-btn>
        </div>
      </div>

      <!-- Articles -->
      <div class="d-flex flex-column ga-4" style="padding-top: 6px;">
        <NewsCard
          v-for="article in articles"
          :key="article.id"
          :icon="article.icon"
          :headline="article.title"
          :summary="article.summary"
          :link="article.url"
          :source="article.source"
          :date="article.date"
          :added="article.added"
          @add="addToFeatured(article)"
          @delete="deleteArticle(article.id)"
        />
      </div>

      <!-- Back Link -->
      <div class="my-6">
        <v-btn
          :to="{ name: 'home' }"
          variant="text"
          color="primary"
          class="text-none font-weight-medium"
          prepend-icon="mdi-arrow-left"
        >
          Back to Home
        </v-btn>
      </div>
    </div>
  </v-container>
</template>

<style scoped>
</style>
