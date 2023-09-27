> 🌱 This project stands as a humble testament to the dedication and perseverance in my web development journey. It mirrors the invaluable knowledge and skills cultivated during my enriching experience with the Udacity Frontend Nanodegree program.

<h1 align="center">Sentiment Analyzer</h1>

<p style="display:flex;gap:4px">
<a href="https://github.com/developmentpark/evaluate-news-nlp/actions/workflows/ci.yml"><img src="https://github.com/developmentpark/evaluate-news-nlp/actions/workflows/ci.yml/badge.svg?branch=dev"/></a>
<a href="https://github.com/developmentpark/evaluate-news-nlp/actions/workflows/deploy.yml"><img src="https://github.com/developmentpark/evaluate-news-nlp/actions/workflows/deploy.yml/badge.svg?branch=main"/></a>
</p>

<p align="center">
<b>Discover the Emotions Behind the Words</b></p>

<p align="center">
<img src="https://lh3.googleusercontent.com/pw/ADCreHdzFseAMwKbjUaKsdnMjWt1zzOcHAzEP492pyQYmN55VqXiH5syA_Tg0XDvETe-jl-IzXhmOf6lvqS8rv920Q9zj_dihD_Mo-FakSTpqZVAPxmMI4IBVCQSF3vgqYGzkUCXrZFWmwuDHWCESiinmcE=w500-h500-s-no?authuser=0" width="300px"/>
</p>

**Sentiment Analyzer** is a powerful tool that allows you to analyze sentiments and emotions expressed in articles and blogs from other websites. This application is designed to provide you with valuable insights into the tone and emotion of online content, helping you better understand the opinions and attitudes present in those texts.

The ability to interpret emotions and sentiments from text holds immense value in various domains. Whether it's gauging public sentiment towards a product, analyzing user reviews, or understanding the emotional tone of news articles, there's a growing need for a tool that can peel back the layers of language and reveal the emotional landscape beneath.
While there are existing technologies that address sentiment analysis, they often remain inaccessible to many people due to their technical complexity or high costs. Sentiment Analyzer bridges this gap by focusing on making this advanced NLP technology accessible to a wider audience.

So, in essence, Sentiment Analyzer addresses the problem of democratizing the value of sentiment analysis by providing an accessible, user-centric, and interactive solution that leverages the power of NLP technology. It aims to empower users, regardless of their technical expertise, to harness the benefits of sentiment analysis for better decision-making and understanding of textual content.

## Key Features

- **Sentiment Analysis**: The Sentiment Analyzer uses Natural Language Processing (NLP) techniques to identify emotions and sentiments in an article.

- **Accurate Summaries**: It provides concise summaries of the polarity of a text, its level of subjectivity or objectivity, and an overall accuracy of detected emotions.

- **Intuitive Interface**: The user interface is designed to be simple and user-friendly. Simply input the URL of the article and get instant results.

- **API Integration**: The Sentiment Analyzer integrates with the Meaningcloud API, which leverages advanced NLP techniques for text analysis.

## Tech

To achieve this, a combination of modern technologies were used, including:

- HTML
- CSS
- JavaScript
- NodeJS
- Express

and tools that facilitated development, optimization and code quality:

- Webpack
- Jest
- Sass
- ESLint & Prettier
- GitHub Actions
- Heroku

## How to Use

**Using the local version (Development)**

If you'd like to run the Sentiment Analyzer locally for development or customization purposes, follow these steps:

- Clone this repository to your local machine.
- Configure environment variables:
  Client:
  The client retrieves the API URL from the `API_URL`environment variable.
  Server:
  ```
  API_KEY: Your Meaningcloud API key.
  BASE_URL: The base URL for the Meaningcloud API.
  SERVER_PORT: The port on which the server will run.
  SERVER_HOST: The host for the server.
  ```
- Install dependencies using `npm install`.
- Run the application with `npm start`.

**Using the live version**

You can access the <a href="https://developmentpark.github.io/evaluate-news-nlp/" style="color:#4e4e4e;background-color:#38f21d;padding:6px 10px;font-weight:600;border-radius:6px;"><button>live version</button></a> 🚀

## License

This project is licensed under the MIT License.
