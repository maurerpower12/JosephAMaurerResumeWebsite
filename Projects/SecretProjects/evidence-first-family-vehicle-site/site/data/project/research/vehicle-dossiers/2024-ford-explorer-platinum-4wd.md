# 2024 Ford Explorer Platinum 4WD — standardized research dossier

**Vehicle ID:** `VEH-FORD-EXPLORER-2024-PLATINUM-4WD`  
**Eligibility:** `pass`  
**Official frozen score:** **65.3/100**  
**Configuration condition:** Verify exact engine, feature content and recall closure by VIN.

## 1. Exact configuration and pricing
The scored configuration is a used 2024 Ford Explorer Platinum with 4WD and a gas powertrain. The normalized acquisition range is $40,590–$44,998, with $42,500 used for the official score. Confidence is **medium**. The score references price records PRC-0010, PRC-0011, PRC-0012.

- [CarMax — $44,998, 15184 miles, unknown](https://www.carmax.com/car/29064605) — VIN 1FM5K8HC8RGA01264, retrieved 2026-08-24.
- [Carvana — $40,590, 34686 miles, available](https://www.carvana.com/vehicle/4493520) — VIN not provided, retrieved 2026-08-24.
- [Spitzer Ford Hartville — $43,616, 16761 miles, sold](https://www.spitzerfordhartville.com/inventory/certified-used-2024-ford-explorer-platinum-4wd-4d-sport-utility-1fm5k8hc3rga84909/) — VIN 1FM5K8HC3RGA84909, retrieved 2026-08-24.

## 2. Safety and crash avoidance
The configuration records **5 NHTSA stars** and **Top Safety Pick+** from IIHS. The safety category score is **20.0/25**. Any build-date restriction remains a binary VIN-level condition. Sources: [SRC-0004](https://www.iihs.org/ratings/vehicle/ford/explorer-4-door-suv/2024), [SRC-0016](https://www.nhtsa.gov/vehicle/2024/FORD/EXPLORER/SUV/4WD), [SRC-0027](https://media.ford.com/content/dam/fordmedia/North%20America/US/product/2024/explorer/2024-Ford-Explorer-Tech-Specs.pdf).

## 3. LATCH, child-seat access, and family usability
Row 2 has 2 complete LATCH positions and row 3 has 2. IIHS/owner-manual applicability is encoded in claim IDs attached to the scorecard. Online evidence cannot establish whether the family's exact seats preserve third-row access; that must be physically tested.

## 4. Passenger and cargo practicality
Third-row legroom is 32.2 inches and the real-world classification is `adult_usable_for_short_trip`. Cargo behind row 3 is 18.2 cu ft. Passenger-space score: **6.5/10**. Cargo score: **6.2/10**.

## 5. Reliability, recalls, investigations, campaigns, and technical-service patterns
Mature generation but meaningful recall and repair-cost exposure; no single pattern met the exclusion threshold. Reliability score: **5.0/10**. Classification: predicted/measured `average_or_mixed`, platform `established_platform_and_powertrain_3plus_years`, campaigns `multiple_material_or_unresolved_issues`, owner pattern `moderate_recurring_issue`. Complaint counts are not interpreted as failure rates.

## 6. Owner sentiment with duplicated stories removed
Owner evidence is used only for recurring-pattern classification and is cross-checked against recall/campaign evidence. The surviving pattern is `moderate_recurring_issue`. Confidence remains medium or low where evidence is indirect; no isolated story changes eligibility or score.

## 7. Fuel or energy use
Modeled annual energy cost is **$2,105** at 8,000 miles/year. Energy score: **3.5/10**. Formula and claim IDs are recorded in `analysis/tco-model.json`.

## 8. EV charging and route practicality, where applicable
Not applicable as a plug-in charging workflow. Winter pass travel still requires tire, traction and fuel-range planning.

## 9. Maintenance, tires, consumables, and repair exposure
The planning model includes maintenance, repairs, tires/consumables, registration/RTA allowance, tax, fees and residual value. Insurance is excluded numerically without comparable household quotes. Base TCO is **$56,319 over five years** and **$97,146 over ten years**.

## 10. Depreciation and resale uncertainty
Residual-value assumptions are low-confidence planning inputs, not forecasts. Low/base/high TCO scenarios vary purchase price and residual fraction, and uncertainty simulation perturbs both. Rapid first-owner depreciation can benefit a used buyer while still increasing ten-year resale uncertainty.

## 11. Insurance risk, without fabricating exact quotes
No exact premium is modeled. Obtain same-day VIN-specific quotes from the household's insurer for every finalist. A material premium gap is an explicit recommendation-reversal condition.

## 12. Technology and daily experience
Technology score: **4.0/5**. Comfort score: **3.0/5**. Verified feature inputs are expanded component-by-component in `analysis/scorecard.json`; physical controls, camera usefulness, alerts and interface latency require a test drive.

## 13. Warranty and service access
Verify original in-service date, remaining transferable warranty, CPO coverage, roadside benefits, nearby qualified service access and all completed campaigns on the exact VIN. Do not infer coverage from model year alone.

## 14. Adversarial regret case
**Most plausible five-year regret:** Depreciation and repair costs erase the attractive purchase price while the child-seat anchors remain frustrating.

Evidence supporting that concern is carried in the reliability, price and TCO claims. Counterevidence is the vehicle's verified strengths and the absence of an exclusion-level defect pattern under the configured standard.

## 15. Decision-changing facts
- Advance reason: Excellent IIHS crashworthiness and useful cargo at an accessible used price.
- Major concern: Higher long-horizon repair/depreciation exposure and only Acceptable LATCH ease of use.
- Evidence that would eliminate it: Difficult car-seat installation, poor ride, open recalls or service history indicating repeat electrical/powertrain work.

## 16. Online unknowns that require physical validation
- Install both child seats and inspect buckle/anchor access
- Evaluate ride on rough pavement
- Verify third-row power fold and cargo-floor operation

## 17. Confidence and evidence gaps
Overall score evidence confidence is **low**. Pricing is time-sensitive; qualitative reliability and repair inputs carry more uncertainty than safety ratings and official dimensions. The score is provisional for the exact qualifying configuration and is not purchase authorization.

## Traceability pointers
- Scorecard: `analysis/scorecard.json`
- TCO: `analysis/tco-model.json`
- Claim registry: `evidence/claims.json`
- Source registry: `evidence/sources.json`
- Price records: `evidence/price-records.json`
- Price record IDs: PRC-0010, PRC-0011, PRC-0012
