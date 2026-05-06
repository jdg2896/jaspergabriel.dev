---
title: "How I Contributed to Open-Source While Learning Svelte"
description: "How I found and fixed documentation inconsistencies in Svelte's interactive tutorial while learning frontend development."
pubDate: 2024-01-21
tags: ["tech", "open-source"]
originalUrl: "https://dev.to/jdg2896/how-i-contributed-to-open-source-while-learning-svelte-1b1j"
---


If you're looking to start contributing to open-source projects, or you want to make more open-source contributions, you might already be looking at different open-source projects, seeing where you can help out.

Sometimes, contributing to open-source projects comes naturally. You might even find opportunities to improve a project's documentation while reading, or in my case while learning Svelte.

In this article, I'll share how I ended up contributing to [Svelte](https://svelte.dev/) while learning through their [interactive tutorials](https://learn.svelte.dev/tutorial/welcome-to-svelte).

## My background: deciding to learn Svelte

Before we continue, let me share my background.

Throughout my career, I've mostly done backend development. I wanted to learn frontend development to build my personal website. 

I was deciding between **React** and **Svelte**. After browsing through multiple blogs (including this [one](https://prismic.io/blog/svelte-vs-react)) and Reddit threads comparing both, I was ready to choose.

Based on my quick research, **React** is ideal for complex and large-scale applications while **Svelte** is more beginner-friendly since I don't have to learn [JSX](https://react.dev/learn/writing-markup-with-jsx) and [virtual DOM](https://legacy.reactjs.org/docs/faq-internals.html).

As someone who is new to frontends and just wants to build a personal website, I ended up choosing Svelte for its simplicity.

## Learning Svelte through the interactive tutorials

Now that I've chosen to learn Svelte for building my website, the first I did was visit [Svelte's website](https://svelte.dev/). Then I went to [Svelte's interactive tutorial](https://learn.svelte.dev/tutorial/welcome-to-svelte).

The tutorial is composed of four parts, covering both [Svelte](https://svelte.dev/) and [SvelteKit](https://kit.svelte.dev/), which is a UI framework for Svelte.

> 💡 **Note:** Here's my [notes on GitHub](https://github.com/jdg2896/learning-notes/blob/main/notes/learning-svelte-and%20-sveltekit.md) while learning Svelte and SvelteKit.

## Finding possible improvements in the tutorial

I went through the tutorials during my free time. The first part was pretty straightforward.

Once I got to the second part, in the [slots section](https://learn.svelte.dev/tutorial/slots), I noticed a difference between the docs on the left, and the code on the right. 

![Learning Svelte interactive tutorial website, slots section difference between docs and code](https://res.cloudinary.com/dlieqpdfd/image/upload/v1705810062/svelte-open-source/1-learn-svelte-dev-slots-page_cyvg32.png)

In the left part, the docs show `<div class="card ">`, while the code snippet on the right shows `<div class="card">`. The difference is that there's an **extra whitespace on the class value**.

Here's a side-by-side comparison to see the difference more clearly:
- `<div class="card ">` (Left part: docs)
- `<div class="card">` (Right part: code snippet)

I usually notice small details like this, so I paused and looked to improve the tutorial page.

## Improving the tutorial documentation

Websites and documentation that are open-source usually have an **edit page button** so readers can edit the page when they find issues or possible improvements. 

Fortunately, the maintainers at Svelte also make it easy to edit the interactive tutorial pages.

While still on the slots tutorial page, I clicked the **Edit this page** link at the bottom.

![Learning Svelte interactive tutorial website, click the "Edit this Page" button at the bottom of the slots section page.](https://res.cloudinary.com/dlieqpdfd/image/upload/v1705810061/svelte-open-source/2-learn-svelte-dev-slots-edit-this-page_jwepnc.png)

Clicking the **Edit this page** button brought me to the [GitHub repository](https://github.com/sveltejs/learn.svelte.dev/tree/main/content/tutorial/02-advanced-svelte/07-composition/01-slots) of Svelte's interactive tutorial.

### Reviewing the contributing guidelines
 
While reviewing Svelte's repository, I didn't see any `CONTRIBUTING.md` or any other open-source contributing guidelines, which can also be found in the repository's `README.md`.

What I did instead was review the previous commit messages to see if there was a specific commit format that I should follow. 

There was no standard commit format, so I went with the [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/) format.

### Forks, commits, and pull requests through the GitHub website

Now, I'll show you the steps on how I contributed my changes through the GitHub website.

> 💡 **Note:** The screenshots I will show for forking, comitting, and creating a pull request on GitHub were made only to show the process. 
> 
> I won't create an actual pull request adding a random white space. 😉

1. While still on the slots page `README.md` file, I clicked the **edit button** to edit the file directly on GitHub.
![learn.svelte.dev on GitHub website, slots section README.md, click "Edit file" button](https://res.cloudinary.com/dlieqpdfd/image/upload/v1705810062/svelte-open-source/3-github-slots-readme_qjkg1v.png)

1. Since it was my first time contributing to [Svelte's tutorial](https://github.com/sveltejs/learn.svelte.dev), I was prompted to **fork the repository**.
![learn.svelte.dev on the GitHub website, prompt to fork the repository.](https://res.cloudinary.com/dlieqpdfd/image/upload/v1705810060/svelte-open-source/4-github-fork-repository_mfood5.png)

1. Once I forked the repository, I edited the file with the improvements. Then I clicked **Commit changes**. 
![learn.svelte.dev on the GitHub website, click "Commit changes..." after editing the README.md file.](https://res.cloudinary.com/dlieqpdfd/image/upload/v1705810063/svelte-open-source/5-github-edit-file_ntmznm.png)

1. I was prompted to enter my **commit message**, along with the optional description and commit email. Then I clicked **Propose changes**.
![learn.svelte.dev on the GitHub website, prompt to enter commit message, optional description, and commit email. Then click "Propose changes".](https://res.cloudinary.com/dlieqpdfd/image/upload/v1705810063/svelte-open-source/6-github-propose-changes_qbnngr.png)

1. After making a commit, GitHub will automatically create a **new branch** with `patch-<number>` for the branch name. My branch name is `patch-3`. Then I reviewed the changes before clicking **Create pull request**.
![learn.svelte.dev on the GitHub website, create a new branch "patch-3" for the commit. Then compare changes with the main repository and prompt to create a pull request.](https://res.cloudinary.com/dlieqpdfd/image/upload/v1705810063/svelte-open-source/7-github-compare-changes_khkdgh.png)

1. Finally, I was prompted to enter a pull request title and description. Then I clicked **Create pull request**.
![learn.svelte.dev on the GitHub website, prompt to enter pull request title and description. Then click "Create pull request".](https://res.cloudinary.com/dlieqpdfd/image/upload/v1705810063/svelte-open-source/7-github-compare-changes_khkdgh.png)

Making changes on the GitHub website works for small commits, but I'd still recommend **cloning the project to your local machine to test your changes**. 

It's ideal to make a habit of **testing your changes before making a pull request to open-source projects**.

So that's exactly what I did. I cloned the project and followed the `README.md` docs for setting up the project locally.

Once I've **tested out that my changes didn't break anything**, I made the pull request.

### Pull request merged!

After creating my pull request, it's up to the maintainers if and when they'll approve and merge it.

After a few days, one of my [pull requests](https://github.com/sveltejs/learn.svelte.dev/pull/550) was merged.

![My GitHub pull request on learn.svelte.dev repository merged.](https://res.cloudinary.com/dlieqpdfd/image/upload/v1705809187/svelte-open-source/9-github-pull-request-merged_fybjkd.png)

Making pull requests that **introduce small changes and have good descriptions** increases your chances of having your pull request approved.

It also makes it easier for the open-source project maintainers to review your pull request, since they are usually busy with a lot of things.

## Other possible improvements I've found and some tips

I'd like to share that I made three pull requests, but only one has been approved and merged as of writing this.

Here are the other pull requests if you're curious:
- [docs: add code snippet for removing if blocks](https://github.com/sveltejs/learn.svelte.dev/pull/551)
- [docs: update code snippet for consistency with source file](https://github.com/sveltejs/learn.svelte.dev/pull/552)

Based on my observations, the less visited pages of a website usually have more areas for improvement. In the case of [Svelte's interactive tutorials](https://learn.svelte.dev/tutorial/welcome-to-svelte), not everyone will finish the tutorials. 

As a result, the less visited tutorial content might have more areas for improvement, since fewer people can spot potential issues.

So if you're looking to improve websites and documentation, **you can start looking at the least visited pages first.** 😉

## Conclusion

To recap, I've shared my story on how I made an open-source contribution while learning frontend development with Svelte.

Hopefully, my story shows that sometimes, you can contribute to open-source even if it's not your first intention. You just have to follow one of the scouts' principles which is to *"leave the campground cleaner than you found it"*.

When you see issues in documentation, you can improve it as long as it's open-source. Even if it's not open-source, you can still contact the project's support team or message the author directly.

Thank you for reading and I would love to hear your open-source experiences. Feel free to comment or message me [here](https://linktr.ee/jdg2896).

Good luck on your open-source journey!

## Resources
- [Svelte](https://svelte.dev/)
- [SvelteKit](https://kit.svelte.dev/)
- [Learn Svelte and SvelteKit: Interactive Tutorial](https://learn.svelte.dev/tutorial/welcome-to-svelte)
- [Svelte vs React](https://prismic.io/blog/svelte-vs-react)
- [learn.svelte.dev GitHub repository](https://github.com/sveltejs/learn.svelte.dev)
- [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)
- [Merged pull request to learn.svelte.dev GitHub repository](https://github.com/sveltejs/learn.svelte.dev/pull/550)
- [Pull request: "docs: add code snippet for removing if blocks"](https://github.com/sveltejs/learn.svelte.dev/pull/551)
- [Pull request: "docs: update code snippet for consistency with source file"](https://github.com/sveltejs/learn.svelte.dev/pull/552)
