# ESCACS Niche Vision Expert

## Objective
Implement a specialized computer vision service that detects specific failure modes in Erosion & Sediment Control (ESC) measures, such as overtopped silt fences, torn liners, or blocked inlets.

---

## Task Breakdown

### 1. Project Scaffolding
- [x] Create project structure
- [x] Initialize `package.json`
- [x] Link Berlin AI Studio rules via `install-brain.sh`
- [x] Set up `tsconfig.json` and `vite.config.ts`

### 2. Acceptance Tests (ATDD)
- [ ] Write `niche-detection.feature`
- [ ] Create step definitions

### 3. Domain Implementation
- [ ] Entities: `DetectionResult`, `FailureMode`
- [ ] Services: `ExpertVisionService`
- [ ] Ports: `IVisionModelPort`

### 4. Infrastructure Implementation
- [ ] `MockYOLOAdapter` (Simulating failure detection)

### 5. API Layer
- [ ] `POST /api/analyze/niche`
- [ ] `GET /api/health`

### 6. Gold Standards Compliance
- [ ] Cyclomatic Complexity ≤ 3 per function
- [ ] Unit Test Coverage ≥ 80%
- [ ] 100% Acceptance Test Pass Rate

### 7. Registration & Deployment
- [ ] Register in `Microservices_Catalog.md`
- [ ] Register with Capability Broker
- [ ] Deploy to Railway
