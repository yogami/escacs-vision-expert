import { Given, When, Then, Before } from '@cucumber/cucumber';
import { expect } from 'vitest';
import { ExpertVisionService } from '../../src/lib/vision-expert/domain/services/ExpertVisionService';
import { MockVisionModelAdapter } from '../../src/lib/vision-expert/infrastructure/MockVisionModelAdapter';
import { DetectionResult } from '../../src/lib/vision-expert/domain/entities/DetectionResult';

interface World {
    service: ExpertVisionService;
    measureType?: string;
    result?: DetectionResult;
}

Before(function (this: World) {
    const model = new MockVisionModelAdapter();
    this.service = new ExpertVisionService(model);
});

Given('an inspection image containing a {string}', async function (this: World, measure: string) {
    this.measureType = measure;
});

When('I analyze the image for niche failures', async function (this: World) {
    this.result = await this.service.analyzeNicheFailure(Buffer.from('mock_bytes'), this.measureType!);
});

Then('the engine should identify {string} as the failure mode', async function (this: World, failure: string) {
    expect(this.result?.failureMode).toBe(failure);
});

Then('the confidence score should be above {float}', async function (this: World, minConfidence: number) {
    expect(this.result?.confidence).toBeGreaterThan(minConfidence);
});

Then('the recommended action should be {string}', async function (this: World, action: string) {
    expect(this.result?.recommendedAction).toBe(action);
});
