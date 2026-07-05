// Question bank — Verbal reasoning (English). Parallel to ../verbal.ts:
// same order, same `correct` index (0=True, 1=False, 2=Cannot say).
import type { VerbalQuestion } from '../../types'

export const VFN_EN = ['True', 'False', 'Cannot say']

const P_DSA = 'Regulation (EU) 2022/2065, which entered into force on 1 January 2023, requires every digital platform with more than 45 million monthly active users in the Union to publish a transparency report every six months. Smaller platforms are only required to publish one annually. Compliance with these obligations is monitored by the European Commission.'
const P_COMP = 'Competition notice EPSO/AD/400 specifies that candidates must both hold a university degree awarded on completion of a full course of studies of at least three years and provide evidence of at least two years of professional experience. The pre-selection tests are held on computer at an approved centre. The reserve list is valid for two years.'
const P_DESK = 'The administrative centre is open to the public from Monday to Friday, from 8:30 a.m. to 4:00 p.m., without a break. On Tuesdays, an exceptional service is provided until 7:00 p.m. Appointments can be booked exclusively online.'
const P_AGENCY = 'In 2023, the agency handled 12,400 applications, compared with 9,800 in 2022. The average processing time fell from 45 days in 2022 to 30 days in 2023. The agency also recruited fifteen new staff in September 2023.'
const P_REMOTE = 'The internal policy allows each employee to telework up to three days per week, subject to the prior agreement of their manager. Weekly team meetings are held in person, without exception, on Mondays. No teleworking is possible during the probationary period.'
const P_FILE = 'All files submitted after 31 March are examined at the autumn session. Mr Dupont\'s file was submitted on 15 February.'
const P_HELIOS = 'In the last call for proposals, only projects that obtained a score strictly higher than 70 out of 100 were selected for funding. The Helios project obtained 68 points.'

const V = (q: Omit<VerbalQuestion, 'kind' | 'sec' | 'options'>): VerbalQuestion => ({
  kind: 'verbal',
  sec: 'verb',
  options: VFN_EN,
  ...q,
})

export const verbal: VerbalQuestion[] = [
  V({ tag: 'Quantifier', passage: P_DSA, statement: 'A platform with 50 million monthly active users must publish a transparency report twice a year.', correct: 0, explain: 'The text targets platforms with "more than 45 million" users, which are required to publish a report "every six months", i.e. twice a year. Since 50 > 45, the six-monthly obligation applies → <b>True</b>.' }),
  V({ tag: 'Quantifier', passage: P_DSA, statement: 'A platform with exactly 45 million monthly active users is subject to the six-monthly obligation.', correct: 1, explain: 'The threshold is "<b>more than</b> 45 million", a <i>strict</i> boundary. Exactly 45 million is not "more than 45 million": the platform therefore falls under the annual publication requirement → <b>False</b>.' }),
  V({ tag: 'Trap', passage: P_DSA, statement: 'A platform that fails to publish its report faces a fine equivalent to 6% of its annual turnover.', correct: 2, explain: 'The text states only that compliance with the obligations is "monitored by the Commission". No penalty, nor its amount, is mentioned. Adding a specific fine amount draws on information outside the passage → <b>Cannot say</b>.' }),
  V({ tag: 'Logic', passage: P_COMP, statement: 'A candidate holding a three-year university degree, but with no professional experience, may be admitted to the competition.', correct: 1, explain: 'The two conditions are cumulative ("both… and…"). Without the two years of professional experience required, the condition is not met, whatever the degree → <b>False</b>.' }),
  V({ tag: 'Quantifier', passage: P_COMP, statement: 'A candidate providing evidence of four years of professional experience satisfies the experience condition.', correct: 0, explain: 'The condition is "at least two years", an <i>inclusive</i> boundary. Four years exceed this threshold (4 ≥ 2), so the experience condition is satisfied → <b>True</b>.' }),
  V({ tag: 'Trap', passage: P_COMP, statement: 'The period of validity of the reserve list may be extended beyond two years.', correct: 2, explain: 'The text states that the list "is valid for two years" but says nothing about any possible extension. Neither confirmed nor denied → <b>Cannot say</b>.' }),
  V({ tag: 'True/False', passage: P_DESK, statement: 'A member of the public can be received on a Tuesday at 5:30 p.m.', correct: 0, explain: 'On Tuesdays, the service is provided "until 7:00 p.m.". 5:30 p.m. falls before that limit, so the centre is open → <b>True</b>.' }),
  V({ tag: 'True/False', passage: P_DESK, statement: 'It is possible to book an appointment by telephone.', correct: 1, explain: 'The text specifies that appointments are booked "<b>exclusively</b> online". The telephone channel is therefore explicitly excluded → <b>False</b>.' }),
  V({ tag: 'True/False', passage: P_AGENCY, statement: 'In 2022, the average processing time exceeded one month.', correct: 0, explain: 'In 2022, the average time was 45 days, i.e. more than 30 days (one month). 45 > 30 → the time did indeed exceed one month → <b>True</b>.' }),
  V({ tag: 'Correlation ≠ cause', passage: P_AGENCY, statement: 'The reduction in processing time is explained by the recruitment of the fifteen new staff.', correct: 2, explain: 'The text mentions side by side the fall in processing time <i>and</i> the recruitment, but establishes no cause-and-effect link. Moving from coincidence ("also") to causality ("is explained by") is an unsupported addition → <b>Cannot say</b>.' }),
  V({ tag: 'True/False', passage: P_AGENCY, statement: 'The number of applications handled decreased between 2022 and 2023.', correct: 1, explain: 'The agency handled 12,400 applications in 2023 compared with 9,800 in 2022. 12,400 > 9,800: the number <b>increased</b>, it did not decrease → <b>False</b>.' }),
  V({ tag: 'Logic', passage: P_REMOTE, statement: 'An employee still in the probationary period may telework two days per week.', correct: 1, explain: 'The text is categorical: "<b>No</b> teleworking is possible during the probationary period". The quantifier rules out any teleworking day, including two → <b>False</b>.' }),
  V({ tag: 'Logic', passage: P_REMOTE, statement: 'The manager can refuse a teleworking request made by an employee.', correct: 0, explain: 'Teleworking is granted "subject to the prior agreement of their manager". Making the right conditional on an agreement implies that this agreement can be refused → <b>True</b>.' }),
  V({ tag: 'Logic', passage: P_FILE, statement: 'Mr Dupont\'s file will be examined at the autumn session.', correct: 2, explain: 'The rule concerns only files submitted <i>after</i> 31 March. Submitted on 15 February, the file does not fall under this rule, which says nothing about the fate of earlier submissions → <b>Cannot say</b>.' }),
  V({ tag: 'Quantifier', passage: P_HELIOS, statement: 'The Helios project was selected for funding.', correct: 1, explain: '"Only" projects scoring above 70 were funded. With 68 points, Helios is below the threshold (68 < 70) and is therefore excluded → <b>False</b>.' }),
  V({ tag: 'Quantifier', passage: P_HELIOS, statement: 'A project that obtained exactly 70 points was selected for funding.', correct: 1, explain: 'The threshold is "<b>strictly</b> higher than 70", an <i>exclusive</i> boundary. A score of 70 is not strictly higher than 70, so the project is not funded → <b>False</b>.' }),
]
