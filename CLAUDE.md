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
# important-instruction-reminders
Do what has been asked; nothing more, nothing less.
NEVER create files unless they're absolutely necessary for achieving your goal.
ALWAYS prefer editing an existing file to creating a new one.
NEVER proactively create documentation files (*.md) or README files. Only create documentation files if explicitly requested by the User.