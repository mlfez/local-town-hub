# Project log

Keep this up to date as you go — a few lines per work session is enough. It's much harder to reconstruct at the end.

**Team name:** Abdullah (individual project)
**Startup name:** Local Town Hub
**Live site link:** https://mlfez.github.io/local-town-hub/

---

## Work sessions

### Session 1 -- Nov 22 (planning), Nov 23 -- driver: Abdullah

- Goal for this session: choose my startup idea and draft the business case
- Key prompts:
  1. No Copilot yet. I came up with my first idea, a file-transfer site ("Portal"), and checked it against the rubric with Claude. I dropped it because it had no real potential for network effects.
  
  2. Switched to Local Town Hub, a guide for newcomers to Antigonish, based on my own experience moving here.
  3. Dictated sections 1-4 by voice and used Claude to clean up grammar and point out missing parts.
- What worked: talking through each section and testing VRIN on specific resources instead of the whole idea.
- What broke, and how I fixed it: my first try at section 4 tested VRIN on the website itself, which scores low. I redid it on three resources (local network, ratings, partnerships).
- Committed? no -- I thought I committed on Nov 23, but it did not go through (see "Things that broke"). This work was committed on Nov 24.

### Session 2 -- Nov 24 -- driver: Abdullah

- Goal for this session: build the website the way I imagined it
- Key prompts:
  1. I recorded my vision of the site by voice and used Claude to turn it
     into prompts for Copilot.
  2. First prompt: build Local Town Hub from the template, with a home page,
     "I'm visiting / I'm moving here" toggle, events, 9 categories, sponsored
     listings, and fake data in data.js.
  3. Design prompts: add icons and colour to the plain category tiles, move
     events to the side, a new coastal colour theme, a smaller hero.
  4. Buy & sell prompt: post an item with a photo, filters, protected
     purchase badge, "Make an offer (demo)".
  5. Town meter, newcomer guide checklist and "For businesses" pricing page.
- What worked: the first version worked, but the design was not what I
  wanted (the events were in the wrong place, the category circles were
  plain, the colours felt dull). I kept adjusting it until it looked lively.
  I tested Buy & sell by posting a real item I am selling, with a photo, and
  it appeared at the top of the board. I removed it after testing.
- What broke, and how I fixed it: see "Things that broke" below.
- Committed? yes -- "Built Local Town Hub site, business case 1-4 and log"

---

## Things that broke (running list)

| Date | What went wrong | What we tried | What finally fixed it |


| Nov 24 | My commits never reached GitHub, so the live site showed the blank template | Clicked Commit again. a COMMIT_EDITMSG tab opened and all buttons stopped working | Closed that tab, staged all changes with +, typed a message first, then Commit & Sync |
| Nov 24 | "Show Preview" was missing when I right-clicked index.html | Looked in the right-click menu | Installed the Live Preview extension |
| Nov 24 | Copilot changed my business case wording while removing brand names from the site | Noticed it in the Source Control comparison view | Undid its changes with the revert arrows, told Copilot not to edit project-notes |
| Nov 24 | "Request protected purchase (demo)" button did nothing, and item text was too faint to read | Tested every button on the Buy & sell page | Asked Copilot to fix only that button and darken the text |

## What a real version would need

Everything we wanted but faked or left out — real logins, a real database, payments, security, moderation, an app, staff, etc. For each one, say **why** it's needed and roughly **how hard or expensive** you think it would be.

| Feature we faked or skipped | Why a real company would need it | How hard / expensive? |
|---|---|---|
| Real logins | People must sign in to post, sell and rate, so each post belongs to a real person | Medium: use a login service (SaaS) |
| Shared database (MySQL) | Right now posts only save in one browser; everyone needs to see the same listings and posts | Medium: a hosted database plus a developer |
| Photo storage | Photos from buy and sell disappear on other devices; they must be stored online | Low to medium: cloud storage, cost grows with users |
| Payments and protected purchases | Businesses pay for featured spots, and protected purchases hold the buyer's money | Medium to high: a payment provider (SaaS) plus handling refunds and disputes |
| Moderation and flagging | Stop scams and fix wrong information, especially health info | Medium: a flag button plus staff to check reports |
| Customer support staff | Someone must answer users, especially for buy and sell problems | Medium: salaries grow with users |
| Business development staff | Someone must make deals with StFX, the town council and restaurants | Medium: at least one salary |
| Real data for schools, daycares and events | The site needs correct, up-to-date local information | Medium: pull from public sources plus manual checking |

## Reflection (fill in at the end)

1. **What surprised you most about building software with AI?**

Having a clear vision is a good start, but even with good prompts and everything planned in my mind, reaching that vision took far more iterations than I expected. At first it feels like something you can finish in a minute, but it took hours just to get the front end to look close to what I imagined, let alone make it work in real life. AI was good for the front end, but a real version would also need a back end, which would be a much bigger challenge. Design-wise, I still feel it does not fully match my vision. The colours and overall look and feel are a bit dry compared to other websites that feel more vibrant and appealing. I think a human designer could still improve it, but AI will probably get much better at design in the next few years.

2. **Which parts were easy, and which were hard? Why do you think that is?**

The hardest part was getting used to GitHub, which has a real learning curve. When I tried to commit my business case, it seemed to keep my old text and my new text twice, so I had to read about it and figure out how to fix it. The AI side was not that bad, but getting the site to look exactly how I wanted took a lot of iteration. The easy part was the programming itself. I cannot imagine how long it would have taken me to code the same site from scratch compared to what Copilot did.

3. **If a competitor had the same AI tool, how long would it take them to copy your site?**

A competitor could copy my website in a minute, especially since it is live. What would stand in their way is the traffic, the number of customers and how big the brand is. For example, I could copy the layout of Amazon right away, but I could never have as many products as they do. Their business is much bigger than a website: it depends on logistics, handling huge traffic and many other things. The same is true for Local Town Hub: the website is easy to copy, but the local network, the reviews and the partnerships are not.