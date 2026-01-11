import { test, expect } from '@playwright/test';

const BASE_URL = process.env.E2E_BASE_URL || 'http://localhost:8080';

test.describe('ESCACS Vision Expert E2E', () => {
    test('Health check returns 200', async ({ request }) => {
        const response = await request.get(`${BASE_URL}/api/health`);
        expect(response.ok()).toBeTruthy();
        const body = await response.json();
        expect(body.status).toBe('healthy');
        expect(body.service).toBe('vision-expert');
    });

    test('OpenAPI documentation is available', async ({ request }) => {
        const response = await request.get(`${BASE_URL}/api/openapi.json`);
        expect(response.ok()).toBeTruthy();
        const spec = await response.json();
        expect(spec.info.title).toContain('Vision Expert');
    });
});
