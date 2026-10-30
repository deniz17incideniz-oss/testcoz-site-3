// Structural migration only: this does not certify the remaining distractors' educational quality.
// Retain the keyed answer and the first two incorrect choices in their original order.
// No keyed answer, question, explanation, ID, or visual is rewritten here.
export function gradeChoices(test, question) {
 const expected=test.classLevel<=3?3:4;
 if(question.choices.length===expected)return null;
 if(expected!==3||question.choices.length!==4)throw Error(`Unexpected choice count: ${question.id}`);
 if(/^(hepsi|tümü|hiçbiri|yukarıdakilerin)/iu.test(question.choices[question.correctAnswer]))throw Error(`Review dependent answer: ${question.id}`);
 const keep=question.choices.map((_,i)=>i).filter(i=>i!==question.correctAnswer).slice(0,2);
 keep.push(question.correctAnswer);keep.sort((a,b)=>a-b);
 const choices=keep.map(i=>question.choices[i]);
 return {choices,options:choices.slice(),correctAnswer:keep.indexOf(question.correctAnswer)};
}
