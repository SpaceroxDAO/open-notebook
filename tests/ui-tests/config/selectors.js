// Element Selectors for Open-Notebook Application
export const selectors = {
  // Navigation and layout
  navigation: {
    sidebar: '[data-testid="stSidebar"]',
    mainContent: '[data-testid="stMain"]',
    header: 'header[data-testid="stHeader"]'
  },

  // Common Streamlit elements
  streamlit: {
    button: 'button[kind="primary"], button[kind="secondary"]',
    textInput: 'input[type="text"]',
    textArea: 'textarea',
    selectBox: '[data-baseweb="select"]',
    fileUploader: '[data-testid="stFileUploader"]',
    spinner: '[data-testid="stSpinner"]'
  },

  // Notebook management
  notebooks: {
    createButton: 'button:has-text("Create")',
    nameInput: 'input[placeholder*="name"], input[placeholder*="Name"]',
    descriptionInput: 'textarea[placeholder*="description"], textarea[placeholder*="Description"]',
    saveButton: 'button:has-text("Save")',
    editButton: 'button:has-text("Edit")',
    deleteButton: 'button:has-text("Delete")',
    archiveButton: 'button:has-text("Archive")',
    notebookCard: '[data-testid="notebook-card"]',
    notebookList: '[data-testid="notebook-list"]'
  },

  // Source management
  sources: {
    addSourceButton: 'button:has-text("Add Source")',
    uploadArea: '[data-testid="stFileUploader"]',
    urlInput: 'input[placeholder*="URL"], input[placeholder*="url"]',
    processButton: 'button:has-text("Process")',
    sourceCard: '[data-testid="source-card"]',
    sourceList: '[data-testid="source-list"]'
  },

  // Note creation and editing
  notes: {
    createNoteButton: 'button:has-text("Create Note")',
    noteTitle: 'input[placeholder*="title"], input[placeholder*="Title"]',
    noteContent: 'textarea[placeholder*="content"], textarea[placeholder*="Content"]',
    saveNoteButton: 'button:has-text("Save Note")',
    aiGenerateButton: 'button:has-text("Generate"), button:has-text("AI")',
    noteCard: '[data-testid="note-card"]'
  },

  // Search and Ask functionality
  search: {
    searchInput: 'input[placeholder*="search"], input[placeholder*="Search"]',
    askInput: 'textarea[placeholder*="ask"], textarea[placeholder*="Ask"]',
    searchButton: 'button:has-text("Search")',
    askButton: 'button:has-text("Ask")',
    resultsContainer: '[data-testid="search-results"]',
    resultItem: '[data-testid="result-item"]'
  },

  // Podcast generation
  podcasts: {
    generateButton: 'button:has-text("Generate")',
    modelSelector: '[data-testid="model-selector"]',
    styleSelector: '[data-testid="style-selector"]',
    playButton: 'button:has-text("Play")',
    downloadButton: 'button:has-text("Download")',
    episodeCard: '[data-testid="episode-card"]'
  },

  // Models and settings
  models: {
    providerSelector: '[data-testid="provider-selector"]',
    modelSelector: '[data-testid="model-selector"]',
    apiKeyInput: 'input[type="password"], input[placeholder*="API"]',
    saveSettingsButton: 'button:has-text("Save Settings")',
    testConnectionButton: 'button:has-text("Test")'
  },

  // Error states and loading
  states: {
    errorMessage: '[data-testid="error"], .error, [role="alert"]',
    successMessage: '[data-testid="success"], .success',
    loadingSpinner: '[data-testid="stSpinner"]',
    progressBar: '[data-testid="stProgress"]'
  }
};

export default selectors;