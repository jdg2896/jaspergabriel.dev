---
title: "5 Things I've Learned from the AWS Startups Build Accelerator 2023"
description: "Key startup lessons: focus on customers, scope MVPs properly, leverage existing solutions, and iterate toward MLP."
pubDate: 2023-12-17
tags: ["personal"]
originalUrl: "https://dev.to/kshyun28/5-things-ive-learned-from-the-aws-startups-build-accelerator-2023-5dml"
---


Before [Y Combinator](https://www.ycombinator.com/) was [founded in 2005](https://foundersatwork.posthaven.com/grow-the-puzzle-around-you/) and ran its [first successful summer batch](https://www.businessofbusiness.com/articles/y-combinator-where-are-they-now-first-batch-reddit-twitch/), startup accelerators weren't a thing. Now, there are [hundreds (if not thousands) of startup accelerators around the world](https://about.crunchbase.com/blog/100-startup-accelerators-around-the-world/). One of the accelerator programs startups can join is the [AWS Startups Build Accelerator](https://aws.amazon.com/startups/accelerators/build), which is a 10-week virtual program that provides training and support for launching MVPs to market.

For the 2023 cohort, out of 2000+ startups that applied, 500+ startups were selected for the program [including ours](https://www.linkedin.com/posts/p33r-finance_p33r-awsbuildaccelerator-activity-7121072561857208320-U9f-/). The program provided $2,000 in AWS credits, self-paced courses on [AWS Skill Builder](https://skillbuilder.aws/), a [Slack](https://slack.com/) community with other startup founders, and live AMA sessions with AWS Solution Architects. 

In the 10 weeks the program ran, the following topics were covered:
- Understanding Customers
- Frontend Development
- Backend Development
- Security
- Scalable Architectures
- Databases 
- Best Practices
- Generative AI
- Leveraging Vendors
- Innovating Iteratively Post-Launch

With the AWS Startups Build Accelerator for 2023 finally wrapped up, it's time to reflect on the lessons learned. 

In this article, I'll be sharing five things I've learned throughout the program. The lessons cover what I feel is essential for building successful MVPs, which can lead to further funding rounds and startup growth. 

Even though the accelerator program was intended for technical founders, non-technical founders and fellow software engineers can also find some valuable lessons applicable to their own startup journeys.

## 1. Focus on the customer

> [It's easier to make things people want than to make people want things.](https://www.intercom.com/blog/making-things-people-want/)

One of the recurring themes in the weekly sessions was the emphasis on bringing value to customers. It makes sense since startups try to provide solutions to problems that customers are willing to pay.

In order to provide value to customers, we first need to define who our potential customers are. One way to do this is by building a [Customer Persona](https://blog.hubspot.com/marketing/buyer-persona-research). 

Here are some questions to answer when building your **customer persona**:
- Who are our customers?
- What are their pain points?
- Why are they trying to solve the pain?
- How can we help them?

Once you've defined who your customer is, it's time to build something functional that adds value to customers. 

You should also focus on your [Unique Value Proposition (UVP)](https://www.omniconvert.com/what-is/uvp-unique-value-proposition/), which defines how your potential customers will benefit from your solution. 

A framework for defining your UVP is, **"We help X do Y by doing Z"**. 

When presenting your UVP to your potential customers, focus on the **benefits**, and reinforce it with **features**.

Another thing to keep in mind is the customer's data. Make sure to securely handle customer data, especially [Personally Identifiable Information (PII)](https://www.dol.gov/general/ppii#:~:text=Personal%20Identifiable%20Information%20(PII)%20is,either%20direct%20or%20indirect%20means.).

Remember, [data security is part of the user experience](https://www.codemotion.com/magazine/frontend/design-ux/ux-design-enhance-data-security/).

## 2. Scope your MVP
> [Don't over-engineer or over-innovate.](https://www.linkedin.com/pulse/when-less-more-danger-over-engineering-trienpont-international/)

Once you've defined the customer pain points you're trying to solve, it's time to scope your MVP. 

Oftentimes, we make the mistake of thinking too far ahead in the future, losing focus on what's important. 

Remember, the point of building an MVP is to **validate** if your idea will solve the customer's **pain points**, and if customers are willing to **pay** to use your product. 

For scoping out your MVP, here are some guidelines:
- Who are your target customers?
- What is the problem that you're trying to solve?
- How will you solve that problem?

Make sure to focus on features that will provide value to your potential customers.

## 3. Leverage existing solutions for non-core functionality

> [Don't reinvent the wheel.](https://softwareengineering.stackexchange.com/questions/29513/is-reinventing-the-wheel-really-all-that-bad)

After defining both your customers and the scope of your MVP, it's time to start building. 

One mistake that I've encountered a lot is trying to build **every part** of the system. This can be a costly mistake, especially for early-stage startups where your main goal is to **validate your idea**. 

By trying to build parts of your system that don't provide value to customers, you risk losing your ability to move quickly and pivot if your assumptions are wrong. 

There's also an opportunity cost since instead of building actual features that customers want, you're wasting time building something that could easily be built with an existing solution.

An example of where you can use existing solutions is **authentication and user management**. Building one from scratch will take a lot of time and won't be as secure as the existing solutions.  

The exception here is if your startup is focused on providing authentication services, then it's a core part of your business and you should build it. 

Here are some examples of services where you can use existing solutions:
- **Authentication and User Management**:
  - [Cognito](https://aws.amazon.com/cognito/)
  - [Auth0](https://auth0.com/)
  - [Okta](https://www.okta.com/)
- **AI Solutions**:
  - [OpenAI](https://openai.com/)
  - [AWS](https://aws.amazon.com/generative-ai/)
  - [Google Cloud](https://cloud.google.com/ai/generative-ai) 
  - [Azure](https://azure.microsoft.com/en-us/solutions/ai)
  
By using existing solutions, you allow your startup to go to market faster, and actually validate your ideas and get customer feedback.

Just remember, [every code you write becomes technical debt](https://www.tokyodev.com/articles/all-code-is-technical-debt).

### Become a Great Buyer

![AWS Well-Architected for Vendors](https://res.cloudinary.com/dlieqpdfd/image/upload/v1702811772/AWS%20Startups%20Build%20Accelerator%202023/AWS_Well-Architected_rkxgx9.png)

For guidelines on selecting 3rd-party vendors, the [AWS Well-Architected Framework](https://docs.aws.amazon.com/wellarchitected/latest/framework/welcome.html) can be applied here.

- **Operational Excellence** - Consider differentiation, switching cost, and criticality.
- **Security** - Consider compliance attestations in the short to long term.
- **Reliability** - Consider reputation, funding, and existing traction.
- **Performance** - Consider product use patterns, frequency of need, and scalability.
- **Cost Efficiency** - Consider vendor costs in the pricing model.

Use these guidelines when evaluating which vendor to use. 

### Outgrowing an existing solution 

Eventually, if your idea is correct and you've found loyal customers, your startup will go through a rapid growth phase. 

In this case, you might outgrow solutions from existing vendors. You can also use the Well-Architected Framework to re-evaluate if the 3rd-party solutions are still worth it, or if it's time to **move** to another vendor or **build** a custom solution. 

It might be time to move away from a vendor if:
  - **Pricing** is prohibitively expensive at scale.
  - **Security** is not compliant with your business requirements (HIPAA, ISO, SOC2).
  - **Scalability** is not being supported, vendor solution is unstable.
  - **Performance** is not predictable.

### Leveraging existing solutions with the startup I'm working with

Here is an example of leveraging existing solutions in the startup I'm currently working with. 

We have a service that allows customers to **sell their crypto** and **receive fiat** in their **bank accounts or e-wallets**. 

![Rails by P33R Finance High-Level Architecture](https://res.cloudinary.com/dlieqpdfd/image/upload/v1702811773/AWS%20Startups%20Build%20Accelerator%202023/Rails_Architecture_uosozm.png)

There are two things in this flow where we opted to use a 3rd-party vendor:
- Transaction gas fee computation
- Blockchain smart contract events alerting

In order to deposit crypto into the smart contract, we used [Web3.js](https://web3js.org/) to interact with the smart contract. 

For sending transactions, we needed to properly compute gas fees. In testing our MVP, we've found that sometimes the default gas values provided by Web3.js weren't enough, which caused some transactions to fail.

Luckily, [MetaMask's Gas API was recently released to the public](https://metamask.io/news/developers/metamasks-gas-api-is-now-available-to-any-developer-via-infura/). Since [MetaMask](https://metamask.io/) is a leading crypto wallet and its Gas API is battle-tested in production, we decided to use their Gas API instead of building our own solution.

Then after the crypto is deposited to the smart contract, we are using smart contract events to start the process of sending fiat to the customer.

We originally implemented our own solution to listen and send smart contract events, which I documented [here](https://dev.to/kshyun28/how-to-implement-and-deploy-a-smart-contract-event-listener-with-aws-cdk-b1). Later, we found out that it was causing problems and was harder to maintain at this early stage, so we switched to a 3rd-party solution with [QuickNode](https://www.quicknode.com/).

In hindsight, we should've done this from the start, but that's what happens when you reflect on your experiences. You discover better ways to approach a problem or improve an existing solution.  

## 4. Aim for iteration, not perfection

> [Iterate towards an MLP (Minimum Lovable Product).](https://www.aha.io/roadmapping/guide/plans/what-is-a-minimum-lovable-product)

![Build, Test, Iterate](https://res.cloudinary.com/dlieqpdfd/image/upload/v1702811772/AWS%20Startups%20Build%20Accelerator%202023/Build_Test_Iterate_hfkx9r.png)

After launching your MVP, you might think the journey is over and you can just wait to gain new customers. Well, not quite.

The work is just getting started after you launch your MVP. You'll need to continuously test, gather customer feedback, and improve your existing product. That's the only way you'll get and retain loyal customers, and in turn, grow your startup. 

### Testing your MVP

Before conducting tests with real customers, you first need to make sure that you have sufficient monitoring in place for your systems.

Ideally, you should be monitoring the **health of your systems** and **key metrics** that define success for your MVP. By having monitoring in place, you don't rely on customers (you shouldn't) to tell you that your product is not working. 

After ensuring you have proper monitoring, you can conduct testing for your MVP.

Here are some approaches you can try for testing your MVP:
- [UX Testing](https://www.browserstack.com/guide/what-is-ux-testing)
- [Beta Testing](https://www.productplan.com/glossary/beta-test/)
- [A/B Tests](https://www.optimizely.com/optimization-glossary/ab-testing/)

And here are additional ways to capture customer feedback:
- Survey tools:
  - [Survey Monkey](https://www.surveymonkey.com/)
  - [Typeform](https://www.typeform.com/try/typeformbrand/)
- [Customer interviews](https://www.userinterviews.com/blog/the-ultimate-guide-to-doing-kickass-customer-interviews)
- [Focus groups](https://www.questionpro.com/blog/focus-group/)

One tip for gathering customer feedback is to make it convenient. **Make it easy for customers to provide feedback**.

Then make sure you also have a presence in other channels such as:
- Chatbots
- Cloud-based call center
- Notifications (push, SMS, email)
- Social channels

### Iterating your MVP

Once you've gathered enough customer feedback, it's now time to iterate your product. 

Before you can quickly iterate your product, you need to have the proper infrastructure set in place to support fast iterations. Consider setting up [Continuous Integration / Continuous Deployment (CI/CD)](https://about.gitlab.com/topics/ci-cd/) pipelines and versioning. 

Having a **CI/CD pipeline** allows you to automate repetitive tasks, such as building deployment files, running unit and integration tests, and so on. 

**Versioning** on the other hand allows you to keep track of your deployments, and if an issue occurs, you can quickly pinpoint which version caused the issues.

After addressing the infrastructure, it's time to review customer feedback. Make sure to allocate time to address issues raised by customers.

Then here are ways to deal with different types of feedback:
- **Positive feedback**
    - Can be published as customer testimonials (with permission)
    - Builds credibility and trust
- **Negative feedback**
    - Opportunity to learn, adapt, and adjust approach to better meet customer expectations

Make sure to reflect the customer's voices into your products, be adaptable, and iterate as needed.

## 5. Document wins and failures
> [“We do not learn from experience... we learn from reflecting on experience.”](https://plan.io/blog/lessons-learned-from-failed-projects/) ― John Dewey

Lastly, we should try to put as much as possible into writing. This means adding proper READMEs to code, creating diagrams on the system architecture and user journeys, and documenting decisions with [RFCs](https://www.ietf.org/standards/rfcs/) and [ADRs](https://adr.github.io/).

I haven't used RFCs and ADRs much, but there should be enough resources to help you get started in the links above.

Also, here's a useful resource for RFCs, [Companies Using RFCs or Design Docs and Examples of These](https://blog.pragmaticengineer.com/rfcs-and-design-docs/).

My lack of experience in using tools like RFCs and ADRs showed me the bad side of not properly documenting architecture, code, and decisions. 

Some of the negatives when you don't document wins and failures:
- harder to onboard new engineers.
- [knowledge silos](https://www.thrivelearning.com/lms-glossary/what-is-a-knowledge-silo), where information is isolated to a few members of the team.
- issues repeat themselves (because of a lack of proper documentation).

By starting to document wins and failures, only then can we learn from our experiences and be better engineers, be better startups. 

## Conclusion

To recap, I shared what I've learned in the AWS Startups Build Accelerator 2023, which are:
- bringing value to customers
- scoping out MVPs
- leveraging existing solutions from vendors
- testing and iterating towards an MLP (Minimum Lovable Product)
- documenting wins and failures. 

I hope you've picked up an idea or two from the lessons I shared, and may it help you in your own startup journey. 

Thank you for reading and if you have any questions or feedback, feel free to comment or connect with me [here](https://linktr.ee/kshyun28).

## Resources
- [Grow the Puzzle Around You - Jessica Livingston (Y Combinator)](https://foundersatwork.posthaven.com/grow-the-puzzle-around-you/)
- [Y Combinator's First Batch: Where are they now?](https://www.businessofbusiness.com/articles/y-combinator-where-are-they-now-first-batch-reddit-twitch/)
- [100 Startup Accelerators Around the World You Need to Know About](https://about.crunchbase.com/blog/100-startup-accelerators-around-the-world/)
- [AWS Startups Build Accelerator](https://aws.amazon.com/startups/accelerators/build)
- [Making things people want](https://www.intercom.com/blog/making-things-people-want/)
- [How to Create Detailed Buyer Personas for Your Business](https://blog.hubspot.com/marketing/buyer-persona-research)
- [7 Ways to Use UX Design to Enhance User Data Security](https://www.codemotion.com/magazine/frontend/design-ux/ux-design-enhance-data-security/)
- [What is UVP (Unique Value Proposition)](https://www.omniconvert.com/what-is/uvp-unique-value-proposition/)
- [When Less Is More: The Danger of Over-Engineering](https://www.linkedin.com/pulse/when-less-more-danger-over-engineering-trienpont-international/)
- [Is reinventing the wheel really all that bad?](https://softwareengineering.stackexchange.com/questions/29513/is-reinventing-the-wheel-really-all-that-bad)
- [All code is technical debt](https://www.tokyodev.com/articles/all-code-is-technical-debt)
- [AWS Well-Architected Framework](https://docs.aws.amazon.com/wellarchitected/latest/framework/welcome.html)
- [What is a Minimum Lovable Product (MLP)?](https://www.aha.io/roadmapping/guide/plans/what-is-a-minimum-lovable-product)
- [What is UX Testing with example](https://www.browserstack.com/guide/what-is-ux-testing)
- [What is Beta Testing?](https://www.productplan.com/glossary/beta-test/)
- [What is A/B Testing?](https://www.optimizely.com/optimization-glossary/ab-testing/)
- [The Ultimate Guide to Doing Kickass Customer Interviews](https://www.userinterviews.com/blog/the-ultimate-guide-to-doing-kickass-customer-interviews)
- [Focus group: What It Is and How to Conduct It + Examples](https://www.questionpro.com/blog/focus-group/)
- [What is CI/CD?](https://about.gitlab.com/topics/ci-cd/)
- [What to Do When a Project Fails: How to Document and Share Lessons Learned](https://plan.io/blog/lessons-learned-from-failed-projects/)
- [IETF: Requests For Comment (RFCs)](https://www.ietf.org/standards/rfcs/)
- [Companies Using RFCs or Design Docs and Examples of These](https://blog.pragmaticengineer.com/rfcs-and-design-docs/)
- [Architectural Decision Records (ADRs)](https://adr.github.io/)
