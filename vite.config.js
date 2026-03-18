import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'

const isGitHubActions = process.env.GITHUB_ACTIONS === 'true'
const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1] || ''
const githubPagesBase = repoName ? `/${repoName}/` : '/'

// https://vite.dev/config/
export default defineConfig({
  base: isGitHubActions ? githubPagesBase : '/',
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] })
  ],
})
