---
title: "How to Make Your Awesome GitHub Profile"
description: "A comprehensive guide to building an impressive GitHub profile with markdown, badges, icons, and stats."
pubDate: 2024-01-07
tags: ["tech"]
originalUrl: "https://dev.to/jdg2896/how-to-make-your-awesome-github-profile-hog"
---

If you're new to GitHub or have mostly worked with private GitHub repositories, chances are you don't have a GitHub profile yet.

A GitHub profile helps provide basic information for those visiting your profile. Having a well-made profile can even help you stand out, especially when you start contributing to open-source projects and people start noticing you.

In this article, I'll show how to create your own GitHub profile. I'll also share where to get inspiration for your profile. Finally, I'll share resources and tips to help you create an awesome GitHub profile!

## Creating Your GitHub Profile

Before you can start customizing your GitHub profile, you'll first need to create one.

Here's a [short guide](https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-github-profile/customizing-your-profile/managing-your-profile-readme) from GitHub on how to set up your profile.

But all you need to do is to:

- Create a new repository that is **the same as your GitHub username**.
- Add a `README.md` file to your new repository.

For example, my GitHub username is [jdg2896](https://github.com/jdg2896). To create my profile, I need to create a repository also named [jdg2896](https://github.com/jdg2896/jdg2896), then add a `README.md` file.

![Example GitHub profile repository](https://res.cloudinary.com/dlieqpdfd/image/upload/v1704616186/GitHub%20Profile/github-profile-repository-example_veplgh.png)

After setting up your `repository` and `README.md` file, verify that your profile is visible by going to your GitHub profile at https://github.com/YOUR-USERNAME.

In my case, it would be https://github.com/jdg2896.

## Customizing Your GitHub Profile

Now that you have a GitHub profile, it's time to get creative!

The key here is to **let your personality show** on your profile. Your GitHub profile doesn't have to be too formal like LinkedIn.

I'd also suggest **starting simple**. This helps get your GitHub profile up and running. You can always improve your profile later when you have new ideas.

### GitHub Flavored Markdown, Formatting, and HTML

For customizing your GitHub profile's `README.md`, you'll be using **GitHub Flavored Markdown**. If you've written markdown content before, formatting should be easy for you.

If it's your first time writing in markdown, you can go to [GitHub's documentation](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax) to familiarize yourself with the available formatting options.

You can also use **HTML** for additional formatting options for your profile.

I've found the following HTML tags to be useful:

- non-breaking space: `nbsp;`
- div center align: `<div align="center"> </div>`

You can use most HTML tags, but GitHub Flavored Markdown filters out the following HTML tags:

- `<title>`
- `<textarea>`
- `<style>`
- `<xmp>`
- `<iframe>`
- `<noembed>`
- `<noframes>`
- `<script>`
- `<plaintext>`

> 💡: To learn more, here's the [GitHub Flavored Markdown Spec](https://github.github.com/gfm/#html-blocks) related to HTML blocks.

### Finding Inspiration

To help you get started, I suggest looking at other awesome GitHub profiles for ideas. You can go to [awesome-github-profile-readme](https://github.com/abhisheknaiidu/awesome-github-profile-readme), where I've found inspiration when making my profile.

Since the profiles are open-source, you can use some of the good ideas for your awesome profile!

You can also check out [my profile](https://github.com/jdg2896) for some ideas. 😉

### Adding Badges

For adding badges to your profile, you can check out [markdown-badges](https://github.com/Ileriayo/markdown-badges). The repository has a wide selection of badges to choose from, ranging from programming languages to streaming platforms like Netflix.

If you can't find what you're looking for or want to create custom badges, you can go to [shields.io](https://shields.io/), which is what [markdown-badges](https://github.com/Ileriayo/markdown-badges) use.

Here's an example where I used [markdown-badges](https://github.com/Ileriayo/markdown-badges) on my profile.
![Markdown badges example](https://res.cloudinary.com/dlieqpdfd/image/upload/v1704616185/GitHub%20Profile/badges-example_t6jyr6.png)

### Adding Icons

For adding a `skills` or `tech stack` section to your profile, I recommend using [skill-icons](https://github.com/tandpfun/skill-icons) which provide beautiful icons.

If your icon is not supported, you can go to [simpleicons](https://simpleicons.org/), which has over 2900 SVG icons for popular brands.

Here's an example where I used [skill-icons](https://github.com/tandpfun/skill-icons) for my profile's tech stack section.
![Icons example](https://res.cloudinary.com/dlieqpdfd/image/upload/v1704616185/GitHub%20Profile/icons-example_nyo1sn.png)

### Using Emojis

In GitHub Flavored Markdown, you can use emojis. To see the full list of supported emojis, you can go to this [emoji-cheat-sheet](https://github.com/ikatyang/emoji-cheat-sheet).

If you want to get the list of supported emojis yourself, you can use [GitHub's Emoji API](https://docs.github.com/en/rest/emojis/emojis#get-emojis).

Going to https://api.github.com/emojis on your browser should show a JSON response of all supported emojis.

```json
{
  "+1": "https://github.githubassets.com/images/icons/emoji/unicode/1f44d.png?v8",
  "-1": "https://github.githubassets.com/images/icons/emoji/unicode/1f44e.png?v8",
  "100": "https://github.githubassets.com/images/icons/emoji/unicode/1f4af.png?v8",
  "1234": "https://github.githubassets.com/images/icons/emoji/unicode/1f522.png?v8",
  "1st_place_medal": "https://github.githubassets.com/images/icons/emoji/unicode/1f947.png?v8",
  "2nd_place_medal": "https://github.githubassets.com/images/icons/emoji/unicode/1f948.png?v8",
  "3rd_place_medal": "https://github.githubassets.com/images/icons/emoji/unicode/1f949.png?v8",
  "8ball": "https://github.githubassets.com/images/icons/emoji/unicode/1f3b1.png?v8",
  ...
```

Here's an example where I used emojis for my profile.

![Emojis example](https://res.cloudinary.com/dlieqpdfd/image/upload/v1704616185/GitHub%20Profile/emojis-example_yfzhef.png)

### Adding GitHub Stats

For adding cards and stats for your GitHub activity, I recommend using [github-readme-stats](https://github.com/anuraghazra/github-readme-stats). You can customize your stat cards with different layouts and themes.

Here's an example where I added GitHub stats to my profile.

![GitHub stats example](https://res.cloudinary.com/dlieqpdfd/image/upload/v1704616186/GitHub%20Profile/github-stats-example_ndhxk3.png)

### Adding Quotes

Adding random quotes to your profile can add a nice touch for visitors. I found [github-readme-quotes](https://github.com/PiyushSuthar/github-readme-quotes) to be useful for doing just that.

Here's what it looks like on my profile. I personally like to add quotes to provide some value to my profile visitors.
![Quotes example](https://res.cloudinary.com/dlieqpdfd/image/upload/v1704616185/GitHub%20Profile/quote-example_dfvjrh.png)

### Improving Accessibility

When customizing your profile, make sure that it is **viewable by as many people as possible**. Not everyone can view or load images. Some people have disabilities, while others have slow internet connections.

One way you can improve the [accessibility](https://developer.mozilla.org/en-US/docs/Learn/Accessibility/What_is_accessibility) of your profile is by adding descriptive `alt text` to your images.

```markdown
<!-- Markdown Image -->

![Image Alt Text](image-source)

<!-- HTML Image Tag -->
<img alt="Image Alt Text" src="image-source" />
```

Then to test your profile's accessibility, you can try to disable image loading on your web browser. Here's a [guide](https://www.wikihow.com/Disable-Images-in-Google-Chrome) on how to disable image loading for Google Chrome.

Here's what my profile looks like with image loading disabled on Google Chrome.
![GitHub profile accessibility example](https://res.cloudinary.com/dlieqpdfd/image/upload/v1704717170/GitHub%20Profile/github-profile-accessibility_vixcg8.png)

### More Ideas

For adding more infographics to your profile, I recommend checking out [metrics](https://github.com/lowlighter/metrics). This is one of the most starred repositories on GitHub with the `github-profile` topic, so I couldn't leave this out.

Then I found this beautiful resource [beautify-github-profile](https://github.com/rzashakeri/beautify-github-profile), where you can find more ways to customize your profile.

If you're also feeling adventurous, you can explore the `github-profile` topic [here](https://github.com/topics/github-profile). The repositories are sorted by the number of stars by default.

Feel free to explore repositories with the `github-profile` topic. You might even find ones that aren't used as much but are just what you need.

### GitHub Profile Achievements

While this is not related to customizing your GitHub profile's `README.md`, I feel the need to include it.

If you go to your GitHub profile, you'll notice an `Achievements` section on the left sidebar.

![GitHub profile achievements](https://res.cloudinary.com/dlieqpdfd/image/upload/v1704632356/GitHub%20Profile/github-profile-achievements_tlqp3p.png)

These achievements are fun to collect and can improve your overall GitHub profile.

To learn more about what achievements are available and how to get them, check out the [list of GitHub profile achievements](https://github.com/Schweinepriester/github-profile-achievements).

## Conclusion

To recap, we walked through how to create your GitHub profile. Then I showed how to format your profile with GitHub Flavored Markdown and HTML. After that, I shared where you can get inspiration for your own profile. Finally, I gave tips and resources on ways to customize your profile.

I hope this can help you in making your awesome GitHub profile. I'd love to see what you can come up with!

Thank you for reading and feel free to comment or connect with me [here](https://linktr.ee/jdg2896).

## Resources

- [Managing your GitHub profile README](https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-github-profile/customizing-your-profile/managing-your-profile-readme)
- [GitHub Basic Writing and Formatting Syntax](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax)
- [awesome-github-profile-readme repository](https://github.com/abhisheknaiidu/awesome-github-profile-readme)
- [markdown-badges repository](https://github.com/Ileriayo/markdown-badges)
- [shields.io](https://shields.io/)
- [skill-icons repository](https://github.com/tandpfun/skill-icons)
- [simpleicons.org](https://simpleicons.org/)
- [emoji-cheat-sheet](https://github.com/ikatyang/emoji-cheat-sheet)
- [GitHub's Emoji API](https://docs.github.com/en/rest/emojis/emojis#get-emojis)
- [github-readme-stats repository](https://github.com/anuraghazra/github-readme-stats)
- [github-readme-quotes repository](https://github.com/PiyushSuthar/github-readme-quotes)
- [MDN: What is accessibility?](https://developer.mozilla.org/en-US/docs/Learn/Accessibility/What_is_accessibility)
- [Disable Images in Google Chrome](https://www.wikihow.com/Disable-Images-in-Google-Chrome)
- [metrics repository](https://github.com/lowlighter/metrics)
- [beautify-github-profile repository](https://github.com/rzashakeri/beautify-github-profile)
- [repositories with "github-profile" topic](https://github.com/topics/github-profile)
- [github-profile-achievements list](https://github.com/Schweinepriester/github-profile-achievements)
