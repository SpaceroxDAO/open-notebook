// Core entity types
export interface Notebook {
  id: string;
  name: string;
  description?: string;
  sources: Source[];
  notes: Note[];
  created_at: string;
  updated_at: string;
  archived: boolean;
  tags: string[];
}

export interface Source {
  id: string;
  title: string;
  type: 'pdf' | 'url' | 'youtube' | 'audio' | 'document' | 'text';
  content?: string;
  metadata?: SourceMetadata;
  status: 'processing' | 'ready' | 'error';
  created_at: string;
  size?: number;
  word_count?: number;
}

export interface SourceMetadata {
  filename?: string;
  url?: string;
  youtube_id?: string;
  author?: string;
  publish_date?: string;
  page_count?: number;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  notebook_id: string;
  created_at: string;
  updated_at: string;
  tags: string[];
}

// Chat and AI types
export interface ChatMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  citations?: Citation[];
  timestamp: string;
  processing_time?: number;
  confidence_score?: number;
}

export interface Citation {
  number: number;
  source_id: string;
  source_title: string;
  page_number?: number;
  quote: string;
  relevance_score: number;
  position: {
    start: number;
    end: number;
  };
}

// Audio types
export interface AudioOverview {
  id: string;
  notebook_id: string;
  title: string;
  duration: number;
  url: string;
  waveform_data: number[];
  status: 'generating' | 'ready' | 'error';
  language: string;
  voices: string[];
  created_at: string;
}

// UI types
export interface OnboardingStep {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image?: string;
  action?: string;
}

export interface NavigationTab {
  id: 'sources' | 'chat' | 'studio';
  label: string;
  icon: string;
  badge?: number;
}

// API types
export interface APIResponse<T> {
  data: T;
  message?: string;
  status: 'success' | 'error';
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    has_next: boolean;
    has_prev: boolean;
  };
}

// User and auth types
export interface User {
  id: string;
  email: string;
  name: string;
  tier: 'standard' | 'pro' | 'enterprise';
  avatar_url?: string;
  created_at: string;
}

export interface AuthTokens {
  access_token: string;
  refresh_token: string;
  expires_in: number;
}

// Settings types
export interface UserSettings {
  theme: 'light' | 'dark' | 'system';
  language: string;
  notifications: {
    push: boolean;
    email: boolean;
    collaboration: boolean;
  };
  chat: {
    response_style: 'concise' | 'standard' | 'detailed';
    auto_citations: boolean;
    voice_input: boolean;
  };
}