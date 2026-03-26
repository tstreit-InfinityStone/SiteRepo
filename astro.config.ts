import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

import { redirectMap } from './src/data/redirects';

const githubRepository = process.env.GITHUB_REPOSITORY;
const [githubOwner = '', githubRepo = ''] = githubRepository?.split('/') ?? [];
const isUserPagesRepo = githubOwner !== '' && githubRepo === `${githubOwner}.github.io`;
const githubPagesSite =
  githubOwner && githubRepo
    ? `https://${githubOwner}.github.io`
    : undefined;
const githubPagesBase =
  githubOwner && githubRepo && !isUserPagesRepo
    ? `/${githubRepo}`
    : undefined;

export default defineConfig({
  site: githubPagesSite ?? 'https://www.infinitystonesolutions.com',
  base: githubPagesBase,
  output: 'static',
  adapter: cloudflare({
    prerenderEnvironment: 'node',
    imageService: 'passthrough',
  }),
  integrations: [
    react(),
    sitemap({
      filter: (page) =>
        !page.includes('/print') && !page.endsWith('/404'),
    }),
  ],
  redirects: redirectMap,
});
