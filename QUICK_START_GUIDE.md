# 🚀 Quick Start Guide for New Development Sessions

**Last Updated**: December 19, 2024

---

## 📋 **CURRENT STATE SUMMARY**

### ✅ **WHAT'S WORKING**
- **Frontend UI**: 95% complete, fully functional mobile-first interface
- **Navigation**: Complete onboarding flow → main app → tab switching
- **Testing**: Comprehensive Playwright MCP testing completed  
- **Deployment**: iOS/Android Capacitor projects ready
- **Build**: Production builds working, no TypeScript errors

### ❌ **WHAT'S NOT WORKING**
- **Backend**: Does not exist (0% complete)
- **AI Features**: All mocked, no real functionality
- **Data**: All hardcoded mock data
- **APIs**: No REST API endpoints
- **File Upload**: UI only, no processing
- **Chat**: Static responses, no AI integration

---

## 🎯 **IMMEDIATE PRIORITIES**

### **PHASE 1: Backend API Development (START HERE)**
**Goal**: Create FastAPI backend to replace mock data  
**Estimated Time**: 2-3 weeks  
**Critical Path**: Everything depends on this

### **Next Session Should Focus On**:
1. **FastAPI Project Setup** (1 hour)
   - Create backend directory structure
   - Set up Python environment and dependencies
   - Create first working endpoint

2. **Extract Existing Logic** (1 hour)  
   - Review current Streamlit app architecture
   - Identify reusable domain models
   - Plan API endpoint structure

3. **Test Integration** (30 minutes)
   - Connect frontend to new API
   - Replace one piece of mock data
   - Verify end-to-end flow

---

## 🛠️ **DEVELOPMENT SETUP**

### **Frontend (Already Working)**
```bash
cd frontend/
npm install
npm run dev
# Visit: http://localhost:3001/
```

### **Backend (Needs Creation)**
```bash
# Create backend directory
mkdir backend
cd backend

# Set up Python environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install fastapi uvicorn sqlalchemy pydantic python-multipart

# Create basic FastAPI app
touch main.py
```

### **Database (SurrealDB)**
```bash
# Start SurrealDB (if not running)
make database
# OR manually: docker run -p 8002:8000 surrealdb/surrealdb:latest start --log trace
```

---

## 📁 **KEY FILE LOCATIONS**

### **Frontend Files (Working)**
```
frontend/src/
├── App.tsx                     # Main app router (WORKING)
├── components/MainApp.tsx      # Main interface (WORKING)  
├── components/chat/            # Chat interface (UI only)
├── components/sources/         # Source management (UI only)
├── components/audio/           # Audio studio (UI only)
└── components/onboarding/      # Onboarding flow (WORKING)
```

### **Mock Data Locations (Need Replacement)**
```
frontend/src/components/MainApp.tsx         # Lines 34-72: Mock notebook data
frontend/src/components/chat/SimpleChatInterface.tsx  # Mock chat responses
frontend/src/components/sources/SourceManager.tsx     # Mock source list
```

### **Existing Backend Logic (Streamlit)**
```
open_notebook/
├── domain/                     # Domain models (REUSABLE)
├── database/                   # Database layer (REUSABLE) 
├── graphs/                     # LangGraph workflows (EXTRACT)
└── pages/                      # Streamlit UI (IGNORE)
```

---

## 🎯 **API ENDPOINTS TO BUILD**

### **Priority 1: Core Functionality**
```python
# Notebooks
GET    /api/notebooks           # List notebooks
POST   /api/notebooks           # Create notebook  
GET    /api/notebooks/{id}      # Get notebook details

# Sources
POST   /api/notebooks/{id}/sources  # Upload source
GET    /api/notebooks/{id}/sources  # List sources

# Chat  
POST   /api/chat                # Send message
GET    /api/chat/{notebook_id}  # Chat history
```

### **Priority 2: Advanced Features**
```python
# Audio
POST   /api/audio/generate      # Generate discussion
GET    /api/audio/{id}/status   # Check status

# Search
POST   /api/search              # Search across notebooks
```

---

## 🧪 **TESTING WORKFLOW**

### **Frontend Testing (Already Working)**
```bash
# Start frontend
npm run dev

# Test with Playwright MCP
# 1. Navigate to http://localhost:3001/
# 2. Complete onboarding flow
# 3. Test all tab navigation
# 4. Verify UI components working
```

### **Backend Testing (When Created)**
```bash
# Start backend
uvicorn main:app --reload --port 8001

# Test API endpoints
curl http://localhost:8001/api/notebooks
curl -X POST http://localhost:8001/api/notebooks -H "Content-Type: application/json" -d '{"name": "Test"}'

# Test frontend integration
# Update frontend API base URL to http://localhost:8001
```

---

## 📊 **DEVELOPMENT COMMANDS**

### **Frontend Commands**
```bash
npm run dev          # Development server
npm run build        # Production build
npm run build:mobile # Mobile build + sync
npx cap open ios     # Open iOS project
npx cap open android # Open Android project
```

### **Backend Commands (To Create)**
```bash
uvicorn main:app --reload                    # Development server
uvicorn main:app --host 0.0.0.0 --port 8001 # Production server
pip freeze > requirements.txt               # Save dependencies
```

### **Database Commands**
```bash
make database        # Start SurrealDB
make run            # Start full Streamlit app (for reference)
```

---

## 🔧 **TROUBLESHOOTING**

### **Common Frontend Issues**
- **Port conflicts**: Frontend tries ports 3000 → 3001 → 3002
- **Build errors**: Run `npm run build` to check TypeScript
- **Navigation issues**: Clear localStorage and refresh

### **Common Development Issues**
- **CORS errors**: Configure FastAPI CORS for localhost:3001
- **Database connection**: Ensure SurrealDB running on port 8002
- **API integration**: Check network tab for API call failures

---

## 🎯 **SESSION GOALS TEMPLATE**

### **Session Start Checklist**
- [ ] Review PROJECT_STATUS.md for current state
- [ ] Start development servers (frontend + database)
- [ ] Test current functionality to ensure nothing broken
- [ ] Review last session's progress and next steps

### **Session End Checklist**  
- [ ] Commit and push all changes
- [ ] Update PROJECT_STATUS.md with progress
- [ ] Document any issues or blockers found
- [ ] Update this guide with new learnings

---

## 🚀 **RECOMMENDED FIRST BACKEND SESSION**

### **Goal**: Get basic API server running and integrated

### **Step 1: Create FastAPI Project (30 minutes)**
```python
# backend/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Open Notebook API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3001"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Open Notebook API"}

@app.get("/api/notebooks")
def list_notebooks():
    return [
        {
            "id": "1",
            "name": "Test Notebook",
            "description": "First API notebook",
            "created_at": "2024-12-19T00:00:00Z"
        }
    ]
```

### **Step 2: Test API (10 minutes)**
```bash
cd backend
uvicorn main:app --reload --port 8001
# Visit: http://localhost:8001/docs
```

### **Step 3: Connect Frontend (20 minutes)**
```typescript
// frontend/src/services/api.ts
const API_BASE = 'http://localhost:8001';

export const api = {
  getNotebooks: async () => {
    const response = await fetch(`${API_BASE}/api/notebooks`);
    return response.json();
  }
};

// Update MainApp.tsx to use real API instead of mock data
```

### **Success Criteria**
- [ ] FastAPI server runs on port 8001
- [ ] API documentation accessible at /docs
- [ ] Frontend successfully calls API
- [ ] At least one mock data source replaced

---

*Keep this guide updated as development progresses!*