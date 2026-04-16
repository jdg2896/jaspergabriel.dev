---
title: "My First Open Source Contribution: How I Did It"
description: "A walkthrough of making your first open source contribution — finding the right project, following guidelines, and navigating PRs."
pubDate: 2023-08-12
tags: ["tech", "open-source"]
originalUrl: "https://dev.to/kshyun28/my-first-open-source-contribution-how-i-did-it-1jh6"
---


## Introduction

Contributing to open source can seem intimidating, especially to those who've never done open source before. I know I felt intimidated, thinking that open source is only for talented and senior developers. 

While that may be true for those who've made packages and tooling used by thousands (or even millions) of devs, it's not true if you want to contribute to an existing open source project. I've realized that and I'm here to share how I made my first open source contribution. 

If that sounds interesting, then let's continue!

## Finding an Open Source Project to Contribute to

There are a lot of open source projects out there, but where do you start? 

I narrowed it down using these three helpful prompts:
- What specific area of tech am I interested in?
- What are my current skills, or skills I want to improve?
- What's the tech stack of the open source project?

### What specific area of tech am I interested in?

Looking for projects that fit your interests would help you get started. Your interests can be anywhere from frontend templates, developer tools, AI, smart contracts, cybersecurity, etc.

I'm passionate in [Web3](https://ethereum.org/en/web3/), so I tried to find Web3 projects that are open source. Web3 also encourages open source so it wasn't hard looking for one. 

### What are my current skills, or skills I want to improve?

As for skills, what are you currently good at? or want to gain more experience at?

For me, I'm a backend developer that specializes in [Node.js](https://nodejs.org/en) and [TypeScript](https://www.typescriptlang.org/). I've integrated Web3 libraries to Node.js apps, and I've also written technical documentations for previous projects.

With that, I'd look for Node.js and TypeScript projects, where I'm already good at. I won't look for a [Go](https://go.dev/) or [Rust](https://www.rust-lang.org/) project where I don't have the necessary skills to contribute. 

### What's the tech stack of the open source project?

Combining my interests and skills, I've looked at a few open source projects and their tech stacks. 

Ethereum scaling solutions and **zero knowledge (ZK)** are two areas I'm interested in Web3. I've read [Vitalik's](https://en.wikipedia.org/wiki/Vitalik_Buterin) article on [the different types of ZK-EVMs](https://vitalik.ca/general/2022/08/04/zkevm.html). I saw [Taiko](https://taiko.xyz/) as one of the current Type 1 ZK-EVMs in development.

Reviewing Taiko's [monorepo](https://github.com/taikoxyz/taiko-mono) tech stack, I saw that they use TypeScript. Their documentations use [MDX](https://mdxjs.com/), which is an improved version of [markdown](https://www.markdownguide.org/). I've used markdown before so contributing to their docs in MDX is doable.

![Tech stack](https://res.cloudinary.com/dlieqpdfd/image/upload/v1691474895/First%20Open%20Source/tech-stack_ld4fcs.png)

With that, I started preparing to make my first open source contribution with Taiko. 

## Contributing to Taiko

### Reviewing contributing guidelines

Before anything else, I first looked at Taiko's [CONTRIBUTING.md](https://github.com/taikoxyz/taiko-mono/blob/main/CONTRIBUTING.md) file to orient myself on their contributing guidelines:
-  how to contribute
-  coding standards
-  documentation standards
-  helpful tips

![Contributing manual](https://res.cloudinary.com/dlieqpdfd/image/upload/v1691484641/contributing-manual_zkdqv1.png)

Then I saw two ways to contribute in the **Make a contribution** section:
-  Opening a new issue
-  Working on an existing issue 
  
I've chosen to work on an existing issue.

![Make a contribution](https://res.cloudinary.com/dlieqpdfd/image/upload/v1691484642/make-a-contribution_mu7mt3.png)

For coding standards, I looked at the standards and conventions used in the project. I saw that they are using [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/) for pull request titles and commits. 

![Coding standards](https://res.cloudinary.com/dlieqpdfd/image/upload/v1691474892/First%20Open%20Source/coding-standards_uu5nsu.png)

Then for branch naming, I saw that there was no particular convention, so a short branch name describing what it is for should be enough.

![Branches](https://res.cloudinary.com/dlieqpdfd/image/upload/v1691474892/First%20Open%20Source/branches_rnq9pt.png)

### Finding an existing issue to work on

I've tried to look at some **good first issues**, since these are usually not difficult issues, and are meant to help onboard first time contributors. 

![Good first issues](https://res.cloudinary.com/dlieqpdfd/image/upload/v1691474893/First%20Open%20Source/good-first-issues_woykwt.png)

I ended up choosing the issue to **improve their "Node running guide for setting RPC endpoints"**.

Then I reviewed the issue, and looked at the description and comments. I also reviewed the [website](https://taiko.xyz/docs) where the docs are located. 

I made sure I understood what was needed. 

![Issue](https://res.cloudinary.com/dlieqpdfd/image/upload/v1691474893/First%20Open%20Source/issue_o0wkvg.png) 

### Forking, cloning, and working on the changes

After reviewing the issue, I forked and cloned Taiko's [monorepo](https://github.com/taikoxyz/taiko-mono/tree/main). Then I started working on a proof of concept.

![Fork](https://res.cloudinary.com/dlieqpdfd/image/upload/v1691474892/First%20Open%20Source/fork_sppfm3.png)

Locating the code that needs improvement was pretty straight-forward, since the project is structured as a monorepo. The **website** package contains Taiko's guides, so I worked on that.

![Monorepo packages](https://res.cloudinary.com/dlieqpdfd/image/upload/v1691474894/First%20Open%20Source/monorepo-packages_boastr.png)

After I was able to run my local setup and test the changes, I made some comments on the [issue](https://github.com/taikoxyz/taiko-mono/issues/13986) and asked for a review to verify if the changes would solve the issue.

![Issue comment 1](https://res.cloudinary.com/dlieqpdfd/image/upload/v1691474893/First%20Open%20Source/issue-comment-1_ldkopl.png)
![Issue comment 2](https://res.cloudinary.com/dlieqpdfd/image/upload/v1691474893/First%20Open%20Source/issue-comment-2_zsax0a.png)

After getting approval from Dave (d1onys1us), I proceeded to open a [pull request](https://github.com/taikoxyz/taiko-mono/pull/14029). 

![Issue comment 3](https://res.cloudinary.com/dlieqpdfd/image/upload/v1691474893/First%20Open%20Source/issue-comment-3_e0lj36.png)
![PR](https://res.cloudinary.com/dlieqpdfd/image/upload/v1691474895/First%20Open%20Source/pr_hemgln.png)

### Going through the pull request review process

The review process was interesting. While waiting for reviews, I've noticed that there were changes on the main branch that was merged to my feature branch. 

![Merged main](https://res.cloudinary.com/dlieqpdfd/image/upload/v1691474894/First%20Open%20Source/merged-main_r8jk2y.png)

Then I reviewed the changes, and it affected my changes, which didn't make sense when combined with the changes from the main branch. So I decided to take the initiative to improve the section and propose the changes on my ongoing pull request review. 

![PR comment](https://res.cloudinary.com/dlieqpdfd/image/upload/v1691474894/First%20Open%20Source/pr-comment_pu2hbl.png)

The team liked the change, so I proceeded to commit the changes. 

![Reviewer comment 1](https://res.cloudinary.com/dlieqpdfd/image/upload/v1691474894/First%20Open%20Source/reviewer-comment-1_sxm6l1.png)

Then another reviewer commented that I had API keys exposed on the guide images, so I quickly fixed these to resolve the review comment.

![Reviewer comment 2](https://res.cloudinary.com/dlieqpdfd/image/upload/v1691474894/First%20Open%20Source/reviewer-comment-2_vmcnmu.png)

After all of that, my pull request was finally approved and merged!

![PR approved 1](https://res.cloudinary.com/dlieqpdfd/image/upload/v1691474894/First%20Open%20Source/pr-approved-1_aym6sy.png)
![PR approved 2 and merged](https://res.cloudinary.com/dlieqpdfd/image/upload/v1691474894/First%20Open%20Source/pr-approved-2-merged_rjd0zj.png)

Finally, I can say that I've contributed to open source! Got a cool [GitPOAP](https://www.gitpoap.io/) to prove it too! 🙂

![Git POAP](https://res.cloudinary.com/dlieqpdfd/image/upload/v1691474892/First%20Open%20Source/git-poap_xfmpis.png)

## My Takeaways (Conclusion)

Making my first open source contribution helped me realize what open source meant. The value of open source is in its contributors and their contributions, no matter how big or how small. 

Being an open source contributor can also be compared to a boy or girl scout, where the scouts leave the campsite cleaner than when they've found it. When a contributor encounters a bug in a feature or a typo in the documentation of an open source project, they can create an issue along with the fix, leaving the code cleaner than when they've first encountered it.

I also want to thank the team at [Taiko](https://taiko.xyz/) for being welcoming, supportive, and making my first open source contribution a fun experience. Do check out the project if you're interested! 

If you've missed it, here's the [issue](https://github.com/taikoxyz/taiko-mono/issues/13986) that I've worked on at Taiko and the [pull request](https://github.com/taikoxyz/taiko-mono/pull/14029) that solves the issue.

And here's a summary of what I did:
1. Found an open source project:
  - What specific area of tech am I interested in?
  - What are my current skills, or skills I want to improve?
  - What's the tech stack of the open source project?
2. Reviewed contributing guidelines (CONTRIBUTING.md)
3. Looked at good first issues
4. Chose an existing issue, then reviewed the description and comments (if any)
5. Forked and cloned the repo
6. Set up my local environment
7. Worked on and tested the changes
8. Opened a pull request
9. Went through the review process and resolved comments (if any)
10. Pull request got merged!

I won't stop there. I'm excited on the journey ahead and looking forward to be a more consistent open source contributor. One contribution at a time. 

Thank you for reading and as always, I'm open to suggestions, feedback, and comments. Also feel free to contact me at my email (jasper.d.gabriel@gmail.com), and I'm available on [Twitter](https://twitter.com/kshyun28), [LinkedIn](https://www.linkedin.com/in/kshyun28/), and [GitHub](https://github.com/kshyun28).
