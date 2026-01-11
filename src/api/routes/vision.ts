/**
 * vision-expert API Routes
 */

import { OpenAPIHono, createRoute, z } from '@hono/zod-openapi';
import { ExpertVisionService, IVisionModelPort } from '../../lib/vision-expert/domain/services/ExpertVisionService';
import { MockVisionModelAdapter } from '../../lib/vision-expert/infrastructure/MockVisionModelAdapter';
import { GeminiVisionAdapter } from '../../lib/vision-expert/infrastructure/GeminiVisionAdapter';
import process from 'node:process';

export const visionRoutes = new OpenAPIHono();

// Use Gemini if API key is available, otherwise fall back to mock
function createVisionAdapter(): IVisionModelPort {
    if (process.env.GOOGLE_AI_API_KEY) {
        console.log('Using Gemini Vision Adapter (Production)');
        return new GeminiVisionAdapter();
    }
    console.log('Using Mock Vision Adapter (Development)');
    return new MockVisionModelAdapter();
}

const model = createVisionAdapter();
const service = new ExpertVisionService(model);

const DetectionSchema = z.object({
    id: z.string(),
    targetMeasure: z.string(),
    failureMode: z.string(),
    confidence: z.number(),
    recommendedAction: z.string(),
    detectedAt: z.string()
});

visionRoutes.openapi(
    createRoute({
        method: 'post',
        path: '/analyze',
        summary: 'Perform niche failure analysis on ESC measure',
        request: {
            body: {
                content: {
                    'application/json': {
                        schema: z.object({
                            measureType: z.string(),
                            imageBase64: z.string()
                        })
                    }
                }
            }
        },
        responses: {
            200: {
                description: 'Analysis complete',
                content: { 'application/json': { schema: DetectionSchema } }
            }
        }
    }),
    async (c) => {
        const { measureType, imageBase64 } = c.req.valid('json');
        const buffer = Buffer.from(imageBase64, 'base64');

        const result = await service.analyzeNicheFailure(buffer, measureType);
        return c.json({
            ...result,
            detectedAt: result.detectedAt.toISOString()
        });
    }
);
