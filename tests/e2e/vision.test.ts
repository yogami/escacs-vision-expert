import { test, expect } from '@playwright/test';

const BASE_URL = process.env.E2E_BASE_URL || 'http://localhost:3006';

test.describe('ESCACS Vision Expert E2E', () => {
    test('Health check returns 200', async ({ request }) => {
        const response = await request.get(`${BASE_URL}/api/health`);
        expect(response.ok()).toBeTruthy();
        const body = await response.json();
        expect(body.status).toBe('healthy');
        expect(body.service).toBe('vision-expert');
    });

    test('Vision Analysis API handles requests', async ({ request }) => {
        // Test API endpoint responds (in production, needs real images for actual detection)
        const response = await request.post(`${BASE_URL}/api/vision/analyze`, {
            data: {
                measureType: 'silt_fence',
                imageBase64: 'bW9ja19pbWFnZV9ic2U2NA==' // Test payload
            }
        });

        // API should respond (200 with mock, or 500 with graceful error in prod with invalid image)
        const result = await response.json();
        expect(result).toHaveProperty('failureMode');
        expect(result).toHaveProperty('targetMeasure');
        expect(result).toHaveProperty('detectedAt');
    });
});
