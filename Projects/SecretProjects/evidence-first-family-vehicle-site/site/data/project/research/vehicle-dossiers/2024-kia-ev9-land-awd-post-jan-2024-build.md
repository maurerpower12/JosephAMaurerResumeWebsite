# 2024 Kia EV9 Land AWD (post-Jan. 2024 build) — standardized research dossier

**Vehicle ID:** `VEH-KIA-EV9-2024-LAND-AWD-POSTJAN24`  
**Eligibility:** `conditional_pass`  
**Official frozen score:** **80.2/100**  
**Configuration condition:** Build after January 2024; all recall/ICCU/cluster/seat-bolt campaigns closed; battery health and charging verified.

## 1. Exact configuration and pricing
The scored configuration is a used 2024 Kia EV9 Land with AWD and a electric powertrain. The normalized acquisition range is $44,240–$48,291, with $46,112 used for the official score. Confidence is **medium**. The score references price records PRC-0016, PRC-0017, PRC-0018.

- [Kia of Cerritos — $46,112, 14956 miles, available](https://www.kiacerritos.com/inventory/certified-used-2024-kia-ev9-land-awd-4d-sport-utility-kndadfs54r6029435/) — VIN KNDADFS54R6029435, retrieved 2026-08-24.
- [Kia Santa Monica — $44,240, 17361 miles, sold](https://www.kiasantamonica.com/auto/preowned-2024-kia-ev9-land-near-los-angeles-ca/121571693/) — VIN KNDADFS58R6035478, retrieved 2026-08-24.
- [Towbin Kia — $48,291, 18879 miles, sold](https://www.towbinkia.com/inventory/certified-used-2024-kia-ev9-land-awd-4d-sport-utility-kndadfs53r6028891/) — VIN KNDADFS53R6028891, retrieved 2026-08-24.

## 2. Safety and crash avoidance
The configuration records **5 NHTSA stars** and **Top Safety Pick** from IIHS. The safety category score is **23.0/25**. Any build-date restriction remains a binary VIN-level condition. Sources: [SRC-0006](https://www.iihs.org/ratings/vehicle/kia/ev9/2024), [SRC-0018](https://www.nhtsa.gov/vehicle/2024/KIA/EV9/SUV/AWD), [SRC-0023](https://www.drivedata.org/car-safety-ratings/l/1135/kia-ev9-2024).

## 3. LATCH, child-seat access, and family usability
Row 2 has 2 complete LATCH positions and row 3 has 2. IIHS/owner-manual applicability is encoded in claim IDs attached to the scorecard. Online evidence cannot establish whether the family's exact seats preserve third-row access; that must be physically tested.

## 4. Passenger and cargo practicality
Third-row legroom is 30.8 inches and the real-world classification is `adult_usable_for_extended_trip`. Cargo behind row 3 is 20.2 cu ft. Passenger-space score: **8.0/10**. Cargo score: **8.2/10**.

## 5. Reliability, recalls, investigations, campaigns, and technical-service patterns
First model year with a strong recurring electrical/ICCU/12V and display complaint pattern; this is the decisive ownership risk. Reliability score: **1.0/10**. Classification: predicted/measured `below_average`, platform `first_year_platform_or_powertrain`, campaigns `multiple_material_or_unresolved_issues`, owner pattern `strong_recurring_material_issue`. Complaint counts are not interpreted as failure rates.

## 6. Owner sentiment with duplicated stories removed
Owner evidence is used only for recurring-pattern classification and is cross-checked against recall/campaign evidence. The surviving pattern is `strong_recurring_material_issue`. Confidence remains medium or low where evidence is indirect; no isolated story changes eligibility or score.

## 7. Fuel or energy use
Modeled annual energy cost is **$673** at 8,000 miles/year. Energy score: **10.0/10**. Formula and claim IDs are recorded in `analysis/tco-model.json`.

## 8. EV charging and route practicality, where applicable
Home Level 2 charging is already installed. The model uses 90% home and 10% public DC fast charging, 90% wall-to-battery efficiency, and current local rate assumptions. Snoqualmie Pass use requires an actual cold-weather route plan and charging test.

## 9. Maintenance, tires, consumables, and repair exposure
The planning model includes maintenance, repairs, tires/consumables, registration/RTA allowance, tax, fees and residual value. Insurance is excluded numerically without comparable household quotes. Base TCO is **$52,239 over five years** and **$81,326 over ten years**.

## 10. Depreciation and resale uncertainty
Residual-value assumptions are low-confidence planning inputs, not forecasts. Low/base/high TCO scenarios vary purchase price and residual fraction, and uncertainty simulation perturbs both. Rapid first-owner depreciation can benefit a used buyer while still increasing ten-year resale uncertainty.

## 11. Insurance risk, without fabricating exact quotes
No exact premium is modeled. Obtain same-day VIN-specific quotes from the household's insurer for every finalist. A material premium gap is an explicit recommendation-reversal condition.

## 12. Technology and daily experience
Technology score: **4.5/5**. Comfort score: **5.0/5**. Verified feature inputs are expanded component-by-component in `analysis/scorecard.json`; physical controls, camera usefulness, alerts and interface latency require a test drive.

## 13. Warranty and service access
Verify original in-service date, remaining transferable warranty, CPO coverage, roadside benefits, nearby qualified service access and all completed campaigns on the exact VIN. Do not infer coverage from model year alone.

## 14. Adversarial regret case
**Most plausible five-year regret:** Electrical downtime, charging faults or rapid residual-value erosion overwhelm the efficiency and packaging advantages.

Evidence supporting that concern is carried in the reliability, price and TCO claims. Counterevidence is the vehicle's verified strengths and the absence of an exclusion-level defect pattern under the configured standard.

## 15. Decision-changing facts
- Advance reason: Best combination of verified safety, space, energy cost, family LATCH coverage and used-value depreciation.
- Major concern: First-year reliability and electrical/ICCU campaign burden are materially worse than the alternatives.
- Evidence that would eliminate it: Pre-February build, incomplete campaigns, repeat 12V/ICCU symptoms, poor battery health, unreliable home charging or unacceptable insurance quote.

## 16. Online unknowns that require physical validation
- Verify build date and campaign closure in Kia service system
- Run Level 2 and DC fast-charge tests
- Obtain battery state-of-health report
- Load stroller/dog/travel kit
- Obtain exact insurance quote

## 17. Confidence and evidence gaps
Overall score evidence confidence is **low**. Pricing is time-sensitive; qualitative reliability and repair inputs carry more uncertainty than safety ratings and official dimensions. The score is provisional for the exact qualifying configuration and is not purchase authorization.

## Traceability pointers
- Scorecard: `analysis/scorecard.json`
- TCO: `analysis/tco-model.json`
- Claim registry: `evidence/claims.json`
- Source registry: `evidence/sources.json`
- Price records: `evidence/price-records.json`
- Price record IDs: PRC-0016, PRC-0017, PRC-0018
