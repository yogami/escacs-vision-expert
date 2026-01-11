/**
 * Mock Model Adapter
 */

import { IVisionModelPort } from '../domain/services/ExpertVisionService';

export class MockVisionModelAdapter implements IVisionModelPort {
    async analyzeImage(_buffer: Buffer, context: string): Promise<{ failureMode: string; confidence: number }> {
        // Logic to simulate failure modes based on context for testing
        if (context === 'silt_fence') {
            return { failureMode: 'overtopping', confidence: 0.92 };
        }
        if (context === 'sediment_liner') {
            return { failureMode: 'tear', confidence: 0.88 };
        }
        return { failureMode: 'none', confidence: 1.0 };
    }
}
