# Mousumi Web — Portfolio Website (`MousumiWeb.com`)

A responsive, bilingual (English & Bengali) portfolio website for **Mousumi Web**, owned by Web Developer **Mousumi Akhter**. Built exclusively with **HTML5**, **CSS3**, and **Vanilla JavaScript** so it works out of the box in any browser, on **XAMPP**, and on **cPanel** shared hosting with zero build tools.

## Project File Structure

```text
├── index.html                          # Main portfolio page (8 complete sections)
├── assets/
│   ├── css/
│   │   └── style.css                   # Deep navy theme + purple/pink/cyan accents + light toggle
│   ├── js/
│   │   └── main.js                     # Theme switcher, EN/BN language switcher, filter, modal, validation
│   └── images/
│       ├── mousumi-web-banner.png      # Official Mousumi Web brand banner
│       ├── mousumi-web-logo.svg        # Compact Mousumi Web emblem icon
│       ├── profile-placeholder.svg     # Replaceable profile photo frame
│       ├── project-sms.jpg             # Student Management System preview
│       ├── project-restaurant.jpg      # Restaurant Website preview
│       └── project-portfolio.jpg       # Personal Portfolio preview
└── README.md                           # Setup, customization, XAMPP & cPanel guide
```

## How to Run Locally or on XAMPP

- **Direct Browser**: Double-click `index.html` to open it in Chrome, Firefox, Edge, or Safari.
- **XAMPP**: Copy the project folder into `xampp/htdocs/mousumi-web/` and visit `http://localhost/mousumi-web/`.

## How to Upload to cPanel Shared Hosting

1. Open **cPanel → File Manager**.
2. Go to `public_html/`.
3. Upload `index.html` and the `assets/` folder into `public_html/`.
4. Visit `https://MousumiWeb.com`.

## How to Customize Placeholders

1. **Use Your Exact Uploaded Logo**: Save your logo file inside `assets/images/` (e.g. `assets/images/mousumi-web-logo.png`) and replace `mousumi-web-logo.svg` in `index.html`.
2. **Replace Profile Photo**: Save your portrait in `assets/images/` (e.g. `assets/images/profile-photo.jpg`) and update the hero `<img src="./assets/images/profile-placeholder.svg">` in `index.html`.
3. **Update Email, Social & Project Links**:
   - Replace `contact@mousumiweb.com` with your real email address.
   - Replace `href="#contact"` on social links (`data-placeholder-link="..."`) with your real GitHub, LinkedIn, and Facebook URLs.
   - Replace `#project-demo-placeholder` and `#project-code-placeholder` with your live project URLs and GitHub repositories.
4. **Connect Contact Form to Real Email**:
   - On XAMPP/cPanel with PHP, create a `send-mail.php` handler using PHPMailer or `mail()`, or connect the form to a service like Formspree.
