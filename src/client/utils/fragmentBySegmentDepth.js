/**
 * Creates a fragment object with the provided text and attributes from a sentence object.
 *
 * @param {string} text - The text of the fragment.
 * @param {object} sentence - The sentence object from which attributes are obtained.
 * @param {number} deep - Indicates the level of division to which the fragment belongs.
 * @returns {object} - The created fragment object.
 */
function createFragment(text, sentence, deep) {
  return {
    text,
    deep: deep,
    confidence: sentence.confidence,
    score_tag: sentence.score_tag,
    agreement: sentence.agreement,
  };
}

/**
 * Divides a sentence into an array of fragments by dividing the sentence into segments recursively.
 * Sentence separators are the segments at that depth level.
 * The objects in the segment_list attribute of the sentence object are used as segments.
 *
 * @param {object} sentence - The sentence object to be fragmented.
 * @param {number} deep - Indicates the depth level of the current sentence (default is 1).
 * @returns {Array} - An array of fragments obtained through segmentation.
 *
 * @see {@link https://learn.meaningcloud.com/developer/sentiment-analysis/2.1/doc/response} for expected sentence format.
 */
export function fragmentBySegmentDepth(sentence, deep = 1) {
  const arr = [];
  let start = 0;
  let end = sentence.endp - sentence.inip + 1;
  for (let segment of sentence.segment_list || []) {
    const text = sentence.text.slice(start, segment.inip - sentence.inip);
    arr.push(createFragment(text, sentence, deep));
    arr.push(...fragmentBySegmentDepth(segment, deep + 1));
    start = segment.endp - sentence.inip + 1;
  }
  const text = sentence.text.slice(start, end);
  arr.push(createFragment(text, sentence, deep));
  return arr;
}
