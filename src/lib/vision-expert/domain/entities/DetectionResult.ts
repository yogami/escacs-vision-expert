/**
 * DetectionResult - Domain Entity
 */

export interface DetectionResultProps {
    id: string;
    targetMeasure: string;
    failureMode: string;
    confidence: number;
    recommendedAction: string;
    detectedAt: Date;
}

export class DetectionResult {
    readonly id: string;
    readonly targetMeasure: string;
    readonly failureMode: string;
    readonly confidence: number;
    readonly recommendedAction: string;
    readonly detectedAt: Date;

    constructor(props: DetectionResultProps) {
        this.id = props.id;
        this.targetMeasure = props.targetMeasure;
        this.failureMode = props.failureMode;
        this.confidence = props.confidence;
        this.recommendedAction = props.recommendedAction;
        this.detectedAt = props.detectedAt;
    }

    static create(props: Omit<DetectionResultProps, 'id' | 'detectedAt'>): DetectionResult {
        return new DetectionResult({
            ...props,
            id: crypto.randomUUID(),
            detectedAt: new Date()
        });
    }
}
