For local testing, use these API keys (replace with your actual keys):
- ANTHROPIC_API_KEY: [Your Anthropic API key]
- GOOGLE_API_KEY: [Your Google API key]
- YOUTUBE_API_KEY: [Your YouTube API key]
- TAVILY_API_KEY: [Your Tavily API key]
- GEMINI_API_KEY: [Your Gemini API key]
- OPENAI_API_KEY: [Your OpenAI API key]
- UPSTASH_EMAIL: [Your Upstash email]
- UPSTASH_API_KEY: [Your Upstash API key]

# 🎯 DEVELOPMENT GUIDELINES & WORKING PRINCIPLES

## 🚀 STEP 1: ALWAYS START WITH AGENTIC RESOURCES
**Before beginning any project work:**
1. **Consult the Agentic Coding Guide**: Review [AGENTIC_CODING_GUIDE.md](./AGENTIC_CODING_GUIDE.md) for best practices and methodologies
2. **Leverage Templates**: Check [agentic-templates/](./agentic-templates/) for relevant project templates, starter files, and proven patterns
3. **NotebookLM Clone Priority**: For UI/UX work, reference [specs/notebooklm-clone-spec.md](./specs/notebooklm-clone-spec.md) for pixel-perfect replication requirements

These resources contain proven patterns, best practices, and templates that will accelerate development and ensure consistency across projects.

## 📱 NOTEBOOKLM CLONE DEVELOPMENT PRINCIPLES

### Strategic Vision
> *"By meticulously replicating NotebookLM's proven user experience model, the 'Open Notebook Assistant' immediately inherits a clear value proposition and a degree of user familiarity, significantly reducing development risk."*

### Core Implementation Requirements
- **Pixel-Perfect UI Replication**: Match NotebookLM's exact visual design, interaction patterns, and micro-animations
- **Source-Grounded AI**: All AI responses must include numbered inline citations [1], [2], [3] linking to source documents
- **Chat-First Interface**: Primary interaction through conversational AI with "Ask X sources..." placeholder
- **Multi-Source Support**: PDF, websites, YouTube, Google Docs, audio files, DOCX/PPTX/XLSX
- **Audio Studio**: Waveform visualization with podcast-style AI discussions
- **Collaboration Features**: Notebook sharing with granular permissions (viewer/editor/chat-only)

### UI/UX Fidelity Standards
- **Onboarding Flow**: 4-screen carousel with exact NotebookLM text and progression
- **Color Palette**: Google blue (#4285f4) for primary actions and interactive elements
- **Typography**: Clean, readable fonts consistent with Material Design principles
- **Navigation**: Bottom tab bar with "Sources", "Chat", "Studio" tabs
- **Disclaimers**: "NotebookLM can be inaccurate, so double-check" text in chat interface

## 📖 Code Understanding & Analysis
- **Always read entire files** - Otherwise, you don't know what you don't know, and will end up making mistakes, duplicating code that already exists, or misunderstanding the architecture
- **Understand architecture first** - When starting a new task, first understand the current architecture, identify files to modify, and create a Plan before writing code

## 🚀 Task Planning & Execution
- **Get clarity before starting** - Ask follow-up questions if the task is unclear rather than making incorrect assumptions
- **Break down large tasks** - If a task is very large in scope or too vague, break it into smaller subtasks or ask the user to help break it down
- **Create and approve Plans** - Think through architectural aspects, consider edge cases, identify the best approach. Get Plan approved before writing code
- **No dummy implementations** - Unless explicitly asked otherwise, never do placeholder implementations. Just implement the real thing

## 🔄 Development Workflow
- **Commit early and often** - Break large tasks into logical milestones. Commit after each milestone is completed and confirmed OK
- **Always run linting** - Run linting after making major changes to catch syntax errors, wrong methods, or incorrect usage
- **No large refactors** - Don't carry out large refactors unless explicitly instructed to do so

## 📚 Library & Framework Usage
- **Assistant-UI for AI Chat** - Default to Assistant-UI for any AI chat interface development
- **Capacitor for Mobile** - Use Capacitor for cross-platform mobile app deployment
- **Look up latest syntax** - Your internal knowledge might be outdated. For external libraries, look up latest syntax via Perplexity (preferred) or web search
- **Don't skip libraries** - Never say "x library isn't working so I'll skip it." Usually it's incorrect syntax/patterns. If user asked for specific library, make it work
- **Debug root causes** - If running into repeated issues, figure out the root cause instead of random attempts or giving up

## 💻 Code Quality & Best Practices
- **Organize into separate files** - Follow modularity best practices, appropriate file organization
- **Optimize for readability** - Code is read more often than written. Focus on clear variable naming, function complexity, file sizes, commenting
- **Follow best practices** - Apply general coding best practices for the language/framework being used

## 🎨 UI/UX Excellence (NotebookLM Clone Standards)
- **Mobile-First Design** - Prioritize mobile experience, then enhance for desktop
- **AI Chat Interfaces** - Use Assistant-UI for consistent, production-ready chat experiences with citation support
- **NotebookLM-Inspired UX** - Implement pixel-perfect replication of NotebookLM interaction patterns
- **Citation System** - Numbered inline citations with tap-to-view source snippets
- **Audio Studio** - Animated waveform visualization with blue circular play/pause button
- **Source Management** - Multi-format upload modal with type-specific icons and descriptions
- **Collaboration** - Share button with granular permission controls
- **Follow UI/UX best practices** - Pay attention to micro-interactions matching NotebookLM's polish
- **Create engaging interfaces** - Smooth, delightful experiences that match or exceed Google's standards

## 🧠 Professional Approach
- **Leverage expertise** - You are an experienced polyglot with decades of experience in software architecture, system design, development, UI & UX, copywriting, and more
- **Think systematically** - Approach problems with architectural thinking and systematic analysis

# 🎯 PROJECT STATUS & IMPLEMENTATION PROGRESS

## 📱 MOBILE FRONTEND IMPLEMENTATION STATUS

### ✅ **COMPLETED COMPONENTS (December 2024)**

**Project Structure & Setup**
- ✅ React 18 + TypeScript + Vite project configured
- ✅ Tailwind CSS with exact NotebookLM color scheme (#0f0f23, #4285f4)
- ✅ Capacitor setup for iOS/Android deployment
- ✅ Mobile-first responsive design (375x812 viewport)
- ✅ Production build system with TypeScript compilation

**Core UI Components**
- ✅ **4-Screen Onboarding Flow**: Pixel-perfect replication matching NotebookLM screenshot
  - Screen 1: Welcome with gradient icon and "Create your first notebook"
  - Screen 2: Source upload features (PDF, websites, YouTube, audio)
  - Screen 3: Chat interface with numbered citation preview
  - Screen 4: Audio Studio with circular waveform visualization
- ✅ **Progress Dots Navigation**: Interactive dots with smooth transitions
- ✅ **Bottom Tab Navigation**: Sources/Chat/Studio with active state styling

**Chat Interface**
- ✅ **SimpleChatInterface**: Blue message bubbles matching NotebookLM design
- ✅ **Citation System**: Inline numbered citations [1], [2], [3] with clickable buttons
- ✅ **Voice Input Integration**: Microphone button with recording state
- ✅ **Message Threading**: Proper user/assistant message layout
- ✅ **Typing Indicators**: Animated "Thinking..." state with bouncing dots

**Audio Studio**
- ✅ **CircularWaveform Component**: Animated SVG waveform with 60 bars
- ✅ **Play/Pause Controls**: Central blue circular button
- ✅ **Waveform Animation**: Real-time amplitude visualization
- ✅ **Audio State Management**: Playing/paused/loading states

**Source Management**
- ✅ **Multi-Format Upload Modal**: 6 upload types (PDF, Web, YouTube, Audio, Text, Camera)
- ✅ **Source Cards**: Type-specific icons, status indicators, metadata display
- ✅ **Upload Progress**: Processing animations and status tracking
- ✅ **Source Filtering**: Search and filter by type functionality

**Mobile Optimization**
- ✅ **Capacitor Integration**: iOS/Android native deployment ready
- ✅ **Touch Interactions**: Mobile-optimized button sizes and gestures
- ✅ **Safe Area Handling**: iOS notch and bottom bar compatibility
- ✅ **Performance**: Optimized animations and lazy loading

### 🧪 **TESTING STATUS**

**Playwright MCP Testing (Completed)**
- ✅ Application loading and initial state verification
- ✅ Complete onboarding flow testing (all 4 screens)
- ✅ User interaction testing (clicks, navigation, transitions)
- ✅ Visual design verification (colors, typography, layouts)
- ✅ Mobile viewport testing (375x812 responsive design)
- ✅ Screenshot capture for visual regression testing

**Identified Issues**
- ⚠️ **React Router Configuration**: Missing routes for `/chat`, `/sources`, `/studio`
- ⚠️ **Navigation After Onboarding**: Users encounter blank page after completion
- ⚠️ **Route Resolution**: Need to implement proper route definitions

### 📦 **DEPLOYMENT READY**

**Build & Deployment**
- ✅ Production build system configured (`npm run build`)
- ✅ Mobile deployment scripts (`npm run ios`, `npm run android`)
- ✅ Capacitor sync process (`npm run build:mobile`)
- ✅ iOS Xcode project generated (`npx cap open ios`)
- ✅ Android Studio project generated (`npx cap open android`)

**Development Server**
- ✅ Vite dev server running on `http://localhost:3001`
- ✅ Hot reload and React Fast Refresh working
- ✅ TypeScript compilation and error checking
- ✅ ESLint and code quality tools configured

### 🎯 **CURRENT STATUS (December 2024) - MAJOR ROUTING FIX COMPLETED** ✅

**✅ COMPLETED WORK:**
- ✅ **CRITICAL ROUTING FIX**: MainApp routing now works correctly (absolute → relative paths)
- ✅ **Complete Onboarding Flow**: All 4 screens working perfectly
- ✅ **Main App Navigation**: Chat/Sources/Studio tabs fully functional
- ✅ **End-to-End Testing**: Playwright MCP comprehensive testing completed
- ✅ **Production Build**: TypeScript compilation and Vite build successful
- ✅ **Mobile Deployment**: iOS/Android Capacitor projects ready

**📱 FRONTEND STATUS: 95% COMPLETE - UI ONLY**
- All visual components and navigation working
- Mock data for sources and chat
- NO backend integration yet
- NO real AI functionality yet

### 🚧 **MASSIVE REMAINING WORK - BACKEND & INTEGRATION**

⚠️ **CRITICAL UNDERSTANDING**: We have a beautiful, fully functional UI that is essentially a mockup. The app looks and feels complete but has NO real functionality beyond navigation and UI interactions. ALL the core AI features, data persistence, and backend integration remain to be implemented.

### 🎯 **PHASE 1: BACKEND API EXTRACTION (HIGH PRIORITY)**

**Problem**: Current Streamlit app has all the AI logic but no REST API
**Goal**: Extract/create FastAPI backend from existing Streamlit codebase
**Estimated Time**: 2-3 weeks

**Required Work:**
1. **FastAPI Server Setup**
   - Create new FastAPI application structure
   - Set up CORS for frontend integration
   - Configure environment variables and secrets
   - Database connection setup (SurrealDB)

2. **API Endpoint Development**
   ```
   POST /api/notebooks - Create notebook
   GET /api/notebooks - List notebooks  
   GET /api/notebooks/{id} - Get notebook
   PUT /api/notebooks/{id} - Update notebook
   DELETE /api/notebooks/{id} - Delete notebook
   
   POST /api/notebooks/{id}/sources - Upload source
   GET /api/notebooks/{id}/sources - List sources
   DELETE /api/sources/{id} - Remove source
   
   POST /api/chat - Send chat message (streaming)
   GET /api/chat/{notebook_id}/history - Chat history
   
   POST /api/audio/generate - Generate audio discussion
   GET /api/audio/{id}/status - Audio generation status
   
   POST /api/search - Search across notebooks
   ```

3. **LangGraph Workflow Integration**
   - Extract existing insight_writer, note_writer, embedding_writer workflows
   - Adapt for REST API calls instead of Streamlit
   - Implement streaming responses for chat
   - Citation parsing and source linking

4. **File Upload & Processing**
   - PDF processing pipeline
   - YouTube transcript extraction  
   - Website scraping and content extraction
   - Audio file transcription
   - Document parsing (DOCX, PPTX, etc.)

### 🎯 **PHASE 2: FRONTEND-BACKEND INTEGRATION (HIGH PRIORITY)**

**Estimated Time**: 1-2 weeks

1. **API Client Setup**
   - Create API service layer in frontend
   - Implement authentication/session management
   - Error handling and retry logic
   - Loading states and progress indicators

2. **Real Data Integration**
   - Replace all mock data with API calls
   - Implement source upload functionality
   - Real-time chat with streaming responses
   - Citation linking to actual source content

3. **State Management**
   - Global state for notebooks, sources, chat history
   - Optimistic updates for better UX
   - Offline support and sync
   - Real-time updates via WebSocket/SSE

### 🎯 **PHASE 3: ADVANCED AI FEATURES (MEDIUM PRIORITY)**

**Estimated Time**: 2-3 weeks

1. **Advanced Chat Features**
   - Multi-turn conversations with context
   - Source-grounded responses with accurate citations
   - Follow-up question suggestions
   - Chat history search and filtering

2. **Audio Studio Implementation**
   - Real audio generation from sources
   - Multiple voice options and styles
   - Audio playback controls and progress
   - Download and sharing functionality

3. **Smart Source Management**
   - Automatic content extraction and indexing
   - Duplicate detection and merging
   - Content summarization and tagging
   - Search within sources

### 🎯 **PHASE 4: PRODUCTION FEATURES (MEDIUM PRIORITY)**

**Estimated Time**: 2-3 weeks

1. **User Management & Authentication**
   - User registration and login
   - Session management
   - Profile and preferences
   - Multi-device sync

2. **Collaboration Features**
   - Notebook sharing (view/edit/comment permissions)
   - Real-time collaborative editing
   - Comments and annotations
   - Activity feeds and notifications

3. **Advanced Analytics**
   - Usage tracking and insights
   - Content analytics and trends
   - Performance metrics
   - User behavior analysis

### 🎯 **PHASE 5: MOBILE & PERFORMANCE OPTIMIZATION (LOW PRIORITY)**

**Estimated Time**: 1-2 weeks

1. **Mobile App Polish**
   - Native mobile features (camera, file access)
   - Push notifications
   - Offline functionality
   - Performance optimization

2. **Deployment & DevOps**
   - Production deployment pipeline
   - Monitoring and logging
   - Error tracking and analytics
   - Automated testing and CI/CD

### 📊 **REALISTIC TIMELINE ESTIMATE**

**TOTAL ESTIMATED TIME: 8-11 WEEKS OF FULL-TIME DEVELOPMENT**

- Phase 1 (Backend): 2-3 weeks
- Phase 2 (Integration): 1-2 weeks  
- Phase 3 (AI Features): 2-3 weeks
- Phase 4 (Production): 2-3 weeks
- Phase 5 (Mobile/Polish): 1-2 weeks

**CURRENT COMPLETION: ~15% (UI only)**
**REMAINING WORK: ~85% (All backend, AI, and integration work)**

### 📁 **CODEBASE STRUCTURE**

```
frontend/
├── src/
│   ├── components/
│   │   ├── onboarding/          # 4-screen onboarding flow
│   │   ├── chat/                # Chat interface with citations
│   │   ├── audio/               # Circular waveform studio
│   │   ├── sources/             # Upload and management
│   │   ├── layout/              # Headers and navigation
│   │   └── navigation/          # Bottom tab bar
│   ├── types/                   # TypeScript definitions
│   ├── utils/                   # Helper functions
│   └── styles/                  # Tailwind CSS globals
├── ios/                         # iOS Capacitor project
├── android/                     # Android Capacitor project
└── dist/                        # Production build output
```

### 🎯 **SUCCESS METRICS ACHIEVED (UI LAYER ONLY)**

- ✅ **Pixel-Perfect UI**: 95% visual match to NotebookLM design
- ✅ **Mobile-First**: Optimized for 375px viewport with touch interactions
- ✅ **Performance**: Fast build times and smooth 60fps animations
- ✅ **Type Safety**: Full TypeScript coverage with strict mode
- ✅ **Production Ready**: Builds successfully for iOS/Android deployment
- ✅ **Routing Fixed**: Complete navigation flow working end-to-end

**Frontend UI Implementation: 95% Complete**
- All visual components and navigation working perfectly
- Comprehensive testing with Playwright MCP completed
- Ready for backend integration

### ⚠️ **CRITICAL REALITY CHECK**

**What We Have**: Beautiful, polished UI that looks like a complete app
**What We DON'T Have**: 
- ❌ ANY real backend functionality
- ❌ ANY actual AI features working
- ❌ ANY real data persistence
- ❌ ANY source upload/processing
- ❌ ANY real chat functionality
- ❌ ANY audio generation
- ❌ ANY search capabilities

**Bottom Line**: This is a high-fidelity prototype/mockup that demonstrates the UI/UX vision but requires months of backend development to become a functional product.

---

# 📱 Mobile Development & AI Assistant

For comprehensive mobile development guidance, see: **[Mobile Development Guide](docs/mobile-development-guide.md)**

## Quick Mobile Development Reference (NotebookLM Clone)
- **Frontend Stack**: Assistant-UI + React/TypeScript + Capacitor
- **Backend Integration**: FastAPI REST API extraction from Streamlit
- **Key Focus**: Pixel-perfect NotebookLM clone with source-grounded AI chat
- **Deployment**: iOS/Android native apps via Capacitor
- **UI Framework**: Material Design components matching Google's design language

**When to use mobile development approach:**
- User requests mobile app, iOS/Android, app store deployment
- User wants NotebookLM experience, NotebookLM clone, or chat-first interface
- User requests audio overviews, Studio features, or waveform visualization
- User needs inline citations, source-grounded responses, or multi-source chat
- Voice input, camera upload, or offline capabilities needed

**NotebookLM Feature Priority Order:**
1. Chat interface with numbered citations
2. Source upload modal (6+ file types)
3. Audio Studio with waveform player
4. Notebook management and organization
5. Collaboration and sharing features
6. Advanced analytics and enterprise features

---

# important-instruction-reminders
Do what has been asked; nothing more, nothing less.
NEVER create files unless they're absolutely necessary for achieving your goal.
ALWAYS prefer editing an existing file to creating a new one.
NEVER proactively create documentation files (*.md) or README files. Only create documentation files if explicitly requested by the User.

# Development Commands & Architecture

## 🚀 **Current Development Status**

### **Frontend (Mobile App) - ✅ WORKING**
```bash
cd frontend/
npm install
npm run dev          # Start development server → http://localhost:3001/
npm run build        # Production build
npm run build:mobile # Build for mobile deployment
npx cap open ios     # Open iOS project in Xcode
npx cap open android # Open Android project in Android Studio
```

### **Backend (API Server) - ❌ NEEDS CREATION**
```bash
# TODO: Create FastAPI backend
cd backend/          # Directory doesn't exist yet
python -m venv venv
source venv/bin/activate
pip install fastapi uvicorn
uvicorn main:app --reload --port 8001
```

### **Legacy Streamlit App (Reference Only)**
```bash
# Current working Streamlit app (for AI logic reference)
make run            # Start Streamlit on port 8502
make dev            # Run with Docker
make database       # Start SurrealDB on port 8002
make lint && make ruff  # Code quality checks
```

## Architecture Overview

### **Target Architecture (Mobile-First)**
```
Mobile Frontend (React/TypeScript) ←→ FastAPI Backend ←→ SurrealDB + AI Services
```

### **Current Architecture (Legacy)**
```
Streamlit Frontend ←→ Direct LangGraph/AI Integration ←→ SurrealDB
```

### **Migration Strategy**
1. **Extract**: Pull AI logic from Streamlit into FastAPI
2. **Connect**: Link React frontend to FastAPI backend  
3. **Deploy**: Mobile apps via Capacitor to app stores

For comprehensive development guidance, see:
- **[PROJECT_STATUS.md](./PROJECT_STATUS.md)** - Detailed development roadmap
- **[QUICK_START_GUIDE.md](./QUICK_START_GUIDE.md)** - How to start new sessions

---

# Testing & Quality Assurance

For comprehensive testing documentation and MCP Puppeteer setup, see: **[Testing Guide](docs/testing-guide.md)**

## Quick Testing Reference
- **UI Testing**: MCP Puppeteer automated testing for Streamlit interface
- **Test Structure**: 9 comprehensive test suites covering all features
- **Environment**: Chrome debugging (port 9222), SurrealDB (8002), Streamlit (8502)

**Current Status**: ✅ Ready for testing execution with MCP Puppeteer

---

# NotebookLM Clone Specification

For complete NotebookLM clone specification and implementation roadmap, see: **[NotebookLM Clone Specification](specs/notebooklm-clone-spec.md)**

## Quick Specification Reference
- **Goal**: Pixel-perfect mobile-first NotebookLM clone with open architecture
- **Key Features**: Source-grounded AI, chat-first interface, multi-voice audio generation
- **Implementation**: 5-phase roadmap (API → Mobile Frontend → Advanced Features → Native Optimization → Enterprise)
- **Success Metrics**: iOS/Android app store deployment, <2s response time, 100% feature parity

---

# MCP Server Setup

For comprehensive MCP server setup and configuration, see: **[MCP Setup Guide](docs/mcp-setup-guide.md)**

## MCP Usage Policy (CRITICAL)
**Default Approach**: DO NOT use MCP servers unless explicitly requested by the user.

**Conservative Usage Guidelines**:
- ✅ Use when user explicitly mentions specific services (Supabase, DigitalOcean, etc.)
- ❌ Never use for general coding tasks (use built-in tools: bash, edit, read, write)
- 🤖 Always ask permission before suggesting MCP servers

## Available MCP Servers
- **context7**: Library documentation lookup
- **supabase**: Database operations  
- **magic**: AI UI component generation
- **digitalocean**: Deployment automation
- **brightdata**: Web scraping and data access

---

# important-instruction-reminders
Do what has been asked; nothing more, nothing less.
NEVER create files unless they're absolutely necessary for achieving your goal.
ALWAYS prefer editing an existing file to creating a new one.
NEVER proactively create documentation files (*.md) or README files. Only create documentation files if explicitly requested by the User.