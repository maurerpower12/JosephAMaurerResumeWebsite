# 2024 Toyota Sienna Platinum AWD — standardized research dossier

**Vehicle ID:** `VEH-TOYOTA-SIENNA-2024-PLATINUM-AWD`  
**Eligibility:** `pass`  
**Official frozen score:** **72.8/100**  
**Configuration condition:** Verify exact AWD Platinum configuration and open recalls by VIN.

## 1. Exact configuration and pricing
The scored configuration is a used 2024 Toyota Sienna Platinum with AWD and a hybrid powertrain. The normalized acquisition range is $48,990–$58,990, with $52,995 used for the official score. Confidence is **medium**. The score references price records PRC-0001, PRC-0002, PRC-0003.

- [CarMax — $52,998, 37695 miles, unknown](https://www.carmax.com/car/70145488) — VIN 5TDCSKFC5RS140155, retrieved 2026-08-24.
- [Carvana — $53,990, 44725 miles, sold](https://www.carvana.com/vehicle/4618929) — VIN not provided, retrieved 2026-08-24.
- [Toyota of Erie — $52,990, 30866 miles, unknown](https://www.toyotaoferie.com/viewdetails/cpo/5tdeskfc3rs130913/2024-toyota-sienna-mini-van,-passenger) — VIN 5TDESKFC3RS130913, retrieved 2026-08-24.

## 2. Safety and crash avoidance
The configuration records **5 NHTSA stars** and **Top Safety Pick** from IIHS. The safety category score is **13.0/25**. Any build-date restriction remains a binary VIN-level condition. Sources: [SRC-0001](https://www.iihs.org/ratings/vehicle/toyota/sienna-minivan/2024), [SRC-0013](https://www.nhtsa.gov/vehicle/2024/Toyota/Sienna%20Le%20Awd), [SRC-0020](https://www.drivedata.org/car-safety-ratings/l/1491/toyota-sienna-hybrid-2024).

## 3. LATCH, child-seat access, and family usability
Row 2 has 3 complete LATCH positions and row 3 has 2. IIHS/owner-manual applicability is encoded in claim IDs attached to the scorecard. Online evidence cannot establish whether the family's exact seats preserve third-row access; that must be physically tested.

## 4. Passenger and cargo practicality
Third-row legroom is 38.7 inches and the real-world classification is `adult_usable_for_extended_trip`. Cargo behind row 3 is 33.5 cu ft. Passenger-space score: **9.0/10**. Cargo score: **9.0/10**.

## 5. Reliability, recalls, investigations, campaigns, and technical-service patterns
Mature Toyota hybrid platform; complaints exist but no material recurring pattern sufficient for exclusion. Reliability score: **8.0/10**. Classification: predicted/measured `above_average`, platform `established_platform_and_powertrain_3plus_years`, campaigns `minor_or_resolved_pattern`, owner pattern `no_meaningful_recurring_pattern`. Complaint counts are not interpreted as failure rates.

## 6. Owner sentiment with duplicated stories removed
Owner evidence is used only for recurring-pattern classification and is cross-checked against recall/campaign evidence. The surviving pattern is `no_meaningful_recurring_pattern`. Confidence remains medium or low where evidence is indirect; no isolated story changes eligibility or score.

## 7. Fuel or energy use
Modeled annual energy cost is **$1,161** at 8,000 miles/year. Energy score: **7.8/10**. Formula and claim IDs are recorded in `analysis/tco-model.json`.

## 8. EV charging and route practicality, where applicable
Not applicable as a plug-in charging workflow. Winter pass travel still requires tire, traction and fuel-range planning.

## 9. Maintenance, tires, consumables, and repair exposure
The planning model includes maintenance, repairs, tires/consumables, registration/RTA allowance, tax, fees and residual value. Insurance is excluded numerically without comparable household quotes. Base TCO is **$48,224 over five years** and **$83,376 over ten years**.

## 10. Depreciation and resale uncertainty
Residual-value assumptions are low-confidence planning inputs, not forecasts. Low/base/high TCO scenarios vary purchase price and residual fraction, and uncertainty simulation perturbs both. Rapid first-owner depreciation can benefit a used buyer while still increasing ten-year resale uncertainty.

## 11. Insurance risk, without fabricating exact quotes
No exact premium is modeled. Obtain same-day VIN-specific quotes from the household's insurer for every finalist. A material premium gap is an explicit recommendation-reversal condition.

## 12. Technology and daily experience
Technology score: **2.5/5**. Comfort score: **4.0/5**. Verified feature inputs are expanded component-by-component in `analysis/scorecard.json`; physical controls, camera usefulness, alerts and interface latency require a test drive.

## 13. Warranty and service access
Verify original in-service date, remaining transferable warranty, CPO coverage, roadside benefits, nearby qualified service access and all completed campaigns on the exact VIN. Do not infer coverage from model year alone.

## 14. Adversarial regret case
**Most plausible five-year regret:** The family pays a scarcity premium and later wishes it had chosen an SUV with stronger current crash-test results.

Evidence supporting that concern is carried in the reliability, price and TCO claims. Counterevidence is the vehicle's verified strengths and the absence of an exclusion-level defect pattern under the configured standard.

## 15. Decision-changing facts
- Advance reason: Best physical family utility and hybrid efficiency in the funnel.
- Major concern: High used price and a Marginal updated moderate-overlap result reduce its safety score.
- Evidence that would eliminate it: Physical test reveals unacceptable seating comfort or safety priorities make the Marginal test result non-negotiable.

## 16. Online unknowns that require physical validation
- Fit both installed child seats while preserving third-row access
- Load stroller, dog equipment and travel luggage with row 3 raised
- Confirm second-row ottoman/rail geometry works with chosen car seats

## 17. Confidence and evidence gaps
Overall score evidence confidence is **low**. Pricing is time-sensitive; qualitative reliability and repair inputs carry more uncertainty than safety ratings and official dimensions. The score is provisional for the exact qualifying configuration and is not purchase authorization.

## Traceability pointers
- Scorecard: `analysis/scorecard.json`
- TCO: `analysis/tco-model.json`
- Claim registry: `evidence/claims.json`
- Source registry: `evidence/sources.json`
- Price records: `evidence/price-records.json`
- Price record IDs: PRC-0001, PRC-0002, PRC-0003
