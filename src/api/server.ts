/**
 * ESCACS Vision Expert API Server
 */

import { serve } from '@hono/node-server';
import { swaggerUI } from '@hono/swagger-ui';
import { OpenAPIHono } from '@hono/zod-openapi';
import { cors } from 'hono/cors';
import { visionRoutes } from './routes/vision';
import process from 'node:process';

const app = new OpenAPIHono();

app.use('*', cors());

// Mount routes
app.route('/api/vision', visionRoutes);

// Health check
app.get('/api/health', (c) => c.json({ status: 'healthy', service: 'vision-expert' }));

// OpenAPI doc
app.doc('/api/openapi.json', {
    openapi: '3.0.0',
    info: {
        title: 'ESCACS Vision Expert API',
        version: '1.0.0',
        description: 'Specialized ESC failure mode detection',
    },
    servers: [{ url: 'http://localhost:3006', description: 'Local' }],
});

app.get('/api/docs', swaggerUI({ url: '/api/openapi.json' }));

const port = parseInt(process.env.PORT || '8080', 10);
console.log(`Vision Expert running on port ${port}`);

serve({ fetch: app.fetch, port });

export default app;
