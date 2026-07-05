// Question bank — Abstract reasoning (English). Figures (FigSpec) are shared with
// the French bank; only the text (tag / prompt / explain) is localised, in order.
import type { FigureQuestion } from '../../types'
import { abstract as abstractFr } from '../abstract'

const TXT: { tag: string; prompt: string; explain: string }[] = [
  { tag: 'Series', prompt: 'Which figure logically completes the series?', explain: 'The arrow rotates <b>45° clockwise</b> at each step: 0°, 45°, 90°, 135°… the next one points at <b>180°</b> (downward).' },
  { tag: 'Series', prompt: 'Which figure comes next?', explain: 'The number of sides increases by 1: triangle (3), square (4), pentagon (5), hexagon (6) → <b>heptagon (7 sides)</b>.' },
  { tag: 'Series', prompt: 'Where is the dot at the next step?', explain: 'The dot moves from corner to corner clockwise (top-left → top-right → bottom-right → bottom-left). After the bottom-left, it returns to the <b>top-left corner</b>.' },
  { tag: 'Two rules', prompt: 'Two rules evolve at the same time. Which figure follows?', explain: 'Two simultaneous rules: the shape <b>alternates</b> triangle / circle, and the number of bars <b>increases by 1</b>. So after (circle, 4 bars) comes <b>triangle with 5 bars</b>.' },
  { tag: 'Odd one out', prompt: 'Four figures follow the same rule, only one breaks it. Which one is the <b>odd one out</b>?', explain: 'Rule: <b>the number of inner dots = the number of sides</b>. The 3rd figure is a pentagon (5 sides) but contains only <b>4 dots</b>: it is the odd one out.' },
  { tag: 'Series', prompt: 'Which figure logically completes the series?', explain: 'Constant rotation of <b>45° clockwise</b>: 45°, 90°, 135°, 180°… the next arrow points at <b>225°</b> (bottom-left).' },
  { tag: 'Series', prompt: 'Which figure comes next?', explain: 'The <b>number of sides increases by 1</b>: square (4), pentagon (5), hexagon (6), heptagon (7) → <b>octagon (8 sides)</b>.' },
  { tag: 'Series', prompt: 'Where is the dot at the next step?', explain: 'The dot rotates <b>anti-clockwise</b>: top-left → bottom-left → bottom-right → top-right. After the top-right, it returns to the <b>top-left corner</b>.' },
  { tag: 'Two rules', prompt: 'Two rules evolve at the same time. Which figure follows?', explain: 'Two simultaneous rules: the shape <b>alternates</b> triangle / circle, and the number of bars <b>increases by 2</b> (2, 4, 6, 8). So after (circle, 8 bars) comes <b>triangle with 10 bars</b>.' },
  { tag: 'Two rules', prompt: 'Two attributes progress together. Which figure completes the series?', explain: 'Two simultaneous rules: the <b>number of sides increases by 1</b> (3, 4, 5, 6) and the <b>number of dots increases by 1</b> (1, 2, 3, 4). The next one is a <b>heptagon (7 sides) containing 5 dots</b>.' },
  { tag: 'Odd one out', prompt: 'Four figures follow the same rule, only one breaks it. Which one is the <b>odd one out</b>?', explain: 'Common rule: all polygons have an <b>even number of sides</b> (4, 6, 8, 10). The pentagon (5 sides) is the only <b>odd</b> one: it is the odd one out.' },
  { tag: 'Odd one out', prompt: 'Four figures respect a relation between sides and dots, only one does not. Which one is the <b>odd one out</b>?', explain: 'Rule: the <b>number of inner dots = number of sides − 1</b> (4→3, 5→4, 6→5, 7→6). The octagon (8 sides) should contain 7 dots but contains <b>8</b>: it is the odd one out.' },
]

// Réutilise les figures (series/options/correct) du bank FR, ne remplace que le texte.
export const abstract: FigureQuestion[] = abstractFr.map((q, i) => ({
  ...q,
  tag: TXT[i].tag,
  prompt: TXT[i].prompt,
  explain: TXT[i].explain,
}))
