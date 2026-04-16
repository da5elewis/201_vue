import { reactive, toRefs } from 'vue'

export interface FeaturedLink {
  id: number
  icon: string
  title: string
  url: string
}

const state = reactive({
  links: [
    { id: 1, icon: 'mdi-robot', title: 'What Is Agentic AI?', url: 'https://www.nvidia.com/en-us/glossary/agentic-ai/' },
    { id: 2, icon: 'mdi-chart-bar', title: 'The State of AI in 2025', url: 'https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai' },
    { id: 3, icon: 'mdi-lightbulb-on', title: 'Prompt Engineering Guide', url: 'https://www.promptingguide.ai/' },
    { id: 4, icon: 'mdi-crystal-ball', title: 'AI and the Future of Work', url: 'https://www.brookings.edu/articles/how-artificial-intelligence-is-transforming-the-world/' },
    { id: 5, icon: 'mdi-wrench', title: 'Building LLM-Powered Applications', url: 'https://docs.llamaindex.ai/en/stable/' },
  ] as FeaturedLink[],
  nextId: 6,
})

export function useFeaturedLinks() {
  function addLink(icon: string, title: string, url: string) {
    state.links.push({ id: state.nextId++, icon, title, url })
  }

  function removeLink(id: number) {
    const idx = state.links.findIndex((l) => l.id === id)
    if (idx !== -1) state.links.splice(idx, 1)
  }

  function hasLink(title: string): boolean {
    return state.links.some((l) => l.title === title)
  }

  return {
    ...toRefs(state),
    addLink,
    removeLink,
    hasLink,
  }
}
