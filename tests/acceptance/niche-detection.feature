Feature: Niche ESC Failure Detection
  As a compliance inspector
  I want a specialized vision model to identify specific failure modes
  So that I can document exactly why an ESC measure is failing

  Scenario: Detecting an overtopped silt fence
    Given an inspection image containing a "silt_fence"
    When I analyze the image for niche failures
    Then the engine should identify "overtopping" as the failure mode
    And the confidence score should be above 0.85

  Scenario: Detecting a torn sediment liner
    Given an inspection image containing a "sediment_liner"
    When I analyze the image for niche failures
    Then the engine should identify "tear" as the failure mode
    And the recommended action should be "Replace liner immediately"
