
(() => {
  const dataNode = document.getElementById('report-data');
  const DATA = JSON.parse(dataNode.textContent);
  const $ = (s, c=document) => c.querySelector(s);
  const $$ = (s, c=document) => [...c.querySelectorAll(s)];
  const fmtMoney = n => n == null ? '—' : new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',maximumFractionDigits:0}).format(n);
  const esc = s => String(s ?? '').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]));
  const status = s => `<span class="status-${esc(s)}">${esc(String(s).replaceAll('_',' '))}</span>`;
  const scoreById = Object.fromEntries(DATA.scorecard.vehicles.map(v=>[v.vehicle_id,v]));
  const tcoById = Object.fromEntries(DATA.tco.vehicles.map(v=>[v.vehicle_id,v]));
  const vehicleMeta = DATA.vehicle_metadata;

  // Theme.
  const saved = localStorage.getItem('fvr-theme');
  if(saved === 'dark' || (!saved && matchMedia('(prefers-color-scheme:dark)').matches)) document.body.classList.add('dark');
  $('#theme-toggle').addEventListener('click',()=>{document.body.classList.toggle('dark');localStorage.setItem('fvr-theme',document.body.classList.contains('dark')?'dark':'light')});
  $('#print-button').addEventListener('click',()=>window.print());

  // Hero.
  const rec = DATA.recommendation.current_recommendation;
  $('#hero-title').textContent = rec.vehicle;
  $('#hero-score').textContent = rec.confirmed_score.toFixed(1);
  $('#hero-status').innerHTML = status(rec.eligibility_status);
  $('#hero-risk').textContent = rec.main_compromise;
  $('#metric-candidates').textContent = DATA.candidate_universe.candidates.length;
  $('#metric-claims').textContent = DATA.claims.claims.length;
  $('#metric-sources').textContent = DATA.sources.sources.length;
  $('#metric-sim').textContent = DATA.uncertainty.iterations.toLocaleString();

  // Funnel.
  $('#funnel').innerHTML = [
    ['Universe',DATA.candidate_universe.candidates.length,'Broad gas, hybrid, PHEV and EV set'],
    ['Hard-filtered',DATA.eliminations.eliminations.length,'Stopped after first definitive failure'],
    ['Deep research',DATA.scorecard.vehicles.length,'Standardized dossiers and pricing'],
    ['Finalists',DATA.recommendation.finalists.length,'Plus one live alternate']
  ].map(([a,b,c])=>`<article class="card"><div class="eyebrow">${esc(a)}</div><div class="score-big">${b}</div><p class="muted">${esc(c)}</p></article>`).join('');

  // Context cards.
  $('#context-grid').innerHTML = [
    ['Household','Two adults, two young children, two car seats and a medium dog.'],
    ['Purchase','Used, cash, Q4 2026, ZIP 98038; $80,000 hard vehicle-price ceiling.'],
    ['Driving','8,000 miles/year base, 70% city, occasional Snoqualmie Pass winter travel.'],
    ['Energy','Home Level 2 installed; EV model assumes 90% home and 10% public DC fast charging.'],
    ['Ownership','Ten-year primary horizon with a five-year TCO decision flag.'],
    ['Authority','The client—not the model—chooses the test-drive slate and purchase.']
  ].map(([h,p])=>`<article class="card"><h3>${h}</h3><p class="muted">${p}</p></article>`).join('');

  // Eligibility matrix.
  const reqOrder=['third_row','nhtsa_overall','iihs_award','row2_complete_latch','row3_complete_latch','cargo_behind_row3','awd_or_4wd','price_ceiling','model_year','reliability_exclusion'];
  const reqLabel={third_row:'3rd row',nhtsa_overall:'NHTSA',iihs_award:'IIHS',row2_complete_latch:'R2 LATCH',row3_complete_latch:'R3 LATCH',cargo_behind_row3:'Cargo',awd_or_4wd:'AWD/4WD',price_ceiling:'Price',model_year:'Year',reliability_exclusion:'Reliability'};
  $('#eligibility-head').innerHTML='<tr><th>Vehicle</th><th>Overall</th>'+reqOrder.map(r=>`<th>${reqLabel[r]}</th>`).join('')+'</tr>';
  $('#eligibility-body').innerHTML=DATA.eligibility.vehicles.map(v=>{const m=Object.fromEntries(v.requirements.map(r=>[r.requirement,r]));return `<tr><td><strong>${esc(v.vehicle)}</strong></td><td>${status(v.overall_status)}</td>${reqOrder.map(r=>`<td title="${esc(m[r]?.note||'')}">${status(m[r]?.status||'unknown')}</td>`).join('')}</tr>`}).join('');

  // Finalist and all deep cards.
  const simById=Object.fromEntries(DATA.uncertainty.vehicle_results.map(v=>[v.vehicle_id,v]));
  $('#vehicle-cards').innerHTML=DATA.scorecard.vehicles.map((v,i)=>{
    const meta=vehicleMeta[v.vehicle_id], t=tcoById[v.vehicle_id], sim=simById[v.vehicle_id];
    const cats=v.category_scores.map(c=>`<div class="category"><span>${esc(c.category.replaceAll('_',' '))}</span><div class="progress"><span style="width:${Math.min(100,c.confirmed_points/c.maximum_points*100)}%"></span></div><b>${c.confirmed_points.toFixed(1)}/${c.maximum_points}</b></div>`).join('');
    const components=v.component_scores.map(c=>`<details><summary>${esc(c.component.replaceAll('_',' '))} — ${c.points_awarded?.toFixed(2) ?? 'null'}/${c.maximum_points}</summary><div class="details-body"><div class="kvs"><div class="kv"><b>Input</b>${esc(typeof c.input_value==='object'?JSON.stringify(c.input_value):c.input_value)} ${esc(c.unit||'')}</div><div class="kv"><b>Confidence</b>${esc(c.evidence_confidence)}</div><div class="kv"><b>Rule</b>${esc(c.exact_scoring_rule)}</div><div class="kv"><b>Calculation</b>${esc(c.calculation)}</div><div class="kv"><b>Claim IDs</b>${c.claim_ids.map(id=>`<code>${esc(id)}</code>`).join(' ')}</div><div class="kv"><b>Score ID</b><code>${esc(c.score_id)}</code></div></div></div></details>`).join('');
    return `<article class="card flush vehicle-card" id="card-${esc(v.vehicle_id)}"><img src="${esc(DATA.image_map[v.vehicle_id])}" alt="Original neutral illustration of ${esc(v.vehicle)}"><div class="card-body"><div class="topline"><div><div class="eyebrow">Rank ${i+1} · ${esc(v.interpretation)}</div><h3>${esc(v.vehicle)}</h3></div><div class="rank">${i+1}</div></div><div class="badges"><span class="badge">${status(v.eligibility_gate)}</span><span class="badge"><strong>${v.confirmed_points.toFixed(1)}</strong>/100</span><span class="badge">5y ${fmtMoney(t.scenarios['5_year'].base.total_tco)}</span><span class="badge">10y ${fmtMoney(t.scenarios['10_year'].base.total_tco)}</span></div><p><strong>Advance case:</strong> ${esc(meta.advance_reason)}</p><p class="muted"><strong>Primary risk:</strong> ${esc(meta.major_concern)}</p><p class="small"><strong>Modeled rank-1 probability:</strong> ${(sim.probability_rank_1*100).toFixed(1)}% · <strong>90% score range:</strong> ${sim.p05.toFixed(1)}–${sim.p95.toFixed(1)}</p>${cats}<details><summary>Expand every scoring component and provenance</summary><div class="details-body">${components}</div></details><details><summary>Adversarial regret case and physical unknowns</summary><div class="details-body"><p><strong>Five-year regret case:</strong> ${esc(meta.regret_case)}</p><ul>${meta.physical_unknowns.map(x=>`<li>${esc(x)}</li>`).join('')}</ul></div></details></div></article>`;
  }).join('');

  // TCO table.
  $('#tco-body').innerHTML=DATA.tco.vehicles.map(v=>{const s=v.scenarios;return `<tr><td><strong>${esc(v.vehicle)}</strong><br><span class="small muted">Energy ${fmtMoney(v.annual_energy_cost_base)}/yr</span></td><td>${fmtMoney(s['5_year'].low.total_tco)}</td><td><strong>${fmtMoney(s['5_year'].base.total_tco)}</strong></td><td>${fmtMoney(s['5_year'].high.total_tco)}</td><td>${fmtMoney(s['10_year'].low.total_tco)}</td><td><strong>${fmtMoney(s['10_year'].base.total_tco)}</strong></td><td>${fmtMoney(s['10_year'].high.total_tco)}</td></tr>`}).join('');

  // Price evidence.
  $('#price-cards').innerHTML=DATA.price_summaries.map(ps=>`<article class="card"><h3>${esc(ps.vehicle)}</h3><div class="kvs"><div class="kv"><b>Official scoring price</b>${fmtMoney(ps.official_scoring_price)}</div><div class="kv"><b>Planning range</b>${fmtMoney(ps.low)}–${fmtMoney(ps.high)}</div><div class="kv"><b>Base OTD planning</b>${fmtMoney(ps.estimated_out_the_door.base)}</div><div class="kv"><b>Confidence</b>${esc(ps.confidence)}</div></div><p class="small muted">${esc(ps.otd_note)}</p>${ps.listings.map(p=>`<details><summary>${esc(p.seller_name)} · ${fmtMoney(p.listed_price)} · ${p.mileage==null?'mileage unavailable':p.mileage.toLocaleString()+' mi'}</summary><div class="details-body"><p><a href="${esc(p.source_url)}" target="_blank" rel="noopener">Open exact listing</a></p><div class="kvs"><div class="kv"><b>Location</b>${esc(p.seller_location)}</div><div class="kv"><b>Status at retrieval</b>${esc(p.listing_status_at_retrieval)}</div><div class="kv"><b>VIN / stock</b>${esc(p.vin||p.stock_number||'not provided')}</div><div class="kv"><b>Retrieved</b>${esc(p.retrieved_at)}</div><div class="kv"><b>Adjustments</b>${esc(JSON.stringify(p.normalization_adjustments||[]))}</div><div class="kv"><b>Price record</b>${esc(p.price_record_id)}</div></div></div></details>`).join('')}</article>`).join('');

  // Explorer sliders.
  const officialWeights=DATA.sensitivity.weight_presets.official;
  const categories=Object.keys(officialWeights);
  const sliderRoot=$('#slider-grid');
  sliderRoot.innerHTML=categories.map(c=>`<div class="slider"><label for="w-${c}"><span>${esc(c.replaceAll('_',' '))}</span><output id="o-${c}">${officialWeights[c]}</output></label><input id="w-${c}" data-cat="${c}" type="range" min="0" max="40" step="0.5" value="${officialWeights[c]}"></div>`).join('');
  function applyWeights(weights){categories.forEach(c=>{$(`#w-${c}`).value=weights[c];$(`#o-${c}`).textContent=weights[c]});updateExplorer()}
  function updateExplorer(){
    const raw=Object.fromEntries(categories.map(c=>[c,Number($(`#w-${c}`).value)]));
    const total=Object.values(raw).reduce((a,b)=>a+b,0)||1;
    $('#weight-total').textContent=total.toFixed(1);
    const rows=DATA.scorecard.vehicles.map(v=>{const cm=Object.fromEntries(v.category_scores.map(c=>[c.category,c]));const s=categories.reduce((sum,c)=>sum+(cm[c].confirmed_points/cm[c].maximum_points)*(raw[c]/total*100),0);return {id:v.vehicle_id,name:v.vehicle,score:s}}).sort((a,b)=>b.score-a.score);
    $('#explorer-body').innerHTML=rows.map((r,i)=>`<tr><td>${i+1}</td><td>${esc(r.name)}</td><td><strong>${r.score.toFixed(1)}</strong></td></tr>`).join('');
  }
  sliderRoot.addEventListener('input',e=>{if(e.target.matches('input[type=range]')){$(`#o-${e.target.dataset.cat}`).textContent=e.target.value;updateExplorer()}});
  $('#preset-buttons').innerHTML=Object.keys(DATA.sensitivity.weight_presets).map(n=>`<button data-preset="${n}">${esc(n.replaceAll('_',' '))}</button>`).join('');
  $('#preset-buttons').addEventListener('click',e=>{const b=e.target.closest('[data-preset]');if(b)applyWeights(DATA.sensitivity.weight_presets[b.dataset.preset])});
  $('#reset-weights').addEventListener('click',()=>applyWeights(officialWeights));
  updateExplorer();

  // Contradictions, corrections and reversals.
  $('#gaps').innerHTML=[...DATA.contradictions.contradictions.map(c=>({id:c.contradiction_id,title:c.vehicle_and_topic,text:`${c.source_a_and_value} vs ${c.source_b_and_value}. Resolution: ${c.resolution_rule}. Impact: ${c.impact}`})),...DATA.corrections.corrections.map(c=>({id:c.correction_id,title:'Correction',text:`${c.original_claim} → ${c.corrected_claim} ${c.scoring_or_eligibility_impact}`}))].map(x=>`<details><summary>${esc(x.id)} · ${esc(x.title)}</summary><div class="details-body"><p>${esc(x.text)}</p></div></details>`).join('');
  $('#reversal-list').innerHTML=DATA.recommendation.recommendation_reversal_conditions.map(x=>`<li>${esc(x)}</li>`).join('');

  // Eliminations.
  $('#elimination-list').innerHTML=DATA.eliminations.eliminations.map(e=>`<details><summary>${esc((DATA.eligibility.vehicles.find(v=>v.vehicle_id===e.vehicle_id)||{}).vehicle||e.vehicle_id)} — ${esc(e.failed_requirement)}</summary><div class="details-body"><p>${esc(e.reason)}</p><p class="small"><strong>Claim:</strong> <code>${esc(e.claim_id)}</code> · <strong>Sources:</strong> ${(e.source_ids||[]).map(id=>`<code>${esc(id)}</code>`).join(' ')}</p></div></details>`).join('');

  // Slate controls.
  const slateIds=DATA.recommendation.test_drive_slate;
  const savedSlate=JSON.parse(localStorage.getItem('fvr-slate')||'{}');
  $('#slate').innerHTML=slateIds.map((id,i)=>`<label class="slate-item"><input type="checkbox" data-slate="${esc(id)}" ${savedSlate[id]===false?'':'checked'}><span><strong>${i+1}. ${esc(vehicleMeta[id].short_name)}</strong><br><span class="muted">${esc(vehicleMeta[id].configuration_condition)}</span></span></label>`).join('');
  $('#slate').addEventListener('change',()=>{const out={};$$('[data-slate]').forEach(x=>out[x.dataset.slate]=x.checked);localStorage.setItem('fvr-slate',JSON.stringify(out))});

  // Checklist.
  $('#checklist-text').textContent=DATA.checklists.test_drive;
  $('#copy-checklist').addEventListener('click',async()=>{await navigator.clipboard.writeText(DATA.checklists.test_drive);$('#copy-checklist').textContent='Copied';setTimeout(()=>$('#copy-checklist').textContent='Copy checklist',1500)});

  // Claims search.
  function renderClaims(q=''){
    q=q.toLowerCase();const rows=DATA.claims.claims.filter(c=>!q||JSON.stringify(c).toLowerCase().includes(q)).slice(0,200);
    $('#claim-count').textContent=`${rows.length}${rows.length===200?' shown':''} / ${DATA.claims.claims.length}`;
    $('#claims-body').innerHTML=rows.map(c=>`<tr><td><code>${esc(c.claim_id)}</code></td><td>${esc(c.vehicle_id||'global')}</td><td>${esc(c.field_or_topic)}</td><td>${esc(typeof c.display_value==='object'?JSON.stringify(c.display_value):c.display_value)}</td><td>${status(c.status)}</td><td>${esc(c.confidence)}</td><td>${c.source_ids.map(id=>`<code>${esc(id)}</code>`).join(' ')||c.human_observation_ids?.map(id=>`<code>${esc(id)}</code>`).join(' ')||'—'}</td></tr>`).join('');
  }
  $('#claim-search').addEventListener('input',e=>renderClaims(e.target.value));renderClaims();

  // Sources search.
  function renderSources(q=''){
    q=q.toLowerCase();const rows=DATA.sources.sources.filter(s=>!q||JSON.stringify(s).toLowerCase().includes(q)).slice(0,200);
    $('#source-count').textContent=`${rows.length} / ${DATA.sources.sources.length}`;
    $('#sources-body').innerHTML=rows.map(s=>`<tr><td><code>${esc(s.source_id)}</code></td><td><a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.title)}</a><br><span class="small muted">${esc(s.publisher_or_organization)}</span></td><td>${s.authority_tier}</td><td>${esc(s.model_year_and_trim_applicability||'—')}</td><td>${esc(s.access_date)}</td><td>${esc(s.notes_on_limitations)}</td></tr>`).join('');
  }
  $('#source-search').addEventListener('input',e=>renderSources(e.target.value));renderSources();

  // Decision ledger.
  $('#ledger').innerHTML=DATA.decision_ledger.decisions.map(d=>`<details><summary>${esc(d.decision_id)} · ${esc(d.step)} — ${esc(d.decision)}</summary><div class="details-body"><p>${esc(d.concise_rationale)}</p><p><strong>Reversible:</strong> ${d.reversible?'Yes':'No'} ${d.reversal_conditions?`· <strong>Conditions:</strong> ${esc(d.reversal_conditions)}`:''}</p><p class="small"><strong>Inputs:</strong> ${(d.input_claim_ids_or_score_ids||[]).map(x=>`<code>${esc(x)}</code>`).join(' ')||'—'}</p></div></details>`).join('');

  // Downloads. Text files use embedded blobs so standalone HTML remains useful.
  const textMap=DATA.embedded_text_downloads||{};
  $('#downloads').innerHTML=(DATA.download_artifacts||[]).map(x=>`<a href="${esc(x.href)}" data-embedded-name="${esc(x.name)}" download>${esc(x.name)}</a>`).join('') + '<a href="../family-vehicle-site.zip" class="zip-link">Complete site ZIP</a><a href="../family-vehicle-analysis-package.zip" class="zip-link">Complete analysis package ZIP</a>';
  $('#downloads').addEventListener('click',e=>{const a=e.target.closest('[data-embedded-name]');if(!a||!textMap[a.dataset.embeddedName])return;e.preventDefault();const blob=new Blob([textMap[a.dataset.embeddedName]],{type:'text/plain;charset=utf-8'});const u=URL.createObjectURL(blob);const t=document.createElement('a');t.href=u;t.download=a.dataset.embeddedName.split('/').pop();t.click();setTimeout(()=>URL.revokeObjectURL(u),500)});

  // Method metadata.
  $('#method-meta').innerHTML=`<div class="kvs"><div class="kv"><b>Run ID</b>${esc(DATA.manifest.run_id)}</div><div class="kv"><b>Scoring version/hash</b>${esc(DATA.scorecard.scoring_config_version)} · ${esc(DATA.scorecard.scoring_config_sha256.slice(0,16))}…</div><div class="kv"><b>Independent lock</b>${esc(DATA.manifest.independent_recommendation_lock_timestamp_utc)}</div><div class="kv"><b>Manual consulted</b>${DATA.manifest.prior_human_research_consulted?'After lock':'No'}</div><div class="kv"><b>Queries / sources / claims</b>${DATA.query_log.queries.length} / ${DATA.sources.sources.length} / ${DATA.claims.claims.length}</div><div class="kv"><b>Simulation</b>${DATA.uncertainty.iterations.toLocaleString()} iterations · seed ${DATA.uncertainty.seed}</div></div>`;
})();
