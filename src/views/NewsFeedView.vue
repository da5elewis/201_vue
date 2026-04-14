<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import ThemeToggle from '../components/ThemeToggle.vue'

interface Article {
  id: number
  title: string
  summary: string
  source: string
  date: string
}

const articles = ref<Article[]>([
  {
    id: 1,
    title: 'How AI Is Reshaping the Customer Experience Landscape',
    summary: 'Artificial intelligence is transforming how businesses interact with customers, from personalized recommendations to predictive support that anticipates needs before they arise.',
    source: 'Harvard Business Review',
    date: '2026-04-10',
  },
  {
    id: 2,
    title: 'Agentic AI: The Next Frontier in Customer Service',
    summary: 'Autonomous AI agents are beginning to handle complex customer inquiries end-to-end, reducing wait times and improving satisfaction scores across industries.',
    source: 'McKinsey Digital',
    date: '2026-04-08',
  },
  {
    id: 3,
    title: 'Personalization at Scale: AI-Driven CX Strategies',
    summary: 'Companies leveraging AI for hyper-personalization are seeing 40% higher engagement rates, with machine learning models adapting in real time to customer behavior.',
    source: 'Forrester Research',
    date: '2026-04-05',
  },
  {
    id: 4,
    title: 'The Rise of Conversational AI in Retail',
    summary: 'Natural language processing advances are enabling retailers to deploy virtual assistants that understand context, emotion, and intent with near-human accuracy.',
    source: 'MIT Technology Review',
    date: '2026-04-02',
  },
  {
    id: 5,
    title: 'AI-Powered Sentiment Analysis Is Changing Feedback Loops',
    summary: 'Real-time sentiment analysis tools are helping brands detect customer frustration early, enabling proactive interventions that reduce churn by up to 25%.',
    source: 'Gartner',
    date: '2026-03-28',
  },
  {
    id: 6,
    title: 'Building Trust in AI-Driven Customer Experiences',
    summary: 'As AI becomes more embedded in customer journeys, transparency and explainability are emerging as critical factors for maintaining consumer trust and loyalty.',
    source: 'Deloitte Insights',
    date: '2026-03-25',
  },
  {
    id: 7,
    title: 'Predictive Analytics and the Future of Customer Retention',
    summary: 'Machine learning models that predict customer behavior are enabling proactive retention strategies, with early adopters reporting 30% improvements in lifetime value.',
    source: 'Bain & Company',
    date: '2026-03-20',
  },
  {
    id: 8,
    title: 'Voice AI Is Redefining Contact Center Operations',
    summary: 'Advanced voice recognition and synthesis technologies are automating routine calls while routing complex issues to human agents, creating a seamless hybrid experience.',
    source: 'Accenture',
    date: '2026-03-15',
  },
])

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
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
        <h2 class="article-title">{{ article.title }}</h2>
        <p class="article-summary">{{ article.summary }}</p>
        <div class="article-meta">
          <span class="article-source">{{ article.source }}</span>
          <span class="article-date">{{ formatDate(article.date) }}</span>
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

.article-title {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  line-height: 1.4;
}

.article-summary {
  color: var(--text-muted);
  font-size: 0.85rem;
  line-height: 1.6;
  margin-bottom: 0.75rem;
}

.article-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.8rem;
}

.article-source {
  color: var(--accent);
  font-weight: 500;
}

.article-date {
  color: var(--text-muted);
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
