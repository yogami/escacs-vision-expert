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

    test('Niche Failure Analysis Pipeline', async ({ request }) => {
        const response = await request.post(`${BASE_URL}/api/vision/analyze`, {
            data: {
                measureType: 'silt_fence',
                imageBase64: 'bW9ja19pbWFnZV9ic2U2NA==' // "mock_image_bse64"
            }
        });
        expect(response.ok()).toBeTruthy();
        const result = await response.json();
        expect(result.failureMode).toBe('overtopping');
        expect(result.recommendedAction).toContain('reinforce silt fence');
        expect(result.confidence).toBeGreaterThan(0.9);
    });
});
