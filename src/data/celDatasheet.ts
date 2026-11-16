import { CELService } from '@/types';

// Services shown in the home page CEL datasheet (as before the upstream merge).
export const celDatasheetServices: CELService[] = [
    {
      id: 'water-testing',
      title: 'Water Quality Testing',
      category: 'Water',
      description: 'Comprehensive physical, chemical, and biological testing for drinking water, surface water, and groundwater in accordance with IS 10500 standards.',
      parameters: ['pH, Turbidity, Electrical Conductivity, TDS', 'Total Hardness, Alkalinity, Chlorides, Fluorides', 'Sulphates, Nitrates, Dissolved Oxygen (DO)', 'Total Coliforms & E. Coli counts', 'Heavy Metals (Pb, Cd, As, Cr, Hg, Ni)'],
      equipment: ['UV-Vis Spectrophotometer', 'Multi-parameter Ion Meter', 'Turbidimeter', 'Flame Photometer']
    },
    {
      id: 'wastewater-testing',
      title: 'Wastewater & Effluent Characterization',
      category: 'Wastewater',
      description: 'Performance evaluation and regulatory compliance monitoring for municipal STPs, industrial ETPs, and common effluent treatment plants (CETP).',
      parameters: ['Biochemical Oxygen Demand (BOD 3-day / 5-day)', 'Chemical Oxygen Demand (COD)', 'Total Suspended Solids (TSS) & Settleable Solids', 'Ammoniacal Nitrogen & Total Kjeldahl Nitrogen (TKN)', 'Oil & Grease, Residual Chlorine, Phosphates'],
      equipment: ['COD Digester & Titration System', 'BOD Incubator & Respirometer', 'Centrifuge & Vacuum Filtration Units']
    },
    {
      id: 'solid-waste-testing',
      title: 'Solid Waste & Sludge Diagnostics',
      category: 'Solid Waste',
      description: 'Physical-chemical characterization of municipal solid waste, compost quality testing, and hazardous industrial sludge profiling.',
      parameters: ['Calorific Value / Bomb Calorimetry', 'Moisture Content, Volatile Organic Matter, Ash Content', 'Carbon-to-Nitrogen (C:N) Ratio', 'Toxicity Characteristic Leaching Procedure (TCLP)', 'Organic Carbon & Nutrient Profiling'],
      equipment: ['Bomb Calorimeter', 'Muffle Furnace', 'TCLP Rotary Agitator', 'Elemental CHNS Analyzer']
    },
    {
      id: 'specialized-studies',
      title: 'Specialized Environmental Diagnostics',
      category: 'Specialized',
      description: 'Advanced investigative studies for microplastics, organic micropollutants, industrial brine recovery, and soil contamination remediation.',
      parameters: ['Microplastic particle identification', 'Pesticide residue quantification', 'Total Petroleum Hydrocarbons (TPH)', 'Soil permeability and cation exchange capacity'],
      equipment: ['FTIR Spectrometer with ATR', 'Gas Chromatograph (GC)', 'Ultrasonic Probe Sonicator']
    }
  ];
