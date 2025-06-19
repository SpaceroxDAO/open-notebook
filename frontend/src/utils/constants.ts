// App constants
export const APP_NAME = 'Open Notebook';
export const APP_VERSION = '1.0.0';

// API endpoints
export const API_BASE_URL = '/api/v1';

// Local storage keys
export const STORAGE_KEYS = {
  AUTH_TOKENS: 'open_notebook_auth_tokens',
  USER_SETTINGS: 'open_notebook_user_settings',
  ONBOARDING_COMPLETED: 'open_notebook_onboarding_completed',
  CURRENT_NOTEBOOK: 'open_notebook_current_notebook',
  CHAT_HISTORY: 'open_notebook_chat_history',
} as const;

// NotebookLM onboarding steps (from screenshot)
export const ONBOARDING_STEPS = [
  {
    id: 0,
    title: "Let's get started",
    subtitle: "Create your first notebook below",
    description: "Notebooks help you organize your research and turn documents into a personalized AI expert.",
    action: "Create your first notebook"
  },
  {
    id: 1,
    title: "Add sources from anywhere",
    subtitle: "Look for NotebookLM in your share sheet to quickly add PDFs, websites, videos, & more",
    description: "Upload documents, paste URLs, or connect cloud storage to build your knowledge base."
  },
  {
    id: 2,
    title: "Instant insights you can trust",
    subtitle: "Get answers to your questions, with inline citations to your sources",
    description: "Ask questions and get AI responses grounded in your uploaded sources with clear citations."
  },
  {
    id: 3,
    title: "Listen & learn on the go",
    subtitle: "Turn your sources into engaging audio discussions with one click",
    description: "Generate podcast-style conversations from your sources for hands-free learning."
  }
] as const;

// Navigation tabs (from screenshot)
export const NAVIGATION_TABS = [
  { id: 'sources', label: 'Sources', icon: 'FileText' },
  { id: 'chat', label: 'Chat', icon: 'MessageCircle' },
  { id: 'studio', label: 'Studio', icon: 'Mic' }
] as const;

// Source types with icons
export const SOURCE_TYPES = {
  pdf: { label: 'PDF', icon: 'FileText', color: '#dc2626' },
  url: { label: 'Website', icon: 'Globe', color: '#2563eb' },
  youtube: { label: 'YouTube', icon: 'Play', color: '#dc2626' },
  audio: { label: 'Audio', icon: 'Music', color: '#7c3aed' },
  document: { label: 'Document', icon: 'FileText', color: '#059669' },
  text: { label: 'Text', icon: 'Type', color: '#6b7280' }
} as const;

// Animation durations
export const ANIMATION_DURATION = {
  SHORT: 200,
  MEDIUM: 300,
  LONG: 500,
  EXTRA_LONG: 800
} as const;

// Touch interaction constants
export const TOUCH = {
  MIN_TARGET_SIZE: 44, // px
  SWIPE_THRESHOLD: 50, // px
  LONG_PRESS_DURATION: 500, // ms
  DOUBLE_TAP_THRESHOLD: 300 // ms
} as const;

// Waveform visualization constants
export const WAVEFORM = {
  RADIUS: 100,
  BARS: 64,
  MIN_HEIGHT: 2,
  MAX_HEIGHT: 40,
  ANIMATION_SPEED: 0.1
} as const;