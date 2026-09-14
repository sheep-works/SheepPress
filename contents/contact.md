---
title: "お問い合わせ"
description: "合同会社ランベージへのお問い合わせフォーム・ご連絡先"
date: 2024-01-01
updated: 2026-08-10
author: "合同会社ランベージ & ひつじの翻訳室"
lang: "ja"
category: "お問い合わせ"
tags:
  - "お問い合わせ"
  - "ランベージ"
  - "連絡先"
---

# お問い合わせ

本ウェブサイトおよびツールの開発は **合同会社ランベージ** および **ひつじの翻訳室** が共同で行っています。

ツールに関するご質問・ご要望、不具合のご報告やビジネスに関するお問い合わせは、以下のWebフォームまたはメールアドレスよりお気軽にご連絡ください。

---

## 各事業者へのお問い合わせ・ご連絡先

### 合同会社ランベージ
- **メール**： [info@lambuage.com](mailto:info@lambuage.com)

### ひつじの翻訳室
- **メール**： [dev@mail.transheep.biz](mailto:dev@mail.transheep.biz)

---

## Webフォームからのお問い合わせ

以下のフォームよりお問い合わせをお送りいただけます。

<form action="https://api.web3forms.com/submit" method="POST" class="contact-form">
  <input type="hidden" name="access_key" value="2e0b8d49-e955-48ef-ad81-eb5a0886d073">
  <input type="hidden" name="subject" value="Webサイトからのお問い合わせ">
  <!-- 送信後のリダイレクト先 (本番ドメインやローカル環境のURLを指定) -->
  <input type="hidden" name="redirect" value="https://lambuage.com/thankyou">
  <!-- <input type="hidden" name="redirect" value="http://localhost:5173/thankyou"> -->

  <div class="form-group">
    <label for="name">お名前 <span class="required">*</span></label>
    <input type="text" id="name" name="name" placeholder="山田 太郎" required>
  </div>

  <div class="form-group">
    <label for="email">メールアドレス <span class="required">*</span></label>
    <input type="email" id="email" name="email" placeholder="example@example.com" required>
  </div>

  <div class="form-group">
    <label for="message">お問い合わせ内容 <span class="required">*</span></label>
    <textarea id="message" name="message" rows="5" placeholder="お問い合わせ内容をご入力ください" required></textarea>
  </div>

  <button type="submit" class="vp-button brand">送信する</button>
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

