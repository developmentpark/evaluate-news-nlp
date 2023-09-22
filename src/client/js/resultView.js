import { fragmentBySegmentDepth } from "../utils/fragmentBySegmentDepth";

const polarityToClassNamesMap = {
  "P+": ["highlight_strong-positive", "attribute_strong-positive"],
  P: ["highlight_positive", "attribute_positive"],
  NEU: ["highlight_neutral", "attribute_neutral"],
  N: ["highlight_negative", "attribute_negative"],
  "N+": ["highlight_strong-negative", "attribute_strong-negative"],
  NONE: ["", "attribute_none"],
};

function resultsView(data) {
  const polarityToEmoticonMap = {
    "P+": ["😄", "😁", "👍"],
    P: ["🙂", "😃", "👌", "💖"],
    NEU: ["😐", "😶", "🤔", "🤷"],
    N: ["😞", "😔", "👎"],
    "N+": ["😢", "😡", "💔"],
    NONE: "",
  };

  const getClassNameByConfidence = (confidence) => {
    if (confidence < 50) {
      return polarityToClassNamesMap["N+"][1];
    }
    if (confidence < 90) {
      return polarityToClassNamesMap["N"][1];
    }
    if (confidence < 95) {
      return polarityToClassNamesMap["P"][1];
    }
    return polarityToClassNamesMap["P+"][1];
  };

  return `
      <div class="attributes-panel">
              <div class="attribute_big">
                <p class="title ${
                  polarityToClassNamesMap[data.score_tag][1]
                }">Polarity</p>
                <span class="value">${
                  polarityToEmoticonMap[data.score_tag][
                    Math.round(Math.random() * 2)
                  ]
                }</span>
              </div>
              <div class="attribute_big">
                <p class="title ${getClassNameByConfidence(
                  data.confidence,
                )}">Confidence</p>
                <span class="value">${data.confidence}%</span>
              </div>
              <div class="attribute_small attribute_none">
                ${data.agreement === "AGREEMENT" ? "Agreement" : "Disagreement"}
              </div>
              <div class="attribute_small attribute_none">
                ${
                  data.subjectivity === "SUBJECTIVE" ? " Subjetive" : "Objetive"
                }
              </div>
              <div class="attribute_small attribute_none">
                ${data.irony === "IRONIC" ? "Ironic" : "Non Ironic"}
              </div>
            </div>
            <div class="text-panel">
              <p class="text-panel__text">
                ${textView(data)}
              </p>
              <div class="text-panel__tags">
                <div class="tag_strong-positive">Strong Positive</div>
                <div class="tag_positive">Positive</div>
                <div class="tag_neutral">Neutral</div>
                <div class="tag_negative">Negative</div>
                <div class="tag_strong-negative">Strong Negative</div>
              </div>
            </div>
    `;
}

function textView(data) {
  const fragments = data.sentence_list
    .map((s) => fragmentBySegmentDepth(s))
    .flat();

  let ans = "";
  let curr = 0;
  for (let fragment of fragments) {
    ans +=
      (fragment.deep > curr
        ? `<span class="${polarityToClassNamesMap[fragment.score_tag][0]}">`
        : "</span>") + fragment.text;
    curr = fragment.deep;
  }
  return ans + "</span>";
}

export { resultsView };
