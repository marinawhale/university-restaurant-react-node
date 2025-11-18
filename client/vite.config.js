import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const repoName = 'university-restaurant-react-node'; 

export default defineConfig({
  base: `/${repoName}/`, 
  plugins: [react()],
});