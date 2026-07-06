// Question bank — Numerical reasoning (English). Parallel to ../numeric.ts:
// same order, same option order, same `correct` index.
import type { InputQuestion, TextQuestion } from '../../types'

const T = (q: Omit<TextQuestion, 'kind' | 'sec'>): TextQuestion => ({ kind: 'text', sec: 'num', ...q })

/** Numeric-entry question (the user types the number, SHL interactive format). */
const I = (q: Omit<InputQuestion, 'kind' | 'sec'>): InputQuestion => ({ kind: 'input', sec: 'num', ...q })

export const numeric: (TextQuestion | InputQuestion)[] = [
  T({
    tag: 'Change',
    stem: '<table class="data"><caption>Annual budget of the European Social Fund+ (€ billion)</caption><thead><tr><th>Year</th><th>2020</th><th>2021</th><th>2022</th><th>2023</th><th>2024</th></tr></thead><tbody><tr><td>Budget</td><td>12.0</td><td>13.5</td><td>15.0</td><td>16.5</td><td>18.0</td></tr></tbody></table><p>By what percentage did the budget increase between <b>2020 and 2024</b>?</p>',
    options: ['40%', '45%', '50%', '55%', '60%'],
    correct: 2,
    explain: 'Change = (18 − 12) / 12 = 6 / 12 = <b>0.50 = 50%</b>. The difference is always taken relative to the starting value (2020).',
  }),
  T({
    tag: 'Average',
    stem: '<table class="data"><caption>Annual budget of the European Social Fund+ (€ billion)</caption><thead><tr><th>Year</th><th>2020</th><th>2021</th><th>2022</th><th>2023</th><th>2024</th></tr></thead><tbody><tr><td>Budget</td><td>12.0</td><td>13.5</td><td>15.0</td><td>16.5</td><td>18.0</td></tr></tbody></table><p>What is the <b>average annual budget</b> over the 2020-2024 period?</p>',
    options: ['€13.5bn', '€14.4bn', '€15.0bn', '€15.6bn', '€16.5bn'],
    correct: 2,
    explain: 'Sum = 12 + 13.5 + 15 + 16.5 + 18 = <b>75</b>. Average = 75 / 5 = <b>€15.0bn</b>.',
  }),
  T({
    tag: 'Percentage',
    stem: '<table class="data"><caption>Headcount of four EU agencies (2024)</caption><thead><tr><th>Agency</th><th>Officials</th><th>Contract staff</th></tr></thead><tbody><tr><td>EMA</td><td>620</td><td>280</td></tr><tr><td>Frontex</td><td>1,200</td><td>800</td></tr><tr><td>ECHA</td><td>350</td><td>150</td></tr><tr><td>EFSA</td><td>380</td><td>120</td></tr></tbody></table><p>What <b>percentage</b> of the total headcount of the four agencies is made up of <b>contract staff</b>?</p>',
    options: ['30.8%', '34.6%', '38.5%', '41.2%', '46.2%'],
    correct: 1,
    explain: 'Contract staff = 280 + 800 + 150 + 120 = <b>1,350</b>. Total headcount = 2,550 + 1,350 = <b>3,900</b>. Proportion = 1,350 / 3,900 = <b>34.6%</b>.',
  }),
  T({
    tag: 'Proportion',
    stem: '<table class="data"><caption>Headcount of four EU agencies (2024)</caption><thead><tr><th>Agency</th><th>Officials</th><th>Contract staff</th></tr></thead><tbody><tr><td>EMA</td><td>620</td><td>280</td></tr><tr><td>Frontex</td><td>1,200</td><td>800</td></tr><tr><td>ECHA</td><td>350</td><td>150</td></tr><tr><td>EFSA</td><td>380</td><td>120</td></tr></tbody></table><p>What <b>share of the total headcount</b> (officials + contract staff) does the <b>Frontex</b> agency represent?</p>',
    options: ['46.2%', '48.7%', '50.0%', '51.3%', '53.8%'],
    correct: 3,
    explain: 'Frontex = 1,200 + 800 = <b>2,000</b>. Total across agencies = <b>3,900</b>. Share = 2,000 / 3,900 = <b>51.3%</b>. Trap: Frontex only just exceeds half of the total.',
  }),
  T({
    tag: 'Change',
    stem: '<table class="data"><caption>Renewable electricity production in the EU (TWh)</caption><thead><tr><th>Source</th><th>2022</th><th>2023</th></tr></thead><tbody><tr><td>Wind</td><td>420</td><td>475</td></tr><tr><td>Solar</td><td>205</td><td>260</td></tr><tr><td>Hydro</td><td>340</td><td>325</td></tr><tr><td>Biomass</td><td>165</td><td>180</td></tr></tbody></table><p>What was the <b>percentage increase</b> in <b>solar</b> production between 2022 and 2023?</p>',
    options: ['21.2%', '24.5%', '26.8%', '28.0%', '30.4%'],
    correct: 2,
    explain: 'Change = (260 − 205) / 205 = 55 / 205 = <b>26.8%</b>. The difference is divided by the 2022 value, not the 2023 value.',
  }),
  T({
    tag: 'Chart reading',
    stem: '<table class="data"><caption>Renewable electricity production in the EU (TWh)</caption><thead><tr><th>Source</th><th>2022</th><th>2023</th></tr></thead><tbody><tr><td>Wind</td><td>420</td><td>475</td></tr><tr><td>Solar</td><td>205</td><td>260</td></tr><tr><td>Hydro</td><td>340</td><td>325</td></tr><tr><td>Biomass</td><td>165</td><td>180</td></tr></tbody></table><p>In <b>2023</b>, what <b>share</b> of total renewable production came from <b>wind</b>?</p>',
    options: ['34.7%', '36.5%', '38.3%', '40.1%', '42.0%'],
    correct: 2,
    explain: '2023 total = 475 + 260 + 325 + 180 = <b>1,240 TWh</b>. Wind share = 475 / 1,240 = <b>38.3%</b>.',
  }),
  T({
    tag: 'Compound rate',
    stem: '<table class="data"><caption>Results of an EPSO administrators\' competition</caption><thead><tr><th>Stage</th><th>Candidates</th><th>Passed</th></tr></thead><tbody><tr><td>Pre-selection (MCQ)</td><td>42,000</td><td>6,300</td></tr><tr><td>Written tests</td><td>6,300</td><td>1,260</td></tr><tr><td>Assessment centre</td><td>1,260</td><td>315</td></tr></tbody></table><p>What is the <b>overall success rate</b>, from the initial registrants to the final laureates?</p>',
    options: ['0.50%', '0.75%', '1.25%', '1.50%', '2.00%'],
    correct: 1,
    explain: 'The final laureates are taken relative to the starting registrants: 315 / 42,000 = <b>0.0075 = 0.75%</b>. Trap: you must not average the rates of each stage (15%, 20%, 25%) but multiply them: 0.15 × 0.20 × 0.25 = <b>0.0075</b>.',
  }),
  T({
    tag: 'Relative growth',
    stem: '<table class="data"><caption>Population of four Member States (millions of inhabitants)</caption><thead><tr><th>Country</th><th>2019</th><th>2024</th></tr></thead><tbody><tr><td>Germany</td><td>83.0</td><td>84.7</td></tr><tr><td>France</td><td>67.0</td><td>68.3</td></tr><tr><td>Spain</td><td>47.0</td><td>48.6</td></tr><tr><td>Poland</td><td>38.0</td><td>36.9</td></tr></tbody></table><p>Which country had the <b>highest percentage population growth</b> between 2019 and 2024?</p>',
    options: ['Germany', 'France', 'Spain', 'Poland', 'Equal growth'],
    correct: 2,
    explain: 'Germany: 1.7/83 = 2.0%. France: 1.3/67 = 1.9%. Spain: 1.6/47 = <b>3.4%</b>. Poland: −1.1/38 = −2.9%. Trap: Germany gains the most inhabitants in absolute terms (+1.7 M), but <b>Spain</b> has the highest relative increase.',
  }),
  T({
    tag: 'Successive changes',
    stem: '<p>A grant of <b>€80,000</b> increases by <b>25%</b> in the first year, then decreases by <b>20%</b> in the second year.<br>What is its final amount?</p>',
    options: ['€76,800', '€80,000', '€84,000', '€85,000', '€100,000'],
    correct: 1,
    explain: 'Year 1: 80,000 × 1.25 = 100,000. Year 2: 100,000 × 0.80 = <b>€80,000</b>. Classic trap: +25% then −20% brings you back exactly to the starting value, because 1.25 × 0.80 = 1.00. Successive percentages do not add up.',
  }),
  T({
    tag: 'Speed',
    stem: '<p>A train must cover <b>480 km</b>. It first runs for <b>2 h</b> at <b>150 km/h</b>, then must cover the rest of the journey in <b>3 h</b>.<br>At what average speed must it run over this last part?</p>',
    options: ['55 km/h', '60 km/h', '66 km/h', '72 km/h', '90 km/h'],
    correct: 1,
    explain: 'Distance already covered = 2 × 150 = 300 km. Remaining = 480 − 300 = <b>180 km</b> to cover in 3 h. Speed = 180 / 3 = <b>60 km/h</b>.',
  }),
  T({
    tag: 'Harmonic mean',
    stem: '<p>An agent travels the outbound leg of a mission at <b>90 km/h</b> and the return, along the same route, at <b>60 km/h</b>.<br>What is their <b>average speed</b> over the whole round trip?</p>',
    options: ['70 km/h', '72 km/h', '74 km/h', '75 km/h', '76 km/h'],
    correct: 1,
    explain: 'Major trap: the average is NOT (90 + 60)/2 = 75. Since the distance is identical, the harmonic mean is used: v = 2 × 90 × 60 / (90 + 60) = 10,800 / 150 = <b>72 km/h</b>. More time is spent at the slower speed, so the average tilts downward.',
  }),
  T({
    tag: 'Proportion',
    stem: '<p>A printer produces <b>3,500 brochures</b> in <b>5 hours</b>.<br>How many will it produce in <b>8 hours</b>, at the same rate?</p>',
    options: ['4,900', '5,250', '5,600', '6,000', '7,000'],
    correct: 2,
    explain: 'Rate = 3,500 / 5 = <b>700 brochures/h</b>. In 8 h: 700 × 8 = <b>5,600 brochures</b>.',
  }),
  T({
    tag: 'Ratio split',
    stem: '<p>A budget of <b>€1,200,000</b> is divided among three projects according to the ratio <b>3 : 4 : 5</b>.<br>What sum does the best-funded project receive?</p>',
    options: ['€300,000', '€400,000', '€480,000', '€500,000', '€600,000'],
    correct: 3,
    explain: 'Total number of parts = 3 + 4 + 5 = <b>12</b>. One part = 1,200,000 / 12 = €100,000. The best-funded project receives 5 parts = 5 × 100,000 = <b>€500,000</b>.',
  }),
  T({
    tag: 'Index (base 100)',
    stem: '<p>With a base of <b>100 in 2015</b>, the price index reaches <b>128 in 2023</b>. A product cost <b>€45</b> in 2015 and its price follows this index exactly.<br>What is its price in 2023?</p>',
    options: ['€52.20', '€55.00', '€57.60', '€60.00', '€62.40'],
    correct: 2,
    explain: 'An index of 128 means a 28% increase since 2015. 2023 price = 45 × 128 / 100 = 45 × 1.28 = <b>€57.60</b>.',
  }),
  T({
    tag: 'Compound percentage',
    stem: '<p>In an agency, <b>60%</b> of staff are women. Among the women, <b>45%</b> hold a management position.<br>What percentage of the <b>total headcount</b> is made up of female managers?</p>',
    options: ['24%', '27%', '30%', '45%', '52.5%'],
    correct: 1,
    explain: 'The two proportions must be multiplied: 0.60 × 0.45 = <b>0.27 = 27%</b>. Trap: you do not add (60% + 45%), and the 45% applies only to the sub-population of women.',
  }),
  T({
    tag: 'Weighted average',
    stem: '<p>A candidate scores <b>12/20</b> on a test with <b>coefficient 3</b> and <b>16/20</b> on a test with <b>coefficient 2</b>.<br>What is their <b>weighted average</b>?</p>',
    options: ['13.2', '13.6', '14.0', '14.4', '14.8'],
    correct: 1,
    explain: 'Weighted average = (12 × 3 + 16 × 2) / (3 + 2) = (36 + 32) / 5 = 68 / 5 = <b>13.6</b>. Trap: the simple average (12 + 16)/2 = 14 is wrong because the coefficients differ.',
  }),
  I({
    tag: 'Entry · Change',
    stem: '<table class="data"><caption>Funding of an Erasmus+ programme (€ million)</caption><thead><tr><th>Year</th><th>2021</th><th>2022</th><th>2023</th><th>2024</th></tr></thead><tbody><tr><td>Funding</td><td>250</td><td>275</td><td>310</td><td>340</td></tr></tbody></table><p>By what <b>percentage</b> did the funding increase between <b>2021 and 2024</b>? <i>(Type the number, without the % sign, rounded to the nearest integer.)</i></p>',
    answer: 36,
    tolerance: 0,
    unit: '%',
    explain: 'Change = (340 − 250) / 250 = 90 / 250 = 0.36 = <b>36%</b>. The difference is taken relative to the starting value (2021).',
  }),
  I({
    tag: 'Entry · Proportion',
    stem: '<p>A team translates <b>18 pages</b> in <b>3 hours</b>.<br>How many <b>pages</b> will it translate in <b>7 hours</b>, at the same rate? <i>(Type the number.)</i></p>',
    answer: 42,
    tolerance: 0,
    unit: 'pages',
    explain: 'Rate = 18 / 3 = <b>6 pages/h</b>. In 7 h: 6 × 7 = <b>42 pages</b>.',
  }),
]
