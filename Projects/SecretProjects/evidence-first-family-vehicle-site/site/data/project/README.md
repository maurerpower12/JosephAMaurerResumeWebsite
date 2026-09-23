# Evidence-First Family Vehicle Research Package

Run `RUN-FVR-20260824-001` evaluates a used family vehicle purchase for ZIP 98038 with an exact-year safety/LATCH/cargo/AWD/price gate, deterministic 100-point scoring, direct used-listing evidence, five- and ten-year TCO, sensitivity analysis and a local client site.

## Current result
- Recommendation: **2024 Kia EV9 Land AWD (post-Jan. 2024 build)**
- Eligibility: **conditional_pass**
- Frozen score: **80.2/100**
- Runner-up: **2024 Kia Telluride SX Prestige X-Pro AWD**
- Independent recommendation was locked before `MANUAL_RESEARCH.md` was opened.

## Open the site
Open `site/index.html` locally. It has no CDN, external CSS or external JavaScript dependency. The standalone version is `reports/client-report-self-contained.html`.

## Reproduce
```bash
python scripts/initialize_run.py
python scripts/build_evidence.py
python scripts/compute_analysis.py
python scripts/compare_manual.py
python scripts/build_reports_site.py
python scripts/qa_package.py
```

The scripts use frozen researched inputs in `scripts/project_data.py`. Refresh time-sensitive sources and listing records before a real transaction.

## Structure
- `config/` authoritative and normalized configuration
- `evidence/` source, claim, contradiction, correction and price registries
- `research/` query log, candidate universe and standardized dossiers
- `analysis/` eligibility, scorecard, TCO, sensitivity, uncertainty and judgments
- `decisions/` eliminations, ledger and locked recommendation
- `checklists/` client test-drive and pre-purchase workflows
- `reports/` narrative, comparison, standalone site and QA
- `site/` editable local client website and downloadable data

## Critical limitation
This package is a test-drive and due-diligence slate, not purchase authorization. VIN/build applicability, recalls/campaigns, service history, insurance, child-seat fit, cargo, comfort, charging and inspection can override the internet result.
