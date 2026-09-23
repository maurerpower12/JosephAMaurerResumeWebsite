# Evidence-First Family Vehicle Research Report

**Run:** `RUN-FVR-20260824-001`  
**Date:** 2026-08-24  
**Market:** United States, home ZIP 98038  
**Mode:** Portfolio, used vehicles, frozen model years 2023–2025  
**Independent recommendation consulted manual research before lock:** **No**  
**Manual comparison completed after lock:** **Yes**

## Executive decision
The current evidence-based recommendation is the **2024 Kia EV9 Land AWD (post-Jan. 2024 build)**, with a **conditional-pass** eligibility status and a frozen deterministic score of **80.2/100**. It is not a purchase authorization. It is the first vehicle to test because it combines strong safety, family packaging, low modeled energy cost and used-market value, while carrying the most serious first-model-year electrical/ICCU risk in the finalist group.

The runner-up is the **2024 Kia Telluride SX Prestige X-Pro AWD** at **75.7/100**. The family-utility alternative is the **2024 Toyota Sienna Platinum AWD** at **72.8/100**. The **2024 Nissan Pathfinder Platinum 4WD (post-Nov. 2023 build)** remains live if a finalist fails its VIN/build/fit gates.

## What this analysis is and is not
This is a reproducible internet-research and planning model. It enforces exact-year hard filters, links scored inputs to claim IDs and source IDs, uses code for interpolation/TCO/sorting/simulation, and exposes uncertainty. It does not replace a VIN check, build-date check, recall/campaign verification, inspection, battery/charging test, insurance quote, child-seat installation, cargo load test or test drive.

## Input freeze and assumptions
- Purchase: used, cash, Q4 2026; soft anchor $65,000, hard vehicle-price ceiling $80,000.
- Household: two adults, children about 3 and 1, two child seats, medium dog; 2025 Mach-E retained.
- Driving: 8,000 miles/year base, 6,000–9,000 range, 70% city, 30% highway, occasional Snoqualmie Pass travel.
- EV: existing Level 2 charging; 90% home and 10% public DC fast charging.
- Ownership: ten-year primary horizon, five-year flag.
- Scope conflict: research config admitted 2022, scoring config started at 2023. The run conservatively froze the intersection, 2023–2025, without changing the source files.
- Used-price rule: the project-specific used-market override controls the official purchase-price score; this is recorded in the judgment and decision logs.
- Insurance: excluded numerically because actual comparable quotes were not supplied.

## Configuration validation
The category maximums total **100**. Component maximums and interpolation anchors were validated before scoring. Scoring config version `1.0`, hash `fc272125f893609c0ccfb0e96b2b24f93bedeae74ae90ae3748e85f07bca3c22`.

## Research funnel
- Candidate universe: **25** vehicles.
- Low-cost hard-filter eliminations: **16**.
- Deep-researched configurations: **6**.
- Finalists: **3**, plus one live alternate.
- Queries logged: **60**.
- Sources registered: **87**.
- Claims registered: **439**.

## Official deterministic ranking
| Rank | Vehicle | Eligibility | Score / 100 | Interpretation |
|---:|---|---|---:|---|
| 1 | 2024 Kia EV9 Land AWD (post-Jan. 2024 build) | conditional_pass | 80.2 | Excellent fit |
| 2 | 2024 Kia Telluride SX Prestige X-Pro AWD | pass | 75.7 | Strong fit |
| 3 | 2024 Toyota Sienna Platinum AWD | pass | 72.8 | Strong fit |
| 4 | 2024 Nissan Pathfinder Platinum 4WD (post-Nov. 2023 build) | conditional_pass | 70.7 | Strong fit |
| 5 | 2024 Ford Explorer Platinum 4WD | pass | 65.3 | Viable with meaningful compromises |
| 6 | 2024 Honda Pilot Elite AWD | pass | 64.7 | Viable with meaningful compromises |

The official score gap between EV9 and Telluride is 4.5 points, above the 2-point practical-tie threshold. Uncertainty still matters because the EV9's risk is concentrated in low-confidence reliability/repair/residual inputs and transaction-level stop conditions.

## Requirements pass/fail matrix
| Vehicle | Overall | 3rd row | NHTSA | IIHS | R2 LATCH | R3 LATCH | Cargo | AWD/4WD | Price | Reliability gate |
|---|---|---|---|---|---|---|---|---|---|---|
| 2024 Honda Pilot Elite AWD | pass | pass | pass | pass | pass | pass | pass | pass | pass | pass |
| 2024 Kia Telluride SX Prestige X-Pro AWD | pass | pass | pass | pass | pass | pass | pass | pass | pass | pass |
| 2024 Hyundai Palisade Calligraphy AWD | conditional_pass | pass | pass | pass | pass | pass | pass | pass | conditional_pass | unresolved |
| 2024 Volkswagen Atlas SEL Premium R-Line 4MOTION AWD | fail | not_researched_after_failure | not_researched_after_failure | not_researched_after_failure | not_researched_after_failure | fail | not_researched_after_failure | not_researched_after_failure | not_researched_after_failure | not_researched_after_failure |
| 2024 Nissan Pathfinder Platinum 4WD | conditional_pass | pass | pass | conditional_pass | pass | pass | pass | pass | pass | pass |
| 2024 Subaru Ascent Touring AWD | pass | pass | pass | pass | pass | pass | pass | pass | conditional_pass | unresolved |
| 2024 Ford Explorer Platinum 4WD | pass | pass | pass | pass | pass | pass | pass | pass | pass | pass |
| 2024 Buick Enclave Avenir AWD | fail | not_researched_after_failure | not_researched_after_failure | fail | not_researched_after_failure | not_researched_after_failure | not_researched_after_failure | not_researched_after_failure | not_researched_after_failure | not_researched_after_failure |
| 2024 Toyota Sienna Platinum AWD | pass | pass | pass | pass | pass | pass | pass | pass | pass | pass |
| 2024 Chrysler Pacifica Limited AWD | conditional_pass | pass | pass | pass | pass | pass | pass | pass | conditional_pass | unresolved |
| 2024 Kia EV9 Land AWD | conditional_pass | pass | pass | conditional_pass | pass | pass | pass | pass | pass | pass |
| 2024 Acura MDX Advance SH-AWD | fail | not_researched_after_failure | fail | not_researched_after_failure | not_researched_after_failure | not_researched_after_failure | not_researched_after_failure | not_researched_after_failure | not_researched_after_failure | not_researched_after_failure |
| 2024 Lincoln Aviator Reserve AWD | fail | not_researched_after_failure | not_researched_after_failure | fail | not_researched_after_failure | not_researched_after_failure | not_researched_after_failure | not_researched_after_failure | not_researched_after_failure | not_researched_after_failure |
| 2024 GMC Acadia Denali AWD | fail | not_researched_after_failure | not_researched_after_failure | fail | not_researched_after_failure | not_researched_after_failure | not_researched_after_failure | not_researched_after_failure | not_researched_after_failure | not_researched_after_failure |
| 2024 Chevrolet Traverse Z71 AWD | fail | not_researched_after_failure | not_researched_after_failure | fail | not_researched_after_failure | not_researched_after_failure | not_researched_after_failure | not_researched_after_failure | not_researched_after_failure | not_researched_after_failure |
| 2024 Toyota Grand Highlander Hybrid Limited AWD | fail | not_researched_after_failure | not_researched_after_failure | fail | not_researched_after_failure | not_researched_after_failure | not_researched_after_failure | not_researched_after_failure | not_researched_after_failure | not_researched_after_failure |
| 2024 Toyota Highlander Hybrid Platinum AWD | fail | not_researched_after_failure | not_researched_after_failure | not_researched_after_failure | not_researched_after_failure | fail | not_researched_after_failure | not_researched_after_failure | not_researched_after_failure | not_researched_after_failure |
| 2024 Mazda CX-90 PHEV Premium Plus AWD | fail | not_researched_after_failure | not_researched_after_failure | not_researched_after_failure | not_researched_after_failure | not_researched_after_failure | fail | not_researched_after_failure | not_researched_after_failure | not_researched_after_failure |
| 2024 Volvo XC90 Recharge Plus AWD | fail | not_researched_after_failure | not_researched_after_failure | not_researched_after_failure | not_researched_after_failure | not_researched_after_failure | fail | not_researched_after_failure | not_researched_after_failure | not_researched_after_failure |
| 2024 Audi Q7 Prestige quattro AWD | fail | not_researched_after_failure | not_researched_after_failure | not_researched_after_failure | not_researched_after_failure | not_researched_after_failure | fail | not_researched_after_failure | not_researched_after_failure | not_researched_after_failure |
| 2024 Infiniti QX60 Autograph AWD | fail | not_researched_after_failure | not_researched_after_failure | not_researched_after_failure | not_researched_after_failure | not_researched_after_failure | fail | not_researched_after_failure | not_researched_after_failure | not_researched_after_failure |
| 2024 Hyundai Santa Fe Calligraphy AWD | fail | not_researched_after_failure | not_researched_after_failure | not_researched_after_failure | not_researched_after_failure | not_researched_after_failure | fail | not_researched_after_failure | not_researched_after_failure | not_researched_after_failure |
| 2024 Mitsubishi Outlander PHEV SEL Premium S-AWC | fail | not_researched_after_failure | not_researched_after_failure | not_researched_after_failure | not_researched_after_failure | not_researched_after_failure | fail | not_researched_after_failure | not_researched_after_failure | not_researched_after_failure |
| 2024 Jeep Grand Cherokee L Summit 4x4 | fail | not_researched_after_failure | not_researched_after_failure | fail | not_researched_after_failure | not_researched_after_failure | not_researched_after_failure | not_researched_after_failure | not_researched_after_failure | not_researched_after_failure |
| 2024 Rivian R1S Dual-Motor AWD | fail | not_researched_after_failure | fail | not_researched_after_failure | not_researched_after_failure | not_researched_after_failure | not_researched_after_failure | not_researched_after_failure | not_researched_after_failure | not_researched_after_failure |

`not_researched_after_failure` means the run stopped expensive work after a definitive failure, as required; it does not mean the vehicle failed every unresearched field.

## Finalist rationale
### 1. 2024 Kia EV9 Land AWD (post-Jan. 2024 build)
- **Why first:** Highest frozen deterministic score, driven by safety, space, energy cost and used-market value; the conclusion remains conditional because first-year electrical/ICCU risk is materially worse than the alternatives.
- **Main compromise:** First-year reliability and electrical/ICCU campaign burden are materially worse than the alternatives.
- **Adversarial regret case:** Electrical downtime, charging faults or rapid residual-value erosion overwhelm the efficiency and packaging advantages.
- **Stop conditions:** Certification label does not satisfy the IIHS build-date condition., Any recall, ICCU, cluster or seat-bolt campaign remains open., Service history shows repeated 12-volt, ICCU, charging or display failures without durable resolution., Battery state-of-health, Level 2 charging or DC fast-charging test is unsatisfactory., Household insurance quote erases the modeled cost advantage., Physical car-seat, dog and cargo test fails.

### 2. 2024 Kia Telluride SX Prestige X-Pro AWD
- **Why it advances:** Strongest verified safety package and excellent family equipment at a moderate used price.
- **Main compromise:** Recall load and recurring electrical/trim complaints create used-VIN risk.
- **Adversarial regret case:** A recurring electrical fault or recall-related downtime makes the attractive feature set feel fragile.

### 3. 2024 Toyota Sienna Platinum AWD
- **Why it advances:** Best physical family utility and hybrid efficiency in the funnel.
- **Main compromise:** High used price and a Marginal updated moderate-overlap result reduce its safety score.
- **Adversarial regret case:** The family pays a scarcity premium and later wishes it had chosen an SUV with stronger current crash-test results.

## Five- and ten-year TCO scenarios
| Vehicle | 5y low | 5y base | 5y high | 10y low | 10y base | 10y high |
|---|---:|---:|---:|---:|---:|---:|
| 2024 Toyota Sienna Platinum AWD | $37,474 | $48,224 | $61,584 | $69,051 | $83,376 | $102,108 |
| 2024 Kia Telluride SX Prestige X-Pro AWD | $40,202 | $51,102 | $61,561 | $71,309 | $88,166 | $106,180 |
| 2024 Honda Pilot Elite AWD | $39,819 | $50,081 | $63,008 | $71,588 | $87,059 | $107,508 |
| 2024 Ford Explorer Platinum 4WD | $46,047 | $56,319 | $68,471 | $80,199 | $97,146 | $119,024 |
| 2024 Nissan Pathfinder Platinum 4WD (post-Nov. 2023 build) | $38,896 | $47,533 | $56,801 | $66,773 | $80,660 | $96,965 |
| 2024 Kia EV9 Land AWD (post-Jan. 2024 build) | $45,184 | $52,239 | $60,377 | $71,447 | $81,326 | $94,210 |

TCO includes acquisition price, modeled 9.1% sales tax, initial fees, energy, maintenance, repairs, tires/consumables, registration/RTA planning allowance and residual value. Insurance is separate and can reverse the recommendation. All formulas and claim IDs are in `analysis/tco-model.json`.

## Price evidence and direct links
- **2024 Toyota Sienna Platinum AWD** — score price $52,995; planning range $48,990–$58,990; base planning OTD $59,218; confidence medium.
  - [CarMax — $52,998](https://www.carmax.com/car/70145488), United States / delivery market, 37695 miles, VIN/stock 5TDCSKFC5RS140155, status `unknown`, retrieved 2026-08-24. Adjustments: [{"type": "rounding", "amount": -3, "reason": "Median planning estimate rounded across comparable set."}]
  - [Carvana — $53,990](https://www.carvana.com/vehicle/4618929), Online delivery, 44725 miles, VIN/stock not provided, status `sold`, retrieved 2026-08-24. Adjustments: [{"type": "mileage", "amount": -1500, "reason": "Higher-mile example normalized toward 20k-40k planning band."}]
  - [Toyota of Erie — $52,990](https://www.toyotaoferie.com/viewdetails/cpo/5tdeskfc3rs130913/2024-toyota-sienna-mini-van,-passenger), Erie, Pennsylvania, 30866 miles, VIN/stock 5TDESKFC3RS130913, status `unknown`, retrieved 2026-08-24. Adjustments: [{"type": "certification", "amount": -1000, "reason": "CPO premium separated when estimating a non-CPO base."}]
- **2024 Kia Telluride SX Prestige X-Pro AWD** — score price $41,990; planning range $38,998–$42,561; base planning OTD $47,051; confidence medium.
  - [CarMax — $38,998](https://www.carmax.com/car/70135597), United States / delivery market, 44445 miles, VIN/stock 5XYP5DGC1RG429114, status `unknown`, retrieved 2026-08-24. Adjustments: [{"type": "mileage", "amount": 1500, "reason": "High end of mileage band; upward normalization toward 25k-35k miles."}]
  - [Carvana — $41,990](https://www.carvana.com/vehicle/4553664), Online delivery, 29788 miles, VIN/stock not provided, status `sold`, retrieved 2026-08-24. Adjustments: []
  - [Transitowne Kia — $42,561](https://www.transitownewilliamsville.com/inventory/used-2024-kia-telluride-sx-prestige-x-pro-awd-sport-utility-5xyp5dgc0rg414720/), Williamsville, New York, 31250 miles, VIN/stock 5XYP5DGC0RG414720, status `sold`, retrieved 2026-08-24. Adjustments: [{"type": "seller_market", "amount": -500, "reason": "Normalize nonlocal dealer ask toward national delivery market."}]
- **2024 Honda Pilot Elite AWD** — score price $43,800; planning range $41,998–$47,590; base planning OTD $49,046; confidence medium_low.
  - [CarMax — $41,998](https://www.carmax.com/car/28666081), United States / delivery market, 42100 miles, VIN/stock 5FNYG1H85RB029703, status `unknown`, retrieved 2026-08-24. Adjustments: [{"type": "mileage", "amount": 1000, "reason": "Normalize toward mid-band mileage."}]
  - [Carvana — $47,590](https://www.carvana.com/vehicle/4558078), Online delivery, 12705 miles, VIN/stock not provided, status `reserved`, retrieved 2026-08-24. Adjustments: [{"type": "mileage", "amount": -2500, "reason": "Low-mile premium normalized toward expected 25k-35k purchase mileage."}]
  - [Germain Honda of College Hills — $43,000](https://www.germainhondaofcollegehills.com/inventory/certified-used-2024-honda-pilot-elite-awd-4d-sport-utility-5fnyg1h83rb033507/), Wooster, Ohio, 52740 miles, VIN/stock 5FNYG1H83RB033507, status `available`, retrieved 2026-08-24. Adjustments: [{"type": "mileage", "amount": 1500, "reason": "Normalize the 52,740-mile example toward the preferred 25,000-45,000-mile comparison band."}, {"type": "certification", "amount": -500, "reason": "Separate a modest Honda CPO premium from the normalized non-CPO acquisition estimate."}]
- **2024 Ford Explorer Platinum 4WD** — score price $42,500; planning range $40,590–$44,998; base planning OTD $47,588; confidence medium.
  - [CarMax — $44,998](https://www.carmax.com/car/29064605), United States / delivery market, 15184 miles, VIN/stock 1FM5K8HC8RGA01264, status `unknown`, retrieved 2026-08-24. Adjustments: [{"type": "mileage", "amount": -2000, "reason": "Low-mile premium adjustment."}]
  - [Carvana — $40,590](https://www.carvana.com/vehicle/4493520), Online delivery, 34686 miles, VIN/stock not provided, status `available`, retrieved 2026-08-24. Adjustments: []
  - [Spitzer Ford Hartville — $43,616](https://www.spitzerfordhartville.com/inventory/certified-used-2024-ford-explorer-platinum-4wd-4d-sport-utility-1fm5k8hc3rga84909/), Hartville, Ohio, 16761 miles, VIN/stock 1FM5K8HC3RGA84909, status `sold`, retrieved 2026-08-24. Adjustments: [{"type": "certification_and_mileage", "amount": -1500, "reason": "CPO and low-mile premium adjustment."}]
- **2024 Nissan Pathfinder Platinum 4WD (post-Nov. 2023 build)** — score price $36,998; planning range $35,998–$37,500; base planning OTD $41,545; confidence medium.
  - [CarMax — $36,998](https://www.carmax.com/car/70112041), United States / delivery market, 13557 miles, VIN/stock 5N1DR3DJXRC280416, status `unknown`, retrieved 2026-08-24. Adjustments: [{"type": "mileage", "amount": -1000, "reason": "Low-mile premium adjustment."}]
  - [CarMax — $35,998](https://www.carmax.com/car/28886620), United States / delivery market, 35267 miles, VIN/stock 5N1DR3DJ1RC239950, status `unknown`, retrieved 2026-08-24. Adjustments: []
  - [Nissan Certified seller — $37,500](https://www.nissanusa.com/shopping-tools/search-inventory/certified-pre-owned/vehicle-details/5N1DR3DK4RC234041), United States, mileage unavailable miles, VIN/stock 5N1DR3DK4RC234041, status `available`, retrieved 2026-08-24. Adjustments: [{"type": "missing_mileage", "amount": 0, "reason": "Mileage unavailable; lowers confidence."}]
- **2024 Kia EV9 Land AWD (post-Jan. 2024 build)** — score price $46,112; planning range $44,240–$48,291; base planning OTD $51,808; confidence medium.
  - [Kia of Cerritos — $46,112](https://www.kiacerritos.com/inventory/certified-used-2024-kia-ev9-land-awd-4d-sport-utility-kndadfs54r6029435/), Cerritos, California, 14956 miles, VIN/stock KNDADFS54R6029435, status `available`, retrieved 2026-08-24. Adjustments: []
  - [Kia Santa Monica — $44,240](https://www.kiasantamonica.com/auto/preowned-2024-kia-ev9-land-near-los-angeles-ca/121571693/), Santa Monica, California, 17361 miles, VIN/stock KNDADFS58R6035478, status `sold`, retrieved 2026-08-24. Adjustments: []
  - [Towbin Kia — $48,291](https://www.towbinkia.com/inventory/certified-used-2024-kia-ev9-land-awd-4d-sport-utility-kndadfs53r6028891/), Henderson, Nevada, 18879 miles, VIN/stock KNDADFS53R6028891, status `sold`, retrieved 2026-08-24. Adjustments: [{"type": "certification", "amount": -1000, "reason": "CPO premium adjustment."}]

Listings are retrieval-time observations. They must be refreshed within 14 days of a transaction decision; listings older than 30 days are stale for a final market calculation.

## Sensitivity and uncertainty
- Deterministic simulation seed: `20260824`; iterations: `5000`.
- EV9 probability of ranking first within modeled uncertainty: **92.7%**.
- Telluride probability of ranking first: **7.3%**.
- The risk-averse exploratory preset ranks Telluride first and EV9 fourth. This does not change the official frozen score; it defines a real preference threshold that can reverse the client decision.
- Value-first produces a practical cluster among EV9, Sienna, Telluride and Pathfinder, reinforcing the need to test physical fit and VIN quality.

## What changes the recommendation
- The recommended EV9 fails any build-date, campaign, service-history, battery-health, charging, insurance or physical-fit gate.
- A Telluride with all recalls closed and clean electrical history is available within the verified market range while the EV9 cannot clear its risk gates.
- The family prioritizes mature-platform dependability over efficiency strongly enough to adopt the risk-averse exploratory preset.
- The Sienna's physical packaging advantage proves decisive and its updated moderate-overlap result is acceptable to the family.
- A Q4 2026 transaction-price change materially alters purchase-price and TCO scores beyond the modeled ranges.

## Eliminations
- **2024 Volkswagen Atlas SEL Premium R-Line 4MOTION AWD** — `row3_complete_latch`: IIHS maps both third-row seats as tether-only, not complete lower-anchor-plus-tether positions. Claim: `CLM-0404`.
- **2024 Buick Enclave Avenir AWD** — `iihs_award`: No exact-year IIHS Top Safety Pick or Top Safety Pick+ award. Claim: `CLM-0415`.
- **2024 Acura MDX Advance SH-AWD** — `nhtsa_overall`: Exact SH-AWD variant is not rated; configured unrated policy is conditional-not-pass. Claim: `CLM-0426`.
- **2024 Lincoln Aviator Reserve AWD** — `iihs_award`: No qualifying exact-year IIHS award. Claim: `CLM-0427`.
- **2024 GMC Acadia Denali AWD** — `iihs_award`: No qualifying exact-year IIHS award. Claim: `CLM-0428`.
- **2024 Chevrolet Traverse Z71 AWD** — `iihs_award`: No qualifying exact-year IIHS award. Claim: `CLM-0429`.
- **2024 Toyota Grand Highlander Hybrid Limited AWD** — `iihs_award`: No qualifying exact-year IIHS award under the frozen gate. Claim: `CLM-0430`.
- **2024 Toyota Highlander Hybrid Platinum AWD** — `row3_complete_latch`: No complete lower-anchor-plus-tether position in row 3. Claim: `CLM-0431`.
- **2024 Mazda CX-90 PHEV Premium Plus AWD** — `cargo_behind_row3`: Published volume is below 16 cubic feet. Claim: `CLM-0432`.
- **2024 Volvo XC90 Recharge Plus AWD** — `cargo_behind_row3`: Published volume is approximately 15.8 cubic feet, below threshold. Claim: `CLM-0433`.
- **2024 Audi Q7 Prestige quattro AWD** — `cargo_behind_row3`: Published volume is below 16 cubic feet. Claim: `CLM-0434`.
- **2024 Infiniti QX60 Autograph AWD** — `cargo_behind_row3`: Published volume is below 16 cubic feet. Claim: `CLM-0435`.
- **2024 Hyundai Santa Fe Calligraphy AWD** — `cargo_behind_row3`: Published volume is below 16 cubic feet. Claim: `CLM-0436`.
- **2024 Mitsubishi Outlander PHEV SEL Premium S-AWC** — `cargo_behind_row3`: Third-row cargo and usability do not meet the configured threshold. Claim: `CLM-0437`.
- **2024 Jeep Grand Cherokee L Summit 4x4** — `iihs_award`: No qualifying exact-year IIHS award. Claim: `CLM-0438`.
- **2024 Rivian R1S Dual-Motor AWD** — `nhtsa_overall`: Exact AWD NHTSA overall score is not available; unrated is not a pass. Claim: `CLM-0439`.

Eliminated vehicles are not necessarily poor vehicles. They failed this family's frozen requirements, exact applicability rules or scope.

## Contradictions
- `CON-0001` — Project model-year scope: The scoring configuration was created for a broader later-year program.. Resolution: Use conservative intersection of authoritative inputs.; impact: 2022 vehicles excluded before discovery..
- `CON-0002` — Purchase-price score basis: Base scoring model includes new vehicles while this run is used-only.. Resolution: Apply the more specific used-only project rule and record the judgment.; impact: All official price scores reference PRC records rather than original MSRP..
- `CON-0003` — NHTSA dynamic page rendering: Website rendering/API presentation issue rather than a substantive rating conflict.. Resolution: Retain official URL, corroborate with mirror, and lower confidence one level where needed.; impact: Sienna, Telluride, Pathfinder and EV9 NHTSA claims remain usable with documented limitation..
- `CON-0004` — Live-listing status: Normal used-inventory turnover.. Resolution: Preserve observed price, mark status at recheck, reduce confidence, never imply current availability.; impact: All prices are planning estimates and must be refreshed within 14 days of purchase..

## Corrections recorded after human comparison
- `COR-0001` — Manual research: 2024 Atlas has two complete row-3 LATCH positions. → IIHS shows tether anchors but no row-3 lower anchors; zero complete row-3 LATCH positions under the project definition. Impact: Atlas fails eligibility and receives no score.
- `COR-0002` — Manual research: 2024 Acura MDX Advance SH-AWD has a five-star NHTSA overall rating. → The exact SH-AWD NHTSA page is unrated under the frozen exact-configuration rule. Impact: MDX fails eligibility and receives no score.
- `COR-0003` — Manual research included a 2026 Hyundai Ioniq 9 in a used 2022-2025 project. → The Ioniq 9 is outside the frozen 2023-2025 model-year intersection for this run. Impact: Not admitted to the candidate universe.
- `COR-0004` — PRC-0009 used an authorized-dealer inventory results URL rather than a direct vehicle-detail page. → PRC-0009 now uses a direct authorized Honda-dealer CPO URL for VIN 5FNYG1H83RB033507, with the exact listed vehicle price, mileage, stock number and fee treatment. Impact: No score or eligibility change. The replacement comparable remains consistent with the frozen planning range and improves auditability.

## Human-versus-AI comparison
The manual research was opened only after the independent recommendation file was saved and hashed. The locked result was not changed. The comparison agreed on Pilot plausibility, CX-90/XC90 cargo limitations and the importance of first-model-year EV risk. Material disagreements involved Atlas row-3 LATCH, exact MDX AWD NHTSA applicability, Ioniq 9 model-year scope and Grand Highlander safety eligibility. See `analysis/human-vs-ai-comparison.json`.

## Online unknowns requiring physical validation
- Exact VIN, build date, headlights/equipment and campaign closure.
- Both actual child seats installed while preserving third-row access.
- Stroller, dog equipment and travel load with row 3 raised.
- Comfort, rear HVAC, ride, noise, controls and driver-assistance behavior.
- VIN-specific insurance quote.
- EV battery state of health, Level 2 charging and DC fast charging.
- Independent pre-purchase inspection and complete service history.
- Actual Q4 2026 price and out-the-door terms.

## Traceability architecture
The audit path is maintained as: decision ledger → score ID → scoring rule → claim ID → source ID → query ID or human observation. Stable registries are in `decisions/decision-ledger.json`, `analysis/scorecard.json`, `evidence/claims.json`, `evidence/sources.json`, `research/query-log.json` and `analysis/human-observations.json`.

## Deliverable map
- Client site: `site/index.html`
- Self-contained report: `reports/client-report-self-contained.html`
- Scorecard: `analysis/scorecard.json`
- TCO: `analysis/tco-model.json`
- Sensitivity/simulation: `analysis/sensitivity.json`, `analysis/uncertainty-simulation.json`
- Recommendation: `decisions/recommendation.json`
- Dossiers: `research/vehicle-dossiers/`
- Test-drive and pre-purchase checklists: `checklists/`
- QA report: `reports/qa-report.md` (generated after final audit)
