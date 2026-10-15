# Anuj-portfolio-

A personal portfolio website built with plain **HTML**, **CSS** and **JavaScript** — no frameworks or build tools required.

## Sections

- **Home** — introduction with an animated typing effect
- **About** — short bio and quick info
- **Skills** — HTML, CSS, JavaScript, C/C++, Python, SQL
- **Education** — BCA (2025–2028) and school timeline
- **Projects** — Personal Portfolio, Student Management System, Bus Reservation System
- **Contact** — contact form powered by Web3Forms (delivers messages to your inbox) and contact details

## Run locally

Just open `index.html` in any browser, or serve it with Live Server in VS Code.

## Activate the contact form (free, ~2 minutes)

The form uses [Web3Forms](https://web3forms.com) — 100% free, no credit card, no backend server.
Submissions are delivered to `anujkumardev14@gmail.com`.

1. Go to <https://web3forms.com>, enter your email address and click **Create Access Key**.
   The key arrives in your inbox within a minute (check spam if needed).
2. Open `index.html` and search for `YOUR_WEB3FORMS_ACCESS_KEY`:
   ```html
   <input type="hidden" name="access_key" value="YOUR_WEB3FORMS_ACCESS_KEY">
   ```
3. Replace `YOUR_WEB3FORMS_ACCESS_KEY` with the key you received.
4. Save the file and reload the page. Fill in name, email, subject and message, then
   press **Send Message** — you should see *"Thank you! Your message has been sent."*
   and receive the email shortly.

Notes:

- The access key is safe to publish in your HTML — it can only receive submissions, never read emails.
- Keep the `name` attributes on every input and the `action="https://api.web3forms.com/submit"`
  attribute on the `<form>`; the form needs them to send data.
- Built-in spam protection is included via the hidden `botcheck` honeypot field.

## Deploy on GitHub Pages

1. Push this repository to GitHub.
2. Go to **Settings → Pages**.
3. Under **Source**, choose **Deploy from a branch**, pick `main` / `(root)`.
4. Your site will be available at `https://anujkumardev365.github.io/Anuj-portfolio-/`.

## Project structure

```
├── index.html   # page markup, inline CSS
└── script.js    # typing effect, nav, scroll & form logic
```

## TODO

- [ ] Replace the `#` placeholder links with real GitHub / LinkedIn / Instagram URLs
- [ ] Add project repository/demo links
- [ ] Host the profile photo inside the repo instead of an external image host
