---
document_type: vehicle_comparison
schema_version: "1.0"

assumptions:
  ownership_period_years: 5
  comparison_distance_miles: 50000
  gasoline_price_per_gallon_usd: 4.50
  electric_cost_per_mile_usd: 0.0616
  oil_changes_per_year: 2
  oil_change_cost_usd: 100
---

## Important Instructions
> ALERT: Do not use this file during initial candidate generation or
> independent evaluation. It is used later for comparison.

# Vehicle Comparison Dataset

## vehicles

- id: vw_atlas_sel_premium_r_line
  make: Volkswagen
  model: Atlas
  trim: SEL Premium R-Line
  powertrain:
    type: gas
    fuel: {required: regular, recommended: regular}
    mpg: {combined: 21}
    mpge: null
    electric_range_miles: null
  cost:
    new_usd: 58520
    used_usd: {min: 39000, max: 39000}
    energy_50000_miles_usd: 10714.29
    oil_changes_5_years_usd: 1000
    ownership_5_years_usd: 70234.29
  safety:
    nhtsa: {stars: 5}
    iihs: {rating: top_safety_pick_plus}
  climate: {ceiling_vents: false}
  seating:
    third_row_seat_count: 2
    carseat_tilt: true
    middle_row: {anchor_positions: 3, tether_positions: 3, source_description: "All 3 seats"}
    third_row: {anchor_positions: 2, tether_positions: 2, source_description: "Both seats"}
  cargo: {third_row_up_cubic_feet: {min: 20.6, max: 20.6}}
  notable_features: ["Good all around functionality"]
  notable_cons: ["VW reliability?", "Anecdotally, Christian owned one and said the model is known for many electrical issues."]
  comments: null

- id: acura_mdx_advance
  make: Acura
  model: MDX
  trim: Advance
  powertrain:
    type: gas
    fuel: {required: regular, recommended: premium}
    mpg: {combined: 22}
    mpge: null
    electric_range_miles: null
  cost:
    new_usd: 66900
    used_usd: {min: 46000, max: 54000}
    energy_50000_miles_usd: 10227.27
    oil_changes_5_years_usd: 1000
    ownership_5_years_usd: 78127.27
  safety:
    nhtsa: {stars: 5}
    iihs: {rating: top_safety_pick}
  climate: {ceiling_vents: false}
  seating:
    third_row_seat_count: 2
    carseat_tilt: false
    middle_row: {anchor_positions: 3, tether_positions: 3, source_description: "All 3 seats"}
    third_row: {anchor_positions: 2, tether_positions: 2, source_description: "Both seats"}
  cargo: {third_row_up_cubic_feet: {min: 16.3, max: 16.3}}
  notable_features: ["Removable middle seat in 2nd row"]
  notable_cons: ["High cost", "Outdated infotainment with mousepad", "Premium gas (?)"]
  comments: null

- id: honda_pilot
  make: Honda
  model: Pilot
  trim_options: [Touring, Elite, Black]
  powertrain:
    type: gas
    fuel: {required: regular, recommended: regular}
    mpg: {combined: 21}
    mpge: null
    electric_range_miles: null
  cost:
    new_usd: 54390
    used_usd: {min: 43000, max: 50000}
    energy_50000_miles_usd: 10714.29
    oil_changes_5_years_usd: 1000
    ownership_5_years_usd: 66104.29
  safety:
    nhtsa: {stars: 5}
    iihs: {rating: top_safety_pick_plus}
  climate: {ceiling_vents: false}
  seating:
    third_row_seat_count: 3
    carseat_tilt: false
    middle_row:
      anchor_positions: 2
      tether_positions: 3
      anchor_locations: [outboard_driver, outboard_passenger]
    third_row:
      anchor_positions: 1
      tether_positions: 3
      anchor_locations: [passenger_side]
  cargo: {third_row_up_cubic_feet: {min: 18.6, max: 18.6}}
  notable_features: ["Removable middle seat in 2nd row"]
  notable_cons: []
  comments: null

- id: volvo_xc90_t8_plus
  make: Volvo
  model: XC90
  trim: T8 Plus
  powertrain:
    type: plug_in_hybrid
    fuel: {required: premium, recommended: premium}
    mpg: {gas: 27}
    mpge: {electric: 58}
    electric_range_miles: 32
  cost:
    new_usd: 78850
    used_usd: {min: 41000, max: 47000}
    energy_50000_miles_usd: 3879.31
    oil_changes_5_years_usd: 1000
    ownership_5_years_usd: 83729.31
  safety:
    nhtsa: {stars: 5}
    iihs: {rating: top_safety_pick_plus}
  climate: {ceiling_vents: false}
  seating:
    third_row_seat_count: 2
    carseat_tilt: false
    middle_row:
      anchor_positions: 2
      tether_positions: 3
      anchor_locations: [outboard_driver, outboard_passenger]
    third_row:
      configuration_dependent: true
      captain_chairs: {tether_positions: 1}
      bench: {tether_positions: 0}
      source_description: "1 tether (captain chair model only; bench model has none in 3rd row)"
  cargo: {third_row_up_cubic_feet: {min: 15.8, max: 15.8}}
  notable_features: ["Built-in booster"]
  notable_cons: ["High cost", "High maintenance costs", "Limited/none back row carseat placement", "Must use premium gas"]
  comments: null

- id: mazda_cx90_phev_premium_plus
  make: Mazda
  model: CX-90
  trim: PHEV Premium Plus
  powertrain:
    type: plug_in_hybrid
    fuel: {required: regular, recommended: premium}
    mpg: {gas: 25}
    mpge: {electric: 56}
    electric_range_miles: 26
  cost:
    new_usd: 58700
    used_usd: {min: 31000, max: 34000}
    energy_50000_miles_usd: 4017.86
    oil_changes_5_years_usd: 1000
    ownership_5_years_usd: 63717.86
  safety:
    nhtsa: {stars: 5}
    iihs: {rating: top_safety_pick_plus}
  climate: {ceiling_vents: false}
  seating:
    third_row_seat_count: 3
    carseat_tilt: false
    middle_row: {anchor_positions: 3, tether_positions: 3, source_description: "All 3 seats"}
    third_row: {anchor_positions: 1, tether_positions: 2, anchor_locations: [passenger_side]}
  cargo: {third_row_up_cubic_feet: {min: 14.9, max: 15.9}}
  notable_features: []
  notable_cons: ["Smallest trunk", "Mazda reliability?", "Apple CarPlay is touchscreen but otherwise have to use mousepad which is weird", "Insufficient ventilation in back rows", "Premium gas (?)"]
  comments: ["The rapid and significant depreciation is concerning."]

- id: toyota_grand_highlander
  make: Toyota
  model: Grand Highlander
  trim_options: [Limited, Nightshade]
  powertrain:
    type: active_hybrid
    fuel: {required: regular, recommended: regular}
    mpg: {combined: 36}
    mpge: null
    electric_range_miles: null
  cost:
    new_usd: 53110
    used_usd: {min: 52000, max: 60000}
    energy_50000_miles_usd: 6250
    oil_changes_5_years_usd: 1000
    ownership_5_years_usd: 60360
  safety:
    nhtsa: {stars: 4}
    iihs: {rating: good_acceptable}
  climate: {ceiling_vents: true}
  seating:
    third_row_seat_count: 3
    carseat_tilt: false
    middle_row: {anchor_positions: 3, tether_positions: 3, source_description: "All 3 seats"}
    third_row: {anchor_positions: 1, tether_positions: 3, anchor_locations: [passenger_side]}
  cargo: {third_row_up_cubic_feet: {min: 20.6, max: 20.6}}
  notable_features: ["Good all around functionality", "Toyota has good dependability"]
  notable_cons: ["Lowest safety rating"]
  comments: ["Toyotas are known for holding value as used cars."]

- id: hyundai_ioniq_9_sel
  make: Hyundai
  model: Ioniq 9
  trim: SEL
  powertrain:
    type: electric
    fuel: {required: null, recommended: null}
    mpg: null
    mpge: {combined: 88}
    electric_range_miles: 320
  cost:
    new_usd: 66320
    used_usd: {min: 52000, max: 52000}
    energy_50000_miles_usd: 3080.65
    oil_changes_5_years_usd: 0
    ownership_5_years_usd: 69400.65
  safety:
    nhtsa: {stars: 5}
    iihs: {rating: top_safety_pick_plus}
  climate: {ceiling_vents: true}
  seating:
    third_row_seat_count: 2
    carseat_tilt: true
    middle_row: {anchor_positions: 2, tether_positions: 3, anchor_locations: [outboard_driver, outboard_passenger]}
    third_row: {anchor_positions: 2, tether_positions: 2, source_description: "Both seats"}
  cargo: {third_row_up_cubic_feet: {min: 21.9, max: 21.9}}
  notable_features: ["Good all around functionality", "Meets all criteria: safety, ceiling vents, 5 anchor positions, carseat tilt", "Most cargo space"]
  notable_cons: ["High cost", "First model year is 2026", "Could be guinea pigs"]
  comments: null
