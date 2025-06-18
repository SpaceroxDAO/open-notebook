// Test Configuration for Open-Notebook MCP Puppeteer Testing
export const testConfig = {
  // Application URLs
  baseUrl: 'http://localhost:8502',
  pages: {
    home: 'http://localhost:8502',
    notebooks: 'http://localhost:8502/Notebooks',
    search: 'http://localhost:8502/Ask_and_Search',
    podcasts: 'http://localhost:8502/Podcasts',
    models: 'http://localhost:8502/Models',
    transformations: 'http://localhost:8502/Transformations',
    settings: 'http://localhost:8502/Settings'
  },

  // Test timeouts (milliseconds)
  timeouts: {
    navigation: 30000,
    elementLoad: 10000,
    apiResponse: 15000,
    fileUpload: 60000
  },

  // Viewport configurations for responsive testing
  viewports: {
    mobile: { width: 375, height: 667 },
    tablet: { width: 768, height: 1024 },
    desktop: { width: 1920, height: 1080 }
  },

  // Test data
  testData: {
    notebook: {
      name: 'Test Notebook MCP',
      description: 'Created by MCP Puppeteer testing'
    },
    note: {
      title: 'Test Note',
      content: 'This is a test note created during automated testing'
    }
  },

  // Screenshot settings
  screenshots: {
    path: './tests/ui-tests/screenshots/',
    fullPage: true,
    quality: 80
  }
};

export default testConfig;