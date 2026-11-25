# AI to Startup — BSAD 281 term project

You're going to take a startup idea from a sentence to a **live website with its own link**, using an AI assistant to write the code. You don't need to know how to code. You do need to know what you want, describe it clearly, and check that it works.

Everything here happens in your **web browser**. You never need to type commands into a terminal.

> **Everything in this project is public.** Use first names only (or none), and never put real personal information, passwords or keys in any file.

---

## Before the lab (do this now — it takes a few days)

1. **Create an account with your course's code-hosting service.** Your username doesn't need to be your real name.
2. Check whether your institution offers a student developer program. Have a school email and photo ID ready if you apply. Approval can take a few days and may provide additional workspace or assistant usage.
3. Bring your account username to the lab. Do not share your password.

If your student application is not approved by lab day, you can still do the project — you may have a smaller monthly allowance of assistant messages, so use them wisely.

---

## Step 1 — Make your team's copy (one person per team)

Only **one** teammate does this step. That person "owns" the project.

1. Open the template link your instructor posted on the course site.
2. Choose the option to make your own copy of the template project.
3. **Owner:** you. **Repository name:** something short like `quickbite-prototype` (no spaces).
4. Choose **Public**, then click **Create repository**.
5. Add your teammates using your hosting service's collaboration settings. They may need to accept an invitation.

> A *repository* (or "repo") is your project's folder on a code-hosting service, with a full history of every saved version.

## Step 2 — Open your workspace

1. On your repository page, open the browser-based coding workspace provided by your hosting service.
2. Wait a minute or two for the workspace and its assistant to finish loading.

Next time, open the workspace you already made. Don't make a new one each time.

> Your workspace stops by itself after 30 minutes of doing nothing. Your work is saved, but **only committed work** (Step 5) is safe and visible to your team.

## Step 3 — See your site

1. In the file list on the left, **right-click `index.html`** → **Show Preview**.
2. Your site appears in a panel beside the code. It updates as files change.

If you don't see *Show Preview*, wait for the workspace to finish loading, then try again.

## Step 4 — Build with your assistant

1. Open the assistant's **Chat** panel.
2. If there's a mode dropdown under the chat box, choose **Agent** — this lets the assistant edit your files directly.
3. Type what you want in plain English and press Enter.
4. The assistant shows the changes it made with **Keep** and **Undo** buttons. Check the preview. Keep what works; undo what doesn't.

This project already contains instructions telling the assistant the rules (plain HTML/CSS/JavaScript, fake data only, nothing to install). You don't need to repeat them.

### Good first prompts

Copy one, fill in the blanks, and send it:

> Our startup idea is: **[one sentence]**. Our customers are **[who]**, and the problem we solve is **[problem]**. Update `data.js` and the text in `index.html` so the site describes our startup. Don't change the layout yet.

> Replace the starter listings in `data.js` with 8 realistic but fictional examples that fit our project.

> Add a page that shows how our product gets more valuable as more people use it. Use fake numbers so we can compare 10 users with 10,000 users.

### How to talk to your assistant

- **One change at a time.** "Make the buttons green" works. "Make the site amazing with login, payments and AI" won't.
- **Describe what you see, not what you think the code is.** "When I click Save, nothing happens" is perfect.
- **When something breaks**, say what you did, what you expected, and what happened instead. Then ask it to fix *only that*.
- **If the assistant goes in circles**, click Undo, save a checkpoint of the last working version, and ask in a different way.
- **Write down your important prompts** in `project-notes/PROJECT_LOG.md` as you go. You'll need them.

### What the assistant can't do here (on purpose)

Real logins, real databases, real payments, real AI features, emails and texts all need servers, security and paid services. If you ask for them, the assistant will offer to **fake** them instead (for example, a checkout page that shows a pretend confirmation). That's the right answer for a prototype. Add the real version to the *"What a real version would need"* list in your project log — it's part of your grade.

## Step 5 — Save a checkpoint (commit) every time something works

A **commit** is a saved version of your project. It's your undo button for big mistakes, and it's how your work gets to your shared code repository and live site.

1. Click the **Source Control** icon on the left (it looks like three dots joined by lines, often with a number on it).
2. Type a short message describing what changed, like `Added pricing page`.
3. Click **Commit**. (If it asks *"stage all changes?"* click **Yes** / **Always**.)

That's it — this workspace is set up to upload ("sync") your commit to your code-hosting service automatically.

> **Rule of thumb:** if it works and you'd be upset to lose it, commit it.

## Step 6 — Publish your site (do this once)

1. Open your repository's hosting or deployment settings.
2. Choose the option to publish the main branch from the project root.
3. Save the settings and wait for the first deployment to finish.
4. Open the public site link provided by your hosting service.

That link is your live site. Every commit updates it automatically within a few minutes. Submit it on the course site.

---

## Working as a team

- **One driver at a time.** Only one person makes changes with the assistant at a time. Say so in your group chat ("I'm driving until 8pm").
- **Before you start, sync.** In Source Control, click **Sync Changes** (or the circular arrows at the bottom of the window) so you have your teammates' latest work.
- **When you're done, commit**, then tell the group.
- Everyone should drive at least once. Your instructor can see who made each commit.

## When something goes wrong

| What you see | What to do |
|---|---|
| The page is blank or half-broken | Click **Undo** on the assistant's last change. If it's already kept, ask: "The page is blank since the last change. Find and fix the problem." |
| Your assistant says you've reached your limit | Your monthly free messages are used up. Ask a teammate to drive, and check whether your student developer program is active. |
| My live site doesn't show my latest change | Did you commit? Wait 5 minutes, then hard-refresh (Ctrl+Shift+R, or Cmd+Shift+R on a Mac). |
| Live site shows "404" | Check Step 6 settings, and make sure `index.html` is still in the main folder (not inside another folder). |
| The assistant wants to install something or run a command | Click **Undo** / **Skip** and say: "No installs. Plain HTML, CSS and JavaScript only." |
| "Sync" fails or mentions a conflict | Two people changed the same thing. Stop, don't click anything else, and contact your instructor. |
| I broke everything and want my last checkpoint back | In Source Control, hover over **Changes** and click the curved-arrow **Discard All Changes** icon. This throws away everything since your last commit. |
| The workspace won't open | Open your existing browser workspace from your code-hosting service. |

## The rules

- No real personal information about anyone — all data is fake.
- No passwords, API keys or secrets in any file.
- No real payments, logins or forms that send data anywhere.
- No real company logos, brand names or copyrighted characters.
- Keep the footer saying this is a student prototype.
- No installs, no outside code libraries, no build tools.

## What's in this project

| File | What it is |
|---|---|
| `index.html` | The structure and text of your site |
| `styles.css` | How it looks: colours, fonts, spacing |
| `data.js` | All your fake data (listings, prices, users…) |
| `app.js` | What the site *does* when people click things |
| `project-notes/PROJECT_LOG.md` | Your team's record of prompts, problems and decisions |
| `project-notes/BUSINESS_CASE.md` | The business reasoning behind your prototype |
| Project instructions | The rules the assistant follows in this project — don't delete them. |

What exactly to hand in and how it's graded is in the term project brief on the course site.
