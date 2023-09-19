import { fragmentBySegmentDepth } from "../utils/fragmentBySegmentDepth";

function resultsView(data) {
  const polarityToEmoticonMap = {
    "P+": ["😄", "😁", "👍"],
    P: ["🙂", "😃", "👌", "💖"],
    NEU: ["😐", "😶", "🤔", "🤷"],
    N: ["😞", "😔", "👎"],
    "N+": ["😢", "😡", "💔"],
    NONE: "",
  };

  return `
      <div class="attributes-panel">
              <div class="attribute_big">
                <p class="title">Polarity</p>
                <span class="value">${
                  polarityToEmoticonMap[data.score_tag][
                    Math.round(Math.random() * 2)
                  ]
                }</span>
              </div>
              <div class="attribute_big">
                <p class="title">Confidence</p>
                <span class="value">${data.confidence}%</span>
              </div>
              <div class="attribute_small">
                ${data.agreement === "AGREEMENT" ? "Agreement" : "Disagreement"}
              </div>
              <div class="attribute_small">
                ${
                  data.subjectivity === "SUBJECTIVE" ? " Subjetive" : "Objetive"
                }
              </div>
              <div class="attribute_small">
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

  const polarityToClassNameMap = {
    "P+": "highlight_strong-positive",
    P: "highlight_positive",
    NEU: "highlight_neutral",
    N: "highlight_negative",
    "N+": "highlight_strong-negative",
    NONE: "",
  };

  let ans = "";
  let curr = 0;
  for (let fragment of fragments) {
    ans +=
      (fragment.deep > curr
        ? `<span class="${polarityToClassNameMap[fragment.score_tag]}">`
        : "</span>") + fragment.text;
    curr = fragment.deep;
  }
  return ans + "</span>";
}

export { resultsView };
