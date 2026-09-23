# Quality-Assurance Report

**Run:** `RUN-FVR-20260824-001`  
**Generated:** 2026-08-25T00:45:40Z  
**Overall status:** **pass_with_declared_limitations**  
**Checks:** 16 pass, 1 warning, 0 fail

## Audit results

| Gate | Status | Result |
|---|---:|---|
| All JSON parses | **PASS** | Parsed 62 JSON files successfully. |
| Required project structure | **PASS** | All required non-package paths are present. |
| Stable IDs are unique | **PASS** | No duplicate stable IDs found across canonical registries. |
| Claims have valid provenance | **PASS** | All 439 claims reference valid sources or human observations; reverse source links are valid. |
| Deterministic scoring reproduces | **PASS** | Validated 6 vehicles and 246 scored components; every awarded input has a claim or observation ID. |
| Eligibility gate applied consistently | **PASS** | All 6 scored configurations pass or conditionally pass; no failed candidate is scored. |
| Eliminations are traceable | **PASS** | All 16 eliminations reference valid claims and sources. |
| TCO formulas reproduce | **PASS** | Reproduced all 36 low/base/high TCO scenarios; insurance is explicitly null and separate. |
| Price evidence and direct links | **WARN** | Validated 18 direct price records; every deep vehicle has at least three exact comparable records. Declared limitation: VEH-KIA-EV9-2024-LAND-AWD-POSTJAN24 has no CarMax/Carvana observation; uses three authorized-dealer/CPO records |
| Source registry URL syntax | **PASS** | All 87 source URLs are absolute HTTP(S) links with access dates. URLs were opened during live web research; the code container has no outbound DNS for an independent recheck. |
| Configuration versions and hashes | **PASS** | Scoring model validates to 100 points; input and scorecard hashes match frozen files. |
| Ranking and recommendation lock | **PASS** | Official ranking, locked recommendation hash, deterministic seed and risk-averse reversal all reproduce. |
| Prior human research embargo | **PASS** | MANUAL_RESEARCH.md was compared only after the independent recommendation was hashed and locked; the locked result remained unchanged. |
| Website static/accessibility basics | **PASS** | Local CSS/JS/images resolve, standalone assets are embedded, images have alt text, semantic navigation is present and JavaScript syntax passes. |
| Browser interaction and responsive layout | **PASS** | Editable and standalone DOMs render the recommendation, six cards, registries, sliders, dark mode and score details without console errors, broken images or mobile overflow. Managed Chromium blocked file/localhost navigation, so editable local assets were inlined in memory for an equivalent final-DOM exercise. |
| Narrative matches canonical data | **PASS** | Executive narrative and embedded site data match the locked recommendation, eligibility and score. |
| ZIP package integrity | **PASS** | All site and analysis ZIP packages pass CRC integrity checks. |

## Declared limitations

- Insurance is excluded from numeric TCO because comparable household VIN-specific quotes were not supplied.
- Q4 2026 prices and listing availability must be refreshed within 14 days of a transaction decision.
- Exact-address Sound Transit RTA applicability and registration require confirmation.
- VIN build date, campaign closure, service history, battery/charging tests, child-seat fit, dog/cargo fit and pre-purchase inspection remain physical purchase conditions.
- The code container has no outbound DNS; source URLs were accessed through the live web-research tool during evidence collection and were syntax-checked in QA.

## Corrections made during final QA

- Replaced the Honda Pilot dealer inventory-results URL with a direct exact CPO listing URL (`COR-0004`).
- Confirmed the editable site and standalone report render the same frozen recommendation and score data.
- Preserved sold/reserved listing status rather than presenting unavailable listings as active.

## Disposition

No failed gate remains.
