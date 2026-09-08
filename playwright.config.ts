import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests', timeout: 60_000, expect: { timeout: 10_000 },
  fullyParallel: true, workers: 2, retries: 0,
  reporter: [['list'], ['html', { open: 'never' }], ['json', { outputFile: 'test-results/results.json' }]],
  use: {
    baseURL: process.env.BASE_URL ?? 'http://127.0.0.1:3000',
    viewport: { width: 1440, height: 900 },
    screenshot: 'only-on-failure', trace: 'retain-on-failure',
    launchOptions: { args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] },
  },
  webServer: {
    command: 'npm start', url: 'http://127.0.0.1:3000', timeout: 60_000,
    reuseExistingServer: !process.env.CI,
  },
});
