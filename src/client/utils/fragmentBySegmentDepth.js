export function fragmentBySegmentDepth(sentence, deep = 1) {
  const arr = [];
  let start = 0;
  let end = sentence.endp - sentence.inip + 1;
  for (let segment of sentence.segment_list || []) {
    //fragment belonging only to the sentence
    const fragment = {
      text: sentence.text.slice(start, segment.inip - sentence.inip),
      deep: deep,
      confidence: sentence.confidence,
      score_tag: sentence.score_tag,
      agreement: sentence.agreement,
    };
    //arr.push(sentence.text.slice(start, segment.inip - sentence.inip));
    arr.push(fragment);
    //the segment
    arr.push(...fragmentBySegmentDepth(segment, deep + 1));
    start = segment.endp - sentence.inip + 1;
  }
  //the last fragment belonging only to the sentence
  // or the sentence itself if it does not have segments
  const fragment = {
    text: sentence.text.slice(start, end),
    deep: deep,
    confidence: sentence.confidence,
    score_tag: sentence.score_tag,
    agreement: sentence.agreement,
  };
  arr.push(fragment);
  //arr.push(sentence.text.slice(start, end));

  return arr;
}
