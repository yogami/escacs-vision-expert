/**
 * GeminiVisionAdapter - Production VLM adapter using Gemini 1.5 Pro
 */

import { GoogleGenerativeAI } from '@google/generative-ai';
import { IVisionModelPort } from '../domain/services/ExpertVisionService';

const BMP_DEFECT_PROMPT = `You are an expert construction stormwater BMP (Best Management Practice) inspector.
Analyze this photo and identify any defects from these 6 categories:

1. silt_fence_tear - Visible tears, holes, or damage in silt fence fabric
2. silt_fence_overtop - Sediment or water overtopping the silt fence
3. silt_fence_gap - Gap between silt fence bottom and ground
4. inlet_clogged - Storm drain inlet blocked with sediment/debris
5. inlet_bypassed - Water flowing around rather than through inlet protection
6. bare_soil_large - Unprotected exposed soil area > 50 sq ft

Return JSON ONLY in this exact format:
{"failureMode": "detected_class_or_none", "confidence": 0.0-1.0}

If no defect is detected, return: {"failureMode": "none", "confidence": 1.0}`;

export class GeminiVisionAdapter implements IVisionModelPort {
    private readonly genAI: GoogleGenerativeAI;
    private readonly model: ReturnType<GoogleGenerativeAI['getGenerativeModel']>;

    constructor() {
        const apiKey = process.env.GOOGLE_AI_API_KEY;
        if (!apiKey) {
            throw new Error('GOOGLE_AI_API_KEY environment variable is required');
        }
        this.genAI = new GoogleGenerativeAI(apiKey);
        this.model = this.genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });
    }

    async analyzeImage(buffer: Buffer, _context: string): Promise<{ failureMode: string; confidence: number }> {
        const base64Image = buffer.toString('base64');

        const result = await this.model.generateContent([
            BMP_DEFECT_PROMPT,
            {
                inlineData: {
                    mimeType: 'image/jpeg',
                    data: base64Image
                }
            }
        ]);

        const response = result.response.text();
        return this.parseResponse(response);
    }

    private parseResponse(text: string): { failureMode: string; confidence: number } {
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (!jsonMatch) {
            return { failureMode: 'parse_error', confidence: 0 };
        }

        const parsed = JSON.parse(jsonMatch[0]);
        return {
            failureMode: parsed.failureMode || 'unknown',
            confidence: parsed.confidence || 0.5
        };
    }
}
