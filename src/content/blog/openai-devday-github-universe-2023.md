---
title: "OpenAI DevDay and GitHub Universe 2023: What It Means for Us Software Engineers"
description: "Analysis of GPT-4 Turbo, Copilot Chat, and Assistants API — what these AI advancements mean for software engineers."
pubDate: 2023-11-12
tags: ["tech", "ai"]
originalUrl: "https://dev.to/jdg2896/openai-devday-and-github-universe-2023-what-it-means-for-us-software-engineers-297e"
---


## Introduction

Earlier this week, the team and I rented an Airbnb to prepare for our upcoming [demo day](https://www.eventbrite.co.uk/e/tenity-singapore-incubation-batch-vi-demoday-tickets-740213898697) on November 23rd. We had internal discussions and started preparing our pitch deck. Then while on a break, looking for videos to watch on YouTube, we happened to see a recent video on [OpenAI's DevDay](https://www.youtube.com/watch?v=U9mJuUkhUzk&ab_channel=OpenAI). After watching the video, we were amazed, and we started discussing the possibilities enabled by OpenAI's new features. After a few days, [GitHub Universe 2023](https://www.youtube.com/watch?v=NrQkdDVupQE) started. We binged the keynotes which added to our excitement and slight worries.

Our feelings of excitement stemmed from discussions on how we can leverage AI to improve developer workflows and stay lean at our startup. Meaning not needing to hire additional engineering resources while we build out our MVPs. There are also new features that make it easier to integrate AI assistants into our future applications, which helps in providing a modern experience. 

Our worries came from the disruptions caused by AI advancements. We can't help but think about our future job security since AI is becoming more capable of doing development tasks. We also thought about how certain startups can become obsolete after OpenAI's announcements. 

If you're a software engineer wondering what these developments mean for you, then you've come to the right place. In this article, I'll recap what we've witnessed from OpenAI and GitHub. Then I'll share some thoughts on its impact on us software engineers. 

## OpenAI DevDay

OpenAI had its first [DevDay](https://devday.openai.com/), which generated a lot of buzz throughout the AI and developer communities. Let's go through the key features.

### GPT-4 Turbo

The first announcement introduced [GPT-4 Turbo](https://help.openai.com/en/articles/8555510-gpt-4-turbo), the latest generation model from OpenAI that had the following updates:
- Four times more **context length** than the previous GPT-4 model (32k tokens) at **128k tokens**.
- **Cheaper pricing** for input and output tokens.
- More recent knowledge cut-off date of **April 2023**.
- Support for **function calling** and **JSON mode**.
- Support for **code interpreter**.
- Reproducible outputs with **seed** parameter.

Context length is important in GPTs because the more details and instructions you can provide, the more accurate the GPTs' responses will be. Combined with cheaper pricing, you can provide more context that is cost-effective. 

Support for function calling and JSON mode allows for easier API integrations when using GPT-4 Turbo and other supported models. 

Then support for code interpreters allows GPTs to generate and run Python code as needed. This allows for use cases that need to parse and process files, calculate data, and a lot more.

### "GPTs"

The next announcement was about "GPTs", where users can create their own GPT versions for different use cases without having to write code. Sam Altman demoed this functionality by creating a "Startup Mentor" GPT since he usually gets similar questions from early-stage startup founders during [YC office hours](https://www.ycombinator.com/blog/open-office-hours-sign-up-for-office-hours-with-yc-partners).

![OpenAI DevDay - Sam Altman's Demo](https://res.cloudinary.com/dlieqpdfd/image/upload/v1699801523/OpenAI%20DevDay%20and%20GitHub%20Universe%202023/openai-devday-2_nzh2tq.png)
> *Screenshot from [OpenAI's DevDay video](https://www.youtube.com/watch?v=U9mJuUkhUzk&ab_channel=OpenAI) on OpenAI's YouTube channel.*

A GPT store will also be rolled out later this month allowing users to share their work with the public and possibly earn money depending on their GPTs' usage and popularity.

### Assistants API

After that, they showed the new Assistants API. With similar capabilities to GPTs, this enables developers to leverage GPTs programmatically for their use cases. 

The demo shown using this feature was on a sample travel website, where users can use an AI assistant to plan their travels. 

![OpenAI DevDay - Assistants API Demo](https://res.cloudinary.com/dlieqpdfd/image/upload/v1699801522/OpenAI%20DevDay%20and%20GitHub%20Universe%202023/openai-devday-1_viqzfr.png)
> *Screenshot from [OpenAI's DevDay video](https://www.youtube.com/watch?v=U9mJuUkhUzk&ab_channel=OpenAI) on OpenAI's YouTube channel.*

## GitHub Universe 2023

After a few days, GitHub Universe 2023 opened up with some exciting announcements. Let's walk through the key highlights.

### Copilot Chat

The first announcement made was with [Copilot Chat](https://docs.github.com/en/copilot/github-copilot-chat/using-github-copilot-chat-in-your-ide), which is coming in December. 

![GitHub Universe 2023 - Copilot Chat Demo](https://res.cloudinary.com/dlieqpdfd/image/upload/v1699801522/OpenAI%20DevDay%20and%20GitHub%20Universe%202023/github-universe-2023-1_iqqvkz.png)
> *Screenshot from [GitHub Universe 2023 video](https://www.youtube.com/watch?v=NrQkdDVupQE&ab_channel=GitHub) on GitHub's YouTube channel.*

This brings different features such as:
- Using GPT-4 models
- Code-aware guidance and code generation
- Iterate on code in line
- Shortcuts to generate unit tests, fix suggestions, pull request descriptions, and much more.

All of these features are integrated into popular IDEs such as VS Code, which helps with staying in the development flow. 

### Copilot Enterprise

While Copilot Chat is integrated per repository, Copilot Enterprise is instead integrated with your organization's codebase. 

This helps developers quickly get insights, especially in large organizations with thousands of repositories and billions of lines of code. 

### AI-Powered Security

Then, an announcement on AI-powered security was made. This helps minimize insecure coding practices by detecting and correcting hard-coded credentials and secrets, and vulnerabilities such as SQL injection.

## What These AI Announcements Mean for Us Software Engineers

### The Positives

Most of the announced features are aimed at improving developer experiences. Whether you're a front-end, back-end, full-stack, or any other engineering role, these changes can help you be more productive and allow you to focus on building creative solutions to engineering problems.

Here are some ways these AI tools help:
- Integrate AI assistants in your applications with **OpenAI Assistants API**.
- Create **GPTs** for your specific use cases (Code reviewer, Mentor, etc.).
- Implement Test-Driven Development (TDD) with **GitHub Copilot**.
- Improve developer workflows with **GitHub Copilot Chat** and **Copilot Enterprise**:
  - Build documentation
  - Suggest code based on open files and repositories
  - Generate pull request summaries
  - Review pull requests
  - Fix bugs and issues
  - Remediate security vulnerabilities
  - Ask Copilot Chat questions about the codebase

### The Not So Positives

While these AI tools improve developer workflows and productivity, you can also argue that this might lead to a reduction in engineering resources for some companies. Some startups might even become obsolete if they do not pivot or solidify their [unique value proposition (UVP)](https://www.omniconvert.com/what-is/uvp-unique-value-proposition/), which will inevitably cause some job losses. Startups have always been risky, and disruptions are always bound to happen. It's just that advancements in AI accelerated this [disruption cycle](https://gongos.com/thinking-post/how-disruptions-are-born-and-how-it-applies-to-the-market-research-discipline/).

Even with these concerns, I wouldn't worry too much about the job market, especially if you're continuously improving yourself. While there is a **surplus** of **software engineers**, there's also a **shortage** of **talented software engineers**. If you start learning and leveraging these AI tools in your everyday workflows, you can keep up with the latest trends in tech, and in turn, be a valuable asset for any tech company. 

## Conclusion

The opening keynotes from [OpenAI's DevDay](https://www.youtube.com/watch?v=U9mJuUkhUzk&ab_channel=OpenAI) and [GitHub Universe 2023](https://www.youtube.com/watch?v=NrQkdDVupQE&ab_channel=GitHub) showcased new and improved AI tools that software engineers can use to make their development experiences more enjoyable, from prompting ChatGPT and Copilot Chat to generating documentation and unit tests. As tech keeps on evolving, it's important for us as engineers to also adapt, innovate, and continuously learn to keep up with the trend. 

Our team and I have already availed [ChatGPT Plus](https://openai.com/blog/chatgpt-plus), [OpenAI Platform APIs](https://platform.openai.com/docs/overview), and [GitHub Copilot](https://github.com/features/copilot). I'll be playing around and experimenting with these new features and how they can enhance my developer workflows, and I'll be sure to write about interesting stuff I learn along the way.

As we part ways, I thank you for reading and I'll leave you with one question, **How will you leverage these new AI tools in your development workflows?**

## Further Reading and Resources
- [OpenAI DevDay Opening Keynote](https://www.youtube.com/watch?v=U9mJuUkhUzk&ab_channel=OpenAI)
- [GitHub Universe 2023 Opening Keynote](https://www.youtube.com/watch?v=NrQkdDVupQE&ab_channel=GitHub)
- [OpenAI DevDay Landing Page](https://devday.openai.com/)
- [GitHub Universe 2023 Blog](https://github.blog/2023-11-08-universe-2023-copilot-transforms-github-into-the-ai-powered-developer-platform/)
- [The Rise of the AI Engineer - swyx](https://www.latent.space/p/ai-engineer)
