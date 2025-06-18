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

These resources contain proven patterns, best practices, and templates that will accelerate development and ensure consistency across projects.

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
- **Look up latest syntax** - Your internal knowledge might be outdated. For external libraries, look up latest syntax via Perplexity (preferred) or web search
- **Don't skip libraries** - Never say "x library isn't working so I'll skip it." Usually it's incorrect syntax/patterns. If user asked for specific library, make it work
- **Debug root causes** - If running into repeated issues, figure out the root cause instead of random attempts or giving up

## 💻 Code Quality & Best Practices
- **Organize into separate files** - Follow modularity best practices, appropriate file organization
- **Optimize for readability** - Code is read more often than written. Focus on clear variable naming, function complexity, file sizes, commenting
- **Follow best practices** - Apply general coding best practices for the language/framework being used

## 🎨 UI/UX Excellence
- **Aesthetically pleasing designs** - Create designs that are both beautiful and functional
- **Follow UI/UX best practices** - Pay attention to interaction patterns, micro-interactions
- **Create engaging interfaces** - Be proactive about smooth, delightful user experiences

## 🧠 Professional Approach
- **Leverage expertise** - You are an experienced polyglot with decades of experience in software architecture, system design, development, UI & UX, copywriting, and more
- **Think systematically** - Approach problems with architectural thinking and systematic analysis

---

# important-instruction-reminders
Do what has been asked; nothing more, nothing less.
NEVER create files unless they're absolutely necessary for achieving your goal.
ALWAYS prefer editing an existing file to creating a new one.
NEVER proactively create documentation files (*.md) or README files. Only create documentation files if explicitly requested by the User.

## Development Commands

### Running the Application
```bash
# Run locally with environment variables
make run
# OR directly:
uv run --env-file .env streamlit run app_home.py

# Run with Docker (development mode)
make dev

# Run full stack with Docker
make full
```

### Database Management
```bash
# Start SurrealDB database only
make database
# OR:
docker compose --profile db_only up
```

### Code Quality & Linting
```bash
# Run type checking with mypy
make lint

# Run Ruff formatter/linter (auto-fix enabled)
make ruff
```

### Docker Build & Release
```bash
# Build multi-platform Docker image
make docker-build

# Create git tag from version in pyproject.toml
make tag

# Full release (build + push + latest tag)
make docker-release-all
```

## High-Level Architecture

### Core Domain Structure
The application follows Domain-Driven Design with clear separation of concerns:

- **`open_notebook/domain/`**: Business logic and domain models
  - `models.py`: Core entities (Notebook, Note, Source, etc.)
  - `transformations.py`: Content processing and AI transformations
  - `notebooks.py`: Notebook-specific operations
  - `base.py`: Base classes and interfaces

- **`open_notebook/database/`**: Data persistence layer
  - `repository.py`: Repository pattern implementation for SurrealDB
  - Uses graph database (SurrealDB) for flexible relationships between entities

- **`open_notebook/graphs/`**: AI Processing Workflows
  - Built on LangGraph for stateful AI workflows
  - `insight_writer.py`: Generates AI insights from sources
  - `embedding_writer.py`: Creates embeddings for semantic search
  - `note_writer.py`: AI-assisted note generation

### UI Architecture
- **Streamlit Multi-Page App**: Main entry point is `app_home.py`
- **`pages/`**: Individual Streamlit pages
  - `2_📒_Notebooks.py`: Notebook management
  - `3_🔍_Explore.py`: Content exploration
  - `4_🎙️_Podcasts.py`: Podcast generation
- **`pages/components/`**: Reusable UI components
- **`pages/stream_app/`**: Streamlit utilities and helpers

### Plugin System
- **`open_notebook/plugins/`**: Extensible functionality
  - `podcasts.py`: Podcast generation using Podcastfy

### AI Model Integration
- **Multi-Provider Support**: OpenAI, Anthropic, Google, Ollama, DeepSeek, etc.
- **Configuration**: `open_notebook_config.yaml` defines suggested models
- **Prompt Templates**: Jinja2 templates in `prompts/` directory

### Key Dependencies
- **LangChain/LangGraph**: AI orchestration and workflow management
- **Content-Core**: Content extraction and processing
- **Podcastfy**: Podcast generation from notes
- **Esperanto**: Multi-language support
- **SurrealDB**: Graph database for flexible data relationships

## Database Migrations
Migrations are in `migrations/` directory and run automatically on startup. SurrealDB uses SURQL files for schema definitions.

## Environment Configuration
Required API keys in `.env`:
- `OPENAI_API_KEY`
- `ANTHROPIC_API_KEY`
- `GOOGLE_API_KEY`
- `GROQ_API_KEY`
- `DEEPSEEK_API_KEY`
- `ELEVENLABS_API_KEY`
- `SURREAL_*` (database connection)

## Development Workflow
1. Use `uv` package manager for Python dependencies
2. Python 3.11-3.13 required
3. Type checking with mypy is enforced
4. Code formatting with Ruff
5. Multi-platform Docker builds supported (linux/amd64, linux/arm64)

## Testing
Currently minimal test coverage. Tests directory exists but needs implementation. Type checking (mypy) is the primary quality gate.

## Key Architectural Decisions
1. **Graph Database**: SurrealDB chosen for flexible entity relationships
2. **Stream Processing**: Streamlit for real-time UI updates during AI processing
3. **Repository Pattern**: Abstracts database operations for maintainability
4. **Multi-Model Support**: Configurable AI providers without code changes
5. **Content Agnostic**: Handles PDFs, videos, audio, web content through Content-Core

---

# 🧪 COMPREHENSIVE MCP PUPPETEER TESTING PLAN

## 🎯 NEXT STEPS FOR TESTING IMPLEMENTATION

### Phase 1: Environment Setup ✅ (COMPLETED)
- ✅ Puppeteer MCP Server installed globally (`mcp-server-puppeteer`)
- ✅ Claude Code MCP configuration completed
- ✅ Chrome debugging on port 9222
- ✅ SurrealDB running on port 8002
- ✅ Open-notebook Streamlit app on port 8502

### Phase 2: Test Structure Creation ✅ (COMPLETED)
- ✅ Test directory structure created in `tests/ui-tests/`
- ✅ Configuration files created:
  - `tests/ui-tests/config/test-config.js` - Test configuration and settings
  - `tests/ui-tests/config/selectors.js` - Element selectors for UI automation
- ✅ Screenshot directories created for all test suites
- ✅ Reports and documentation structure in place

### Phase 3: Smoke Tests Execution (IN PROGRESS)
**Directory Structure Setup:**
```
tests/
├── ui-tests/
│   ├── config/
│   │   ├── test-config.js         # Test configuration
│   │   └── selectors.js           # Element selectors
│   ├── suites/
│   │   ├── 01-smoke.test.js       # Basic functionality
│   │   ├── 02-notebook-mgmt.test.js  # Notebook management
│   │   ├── 03-source-mgmt.test.js    # Source management
│   │   ├── 04-note-creation.test.js  # Note creation/editing
│   │   ├── 05-search-ask.test.js     # Search & Ask functionality
│   │   ├── 06-podcast-generation.test.js # Podcast features
│   │   ├── 07-models-settings.test.js    # Models & Settings
│   │   ├── 08-responsive.test.js     # Mobile responsiveness
│   │   └── 09-edge-cases.test.js     # Error handling
│   ├── screenshots/
│   │   ├── smoke/, notebooks/, sources/, notes/
│   │   ├── search/, podcasts/, models/, responsive/
│   │   └── edge-cases/
│   └── reports/
└── docs/
    └── test-results/
```

### Phase 3: Application Feature Analysis & Test Mapping

**Core Application Features Identified:**

#### 🏠 **Home/Landing (app_home.py)**
- Object viewing system (notes, sources, embeddings, insights)
- URL parameter routing (`?object_id=`)
- Automatic redirection to Notebooks page

#### 📒 **Notebook Management (2_📒_Notebooks.py)**
- Create/edit/delete notebooks
- Archive/unarchive functionality
- Name and description editing
- Source management within notebooks
- Note creation and management
- Real-time chat interface

#### 🔍 **Search & Ask (3_🔍_Ask_and_Search.py)**
- Knowledge base querying (beta)
- Text search functionality
- Vector search capabilities
- Multi-model AI processing pipeline
- Results scoring and relevance

#### 🎙️ **Podcast Generation (5_🎙️_Podcasts.py)**
- Text-to-speech model integration
- Multi-provider support (Gemini, OpenAI, Anthropic)
- Episode creation from notebook content
- Conversation styles and dialogue structures
- Participant roles and engagement techniques

#### 🤖 **Model Management (7_🤖_Models.py)**
- AI model configuration
- Provider management
- Text-to-speech model setup
- Language model configuration

#### 💱 **Transformations (8_💱_Transformations.py)**
- Content processing workflows
- AI-powered content enhancement

#### ⚙️ **Settings (10_⚙️_Settings.py)**
- Application configuration
- User preferences

### Phase 4: Comprehensive Test Execution Plan

#### **Test Suite 1: Smoke Tests (01-smoke.test.js)**
**Purpose**: Verify basic application functionality
**MCP Commands**:
```javascript
// Basic connectivity and navigation
mcp__puppeteer__puppeteer_connect_active_tab()
mcp__puppeteer__puppeteer_navigate({ url: "http://localhost:8502" })
mcp__puppeteer__puppeteer_screenshot({ name: "smoke-homepage-load" })

// Test main navigation
mcp__puppeteer__puppeteer_click({ selector: "a[href*='Notebooks']" })
mcp__puppeteer__puppeteer_screenshot({ name: "smoke-notebooks-page" })

// Verify no critical console errors
mcp__puppeteer__puppeteer_evaluate({ 
  script: "console.error = (function(){ var errors = []; return function(){ errors.push(arguments); return errors; }})();" 
})
```

#### **Test Suite 2: Notebook Management (02-notebook-mgmt.test.js)**
**Purpose**: Test complete notebook lifecycle
**Test Cases**:
- Create new notebook
- Edit notebook name/description
- Archive/unarchive notebook
- Delete notebook
- Navigate between notebooks

**MCP Commands**:
```javascript
// Create notebook test
mcp__puppeteer__puppeteer_click({ selector: "button:contains('Create')" })
mcp__puppeteer__puppeteer_fill({ selector: "input[placeholder*='name']", value: "Test Notebook" })
mcp__puppeteer__puppeteer_fill({ selector: "textarea[placeholder*='description']", value: "Test Description" })
mcp__puppeteer__puppeteer_screenshot({ name: "notebook-creation-form" })
```

#### **Test Suite 3: Source Management (03-source-mgmt.test.js)**
**Purpose**: Test source upload and processing
**Test Cases**:
- Upload PDF documents
- Upload text files
- URL source addition
- Source processing verification
- Source deletion

#### **Test Suite 4: Note Creation (04-note-creation.test.js)**
**Purpose**: Test note creation and AI assistance
**Test Cases**:
- Manual note creation
- AI-generated notes from sources
- Note editing and formatting
- Note attachment to sources

#### **Test Suite 5: Search & Ask (05-search-ask.test.js)**
**Purpose**: Test search and AI query functionality
**Test Cases**:
- Text search across notebooks
- Vector similarity search
- AI-powered knowledge base queries
- Result relevance verification

#### **Test Suite 6: Podcast Generation (06-podcast-generation.test.js)**
**Purpose**: Test podcast creation features
**Test Cases**:
- Model configuration verification
- Episode creation from notes
- Audio generation process
- Download functionality

#### **Test Suite 7: Models & Settings (07-models-settings.test.js)**
**Purpose**: Test configuration interfaces
**Test Cases**:
- AI model setup
- Provider configuration
- Settings persistence
- Error handling for invalid configurations

#### **Test Suite 8: Responsive Design (08-responsive.test.js)**
**Purpose**: Test mobile and tablet layouts
**Viewports to Test**:
- Mobile: 375px × 667px
- Tablet: 768px × 1024px  
- Desktop: 1920px × 1080px

**MCP Commands**:
```javascript
// Mobile viewport test
mcp__puppeteer__puppeteer_evaluate({ 
  script: `
    document.documentElement.style.width = '375px';
    document.documentElement.style.height = '667px';
    window.dispatchEvent(new Event('resize'));
    'Mobile viewport set'
  `
})
mcp__puppeteer__puppeteer_screenshot({ name: "responsive-mobile-375" })
```

#### **Test Suite 9: Edge Cases & Error Handling (09-edge-cases.test.js)**
**Purpose**: Test error scenarios and edge cases
**Test Cases**:
- Large file uploads
- Network disconnection simulation
- Invalid input handling
- API timeout scenarios
- Memory-intensive operations

### Phase 5: Test Execution Workflow

#### **Pre-Test Setup Checklist**
```bash
# 1. Verify all services running
docker ps  # Check SurrealDB container
curl -I http://localhost:8502  # Verify Streamlit
lsof -i :9222  # Verify Chrome debugging

# 2. Reset test environment
# Clear browser cache, reset database to known state
# Take baseline screenshots
```

#### **Test Execution Pattern**
For each test case:
1. **Navigate**: Go to relevant page
2. **Screenshot**: Capture initial state  
3. **Action**: Perform user interaction
4. **Verify**: Check expected outcome
5. **Screenshot**: Capture result state
6. **Document**: Record pass/fail with evidence

#### **Automated Test Runner Commands**
```javascript
// Template for systematic testing
function executeTestSuite(suiteName, testCases) {
  for (const testCase of testCases) {
    // 1. Setup
    mcp__puppeteer__puppeteer_navigate({ url: testCase.url });
    mcp__puppeteer__puppeteer_screenshot({ name: `${suiteName}-${testCase.name}-before` });
    
    // 2. Execute
    testCase.actions.forEach(action => {
      mcp__puppeteer__puppeteer_click({ selector: action.selector });
      // or mcp__puppeteer__puppeteer_fill({ selector: action.selector, value: action.value });
    });
    
    // 3. Verify
    mcp__puppeteer__puppeteer_screenshot({ name: `${suiteName}-${testCase.name}-after` });
    
    // 4. Validate
    mcp__puppeteer__puppeteer_evaluate({ script: testCase.verification });
  }
}
```

### Phase 6: Results Documentation & Reporting

#### **Test Report Template**
```markdown
# Open-Notebook UI Test Report
**Date**: [YYYY-MM-DD]
**Tester**: Claude Code + MCP Puppeteer
**Environment**: Streamlit 8502, SurrealDB 8002, Chrome Debug 9222

## Executive Summary
- Total Tests: X
- Passed: X
- Failed: X  
- Critical Issues: X

## Test Results by Suite
### Smoke Tests: ✅ PASSED
- Basic navigation: ✅
- Page loading: ✅
- No critical errors: ✅

### Notebook Management: ⚠️ PARTIAL
- Create notebook: ✅
- Edit notebook: ❌ Form validation issue
- Delete notebook: ✅

[Continue for each suite...]

## Critical Issues Found
1. **Issue**: Notebook form validation
   **Severity**: High
   **Screenshots**: notebook-creation-error.png
   **Steps to Reproduce**: [detailed steps]

## Performance Metrics
- Average page load: X seconds
- Largest contentful paint: X seconds
- Time to interactive: X seconds

## Browser Compatibility
- Chrome: ✅ Fully supported
- Firefox: 🔄 Testing pending
- Safari: 🔄 Testing pending
```

### Phase 7: Continuous Testing Integration

#### **Daily Test Routine**
```bash
# Morning health check
run_smoke_tests()

# Feature-specific testing after changes
run_targeted_tests(changed_features)

# Weekly comprehensive testing
run_full_test_suite()
```

#### **Test Maintenance**
- Update selectors when UI changes
- Add new test cases for new features
- Maintain screenshot baselines
- Performance benchmark tracking

---

## 🚀 IMMEDIATE NEXT ACTIONS

### To Continue Testing Implementation:
1. **Run Phase 2**: Create test directory structure
2. **Execute Phase 3**: Begin with smoke tests using MCP commands
3. **Document Phase 4**: Record all findings with screenshots
4. **Iterate Phase 5**: Fix issues and re-test
5. **Report Phase 6**: Generate comprehensive test report

### Ready-to-Execute MCP Commands:
```javascript
// Start testing session
mcp__puppeteer__puppeteer_connect_active_tab()
mcp__puppeteer__puppeteer_navigate({ url: "http://localhost:8502" })
mcp__puppeteer__puppeteer_screenshot({ name: "test-session-start" })

// Begin smoke tests immediately
// [Follow smoke test suite above]
```

**Environment Status**: ✅ READY FOR TESTING
**Current Progress**: Phase 2 completed, Phase 3 smoke tests ready to execute
**Next Step**: Execute smoke tests using MCP Puppeteer commands
**Estimated Duration**: 1-2 hours for remaining testing cycle

## 🔄 SESSION RESTART STATUS (Updated: 2025-06-18)

### ✅ COMPLETED PHASES:
1. **Phase 1 - Environment Setup**: All services verified and running
2. **Phase 2 - Test Structure**: Directory structure and config files created

### 🚀 NEXT IMMEDIATE ACTIONS:
1. **Connect to Chrome**: `mcp__puppeteer__puppeteer_connect_active_tab()`
2. **Navigate to App**: `mcp__puppeteer__puppeteer_navigate({ url: "http://localhost:8502" })`
3. **Take Initial Screenshot**: `mcp__puppeteer__puppeteer_screenshot({ name: "test-session-start" })`
4. **Execute Smoke Tests**: Basic navigation and functionality verification

### 📁 CREATED FILES:
- `tests/ui-tests/config/test-config.js` - Test configuration and URLs
- `tests/ui-tests/config/selectors.js` - Element selectors for automation
- Complete directory structure for screenshots and reports

### 🎯 READY TO EXECUTE:
```javascript
// Start testing session
mcp__puppeteer__puppeteer_connect_active_tab()
mcp__puppeteer__puppeteer_navigate({ url: "http://localhost:8502" })
mcp__puppeteer__puppeteer_screenshot({ name: "smoke-homepage-load" })
```

# important-instruction-reminders
Do what has been asked; nothing more, nothing less.
NEVER create files unless they're absolutely necessary for achieving your goal.
ALWAYS prefer editing an existing file to creating a new one.
NEVER proactively create documentation files (*.md) or README files. Only create documentation files if explicitly requested by the User.