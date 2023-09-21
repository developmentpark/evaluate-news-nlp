const responses = [
  {
    status: {
      code: "0",
      msg: "OK",
      credits: "1",
    },
    model: "Restaurants_en",
    score_tag: "P",
    agreement: "DISAGREEMENT",
    subjectivity: "SUBJECTIVE",
    confidence: "98",
    irony: "NONIRONIC",
    sentence_list: [
      {
        text: "Main dishes were quite good, but desserts were too sweet for me.",
        inip: "0",
        endp: "63",
        confidence: "98",
        score_tag: "P",
        agreement: "DISAGREEMENT",
        segment_list: [
          {
            text: "Main dishes were quite good",
            inip: "0",
            endp: "26",
            confidence: "98",
            score_tag: "P+",
            agreement: "AGREEMENT",
          },
          {
            text: "desserts were too sweet for me",
            inip: "33",
            endp: "62",
            confidence: "100",
            score_tag: "N",
            agreement: "AGREEMENT",
          },
        ],
      },
    ],
  },
  {
    agreement: "AGREEMENT",
    confidence: "100",
    irony: "NONIRONIC",
    model: "general_en",
    score_tag: "N+",
    sentence_list: [
      {
        agreement: "AGREEMENT",
        confidence: "100",
        endp: "257",
        inip: "0",
        score_tag: "N+",
        segment_list: [
          {
            agreement: "AGREEMENT",
            confidence: "100",
            endp: "257",
            inip: "0",
            score_tag: "N+",
            segment_list: [
              {
                agreement: "AGREEMENT",
                confidence: "100",
                endp: "38",
                inip: "27",
                score_tag: "N",
                text: "the Avengers",
              },
              {
                agreement: "AGREEMENT",
                confidence: "100",
                endp: "173",
                inip: "130",
                score_tag: "P",
                text: "a Hydra outpost led by Wolfgang von Strucker",
              },
            ],
            text: "In the country of Sokovia, the Avengers – Tony Stark, Steve Rogers, Thor, Bruce Banner, Natasha Romanoff, and Clint Barton – raid a Hydra outpost led by Wolfgang von Strucker, who has been experimenting on humans using the scepter previously wielded by Loki.",
          },
        ],
        text: "In the country of Sokovia, the Avengers – Tony Stark, Steve Rogers, Thor, Bruce Banner, Natasha Romanoff, and Clint Barton – raid a Hydra outpost led by Wolfgang von Strucker, who has been experimenting on humans using the scepter previously wielded by Loki.",
      },
      {
        agreement: "AGREEMENT",
        confidence: "100",
        endp: "472",
        inip: "259",
        score_tag: "N",
        segment_list: [
          {
            agreement: "AGREEMENT",
            confidence: "100",
            endp: "343",
            inip: "259",
            score_tag: "NONE",
            segment_type: "secondary",
            text: "They encounter two of Strucker's experiments – twins Pietro, who has superhuman speed",
          },
          {
            agreement: "AGREEMENT",
            confidence: "100",
            endp: "433",
            inip: "350",
            score_tag: "N",
            text: "Wanda Maximoff, who can manipulate minds and project energy – and apprehend Strucker",
          },
          {
            agreement: "AGREEMENT",
            confidence: "100",
            endp: "471",
            inip: "436",
            score_tag: "NONE",
            text: "while Stark retrieves Loki's scepter",
          },
        ],
        text: "They encounter two of Strucker's experiments – twins Pietro, who has superhuman speed, and Wanda Maximoff, who can manipulate minds and project energy – and apprehend Strucker, while Stark retrieves Loki's scepter.",
      },
    ],
  },
];

const outputsForFragmentBySegmentDepth = [
  [
    {
      text: "",
      deep: 1,
      confidence: "98",
      score_tag: "P",
      agreement: "DISAGREEMENT",
    },
    {
      text: "Main dishes were quite good",
      deep: 2,
      confidence: "98",
      score_tag: "P+",
      agreement: "AGREEMENT",
    },
    {
      text: ", but ",
      deep: 1,
      confidence: "98",
      score_tag: "P",
      agreement: "DISAGREEMENT",
    },
    {
      text: "desserts were too sweet for me",
      deep: 2,
      confidence: "100",
      score_tag: "N",
      agreement: "AGREEMENT",
    },
    {
      text: ".",
      deep: 1,
      confidence: "98",
      score_tag: "P",
      agreement: "DISAGREEMENT",
    },
  ],
  [
    {
      text: "",
      deep: 1,
      confidence: "100",
      score_tag: "N+",
      agreement: "AGREEMENT",
    },
    {
      text: "In the country of Sokovia, ",
      deep: 2,
      confidence: "100",
      score_tag: "N+",
      agreement: "AGREEMENT",
    },
    {
      text: "the Avengers",
      deep: 3,
      confidence: "100",
      score_tag: "N",
      agreement: "AGREEMENT",
    },
    {
      text: " – Tony Stark, Steve Rogers, Thor, Bruce Banner, Natasha Romanoff, and Clint Barton – raid ",
      deep: 2,
      confidence: "100",
      score_tag: "N+",
      agreement: "AGREEMENT",
    },
    {
      text: "a Hydra outpost led by Wolfgang von Strucker",
      deep: 3,
      confidence: "100",
      score_tag: "P",
      agreement: "AGREEMENT",
    },
    {
      text: ", who has been experimenting on humans using the scepter previously wielded by Loki.",
      deep: 2,
      confidence: "100",
      score_tag: "N+",
      agreement: "AGREEMENT",
    },
    {
      text: "",
      deep: 1,
      confidence: "100",
      score_tag: "N+",
      agreement: "AGREEMENT",
    },
  ],
  [
    {
      text: "",
      deep: 1,
      confidence: "100",
      score_tag: "N",
      agreement: "AGREEMENT",
    },
    {
      text: "They encounter two of Strucker's experiments – twins Pietro, who has superhuman speed",
      deep: 2,
      confidence: "100",
      score_tag: "NONE",
      agreement: "AGREEMENT",
    },
    {
      text: ", and ",
      deep: 1,
      confidence: "100",
      score_tag: "N",
      agreement: "AGREEMENT",
    },
    {
      text: "Wanda Maximoff, who can manipulate minds and project energy – and apprehend Strucker",
      deep: 2,
      confidence: "100",
      score_tag: "N",
      agreement: "AGREEMENT",
    },
    {
      text: ", ",
      deep: 1,
      confidence: "100",
      score_tag: "N",
      agreement: "AGREEMENT",
    },
    {
      text: "while Stark retrieves Loki's scepter",
      deep: 2,
      confidence: "100",
      score_tag: "NONE",
      agreement: "AGREEMENT",
    },
    {
      text: ".",
      deep: 1,
      confidence: "100",
      score_tag: "N",
      agreement: "AGREEMENT",
    },
  ],
];

const testCasesForFragmentBySegmentDepth = responses
  .map((r) => r.sentence_list)
  .flat()
  .map((s, idx) => ({
    input: s,
    expected: outputsForFragmentBySegmentDepth[idx],
  }));

export { testCasesForFragmentBySegmentDepth };
