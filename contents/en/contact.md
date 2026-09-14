---
title: "Contact Us"
description: "Inquiry form and contact information for Lambuage LLC"
date: 2024-01-01
updated: 2026-09-14
author: "Lambuage LLC & Sheep Translation Studio"
lang: "en"
category: "Contact"
tags:
  - "Contact"
  - "Lambuage"
  - "Inquiry"
---

# Contact Us

This website and the tool suite are co-developed by **Lambuage LLC** and **Sheep Translation Studio** (ひつじの翻訳室).

Please feel free to contact us regarding inquiries, requests, bug reports, or business opportunities using the Web form below or via email.

---

## Contact Information

### Lambuage LLC
- **Website**: [https://lambuage.com](https://lambuage.com)
- **Email**: [info@lambuage.com](mailto:info@lambuage.com)

### Sheep Translation Studio
- **Website**: [https://transheep.biz](https://transheep.biz)
- **Email**: [dev@mail.transheep.biz](mailto:dev@mail.transheep.biz)

---

## Online Contact Form

You can send us a message using the form below.

<form action="https://api.web3forms.com/submit" method="POST" class="contact-form">
  <input type="hidden" name="access_key" value="2e0b8d49-e955-48ef-ad81-eb5a0886d073">
  <input type="hidden" name="subject" value="New Contact Inquiry (EN)">
  <input type="hidden" name="from_name" value="SheepPress English Website">
  <input type="hidden" name="redirect" value="https://lambuage.com/en/thankyou">
  <!-- <input type="hidden" name="redirect" value="http://localhost:5173/en/thankyou"> -->

  <div class="form-group">
    <label for="name">Your Name <span class="required">*</span></label>
    <input type="text" id="name" name="name" placeholder="John Doe" required>
  </div>

  <div class="form-group">
    <label for="email">Email Address <span class="required">*</span></label>
    <input type="email" id="email" name="email" placeholder="example@example.com" required>
  </div>

  <div class="form-group">
    <label for="message">Message <span class="required">*</span></label>
    <textarea id="message" name="message" rows="5" placeholder="Please enter your message here" required></textarea>
  </div>

  <button type="submit" class="vp-button brand">Send Message</button>
</form>

<style scoped>
.contact-form {
  margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  max-width: 600px;
}
.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.form-group label {
  font-weight: 600;
  font-size: 0.95rem;
}
.required {
  color: var(--vp-c-danger-1, #e53e3e);
}
.form-group input,
.form-group textarea {
  width: 100%;
  padding: 0.6rem 0.8rem;
  border: 1px solid var(--vp-c-divider, #ccc);
  border-radius: 6px;
  background-color: var(--vp-c-bg-alt, #f6f6f7);
  color: var(--vp-c-text-1, #212529);
  font-size: 1rem;
  font-family: inherit;
  box-sizing: border-box;
}
.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--vp-c-brand-1, #3eaf7c);
  background-color: var(--vp-c-bg, #ffffff);
}
</style>

---
