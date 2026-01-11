/**
 * ExpertVisionService - Domain Service
 */

import { DetectionResult } from '../entities/DetectionResult';

export interface IVisionModelPort {
    analyzeImage(imageBuffer: Buffer, context: string): Promise<{
        failureMode: string;
        confidence: number;
    }>;
}

export class ExpertVisionService {
    constructor(private readonly model: IVisionModelPort) { }

    async analyzeNicheFailure(image: Buffer, measureType: string): Promise<DetectionResult> {
        const detection = await this.model.analyzeImage(image, measureType);
        const action = this.mapFailureToRecommendation(detection.failureMode);

        return DetectionResult.create({
            targetMeasure: measureType,
            failureMode: detection.failureMode,
            confidence: detection.confidence,
            recommendedAction: action
        });
    }

    private mapFailureToRecommendation(failure: string): string {
        switch (failure) {
            case 'overtopping': return 'Remove sediment and reinforce silt fence height';
            case 'tear': return 'Replace liner immediately';
            case 'undercutting': return 'Re-trench and compact soil around measure';
            default: return 'General maintenance required';
        }
    }
}
