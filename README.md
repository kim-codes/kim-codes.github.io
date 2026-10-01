# kim.codes

I wanted to create a small space on the internet to share things like case studies, little experiments I built (and building), and just a general running record of me figuring things out. 

🔗 **live:** [kim.codes](https://kim.codes)

## the build

just plain HTML, css, js. no frameworks. this is done intentionally. I wanted to stay close to the fundamentals instead of letting an anything else do the thinking for me.

The tradeoff is real. Without a framework, there's no shared component system. Things like the nav get copy/pasted and manually added to every page. resulting in duplicate code, inconsistent look and feel throughout the site. I tend to drift between pages while I'm in the flow . I know... I'm working on it...

## the site in 2D

<img src="assets/img/kimcodes-sitemap.png" alt="Site map showing kim.codes page structure" width="600">

## under the hood 
deliberately simple static site: HTML, CSS, and vanilla JavaScript.

```text
kim.codes/
├── index.html
├── constants.html
├── craft.html
├── reflections.html
├── footprints.html
├── contact.html
│
├── labs/
│   ├── search-beacons.html
│   ├── program-pulse.html
│   └── ai-agents.html
│
└── assets/
    ├── css/
    ├── js/
    └── img/
```

## worth noting

#### some negatives 
- css is all over the place. stylesheets, inline `<style>` tags... and tons of inconsistencies within the shared files . the downfall of working on the fly and wanting to get all my ideas out into the world.
- colors, spacing, and more are hardcoded in a bunch of spots instead of being centralized properties 

#### but also some positives 
- page transitions run on the native Cross-Document View Transitions API, not js. For a multi-page static site, that's the right tool for the job.
- my idea lab was/is the most fun. I learn through interaction, and I want to stay true that. Most of the labs are based ideas I find fun and interesting. 

#### other 
- I try my best to keep everything in my words and tone. But sometimes that gets tough, the reality of today's world, when you want to move fast and ship things...

## status

under construction. probably always will be. 

## roadmap

tracking as much as I can in [issues](../../issues)

## keeping it healthy

the playful parts of this site shouldn't come at the expense of performance or accessibility. 
I periodically check it: 

- [PageSpeed Insights](https://pagespeed.web.dev/) — performance and Core Web Vitals
- [WAVE](https://wave.webaim.org/) — accessibility

## License

Personal project, not licensed for reuse.

## say hello

[kim.codes/say-hello](https://kim.codes/contact.html)
