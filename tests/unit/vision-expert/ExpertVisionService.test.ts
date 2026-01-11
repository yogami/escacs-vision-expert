/**
 * ExpertVisionService Unit Tests
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { ExpertVisionService } from '../../../src/lib/vision-expert/domain/services/ExpertVisionService';
import { MockVisionModelAdapter } from '../../../src/lib/vision-expert/infrastructure/MockVisionModelAdapter';

describe('ExpertVisionService', () => {
    let service: ExpertVisionService;

    beforeEach(() => {
        service = new ExpertVisionService(new MockVisionModelAdapter());
    });

    it('should detect and map silt fence failure', async () => {
        const result = await service.analyzeNicheFailure(Buffer.from(''), 'silt_fence');
        expect(result.failureMode).toBe('overtopping');
        expect(result.recommendedAction).toContain('reinforce silt fence');
    });

    it('should detect and map liner failure', async () => {
        const result = await service.analyzeNicheFailure(Buffer.from(''), 'sediment_liner');
        expect(result.failureMode).toBe('tear');
        expect(result.recommendedAction).toBe('Replace liner immediately');
    });
});
