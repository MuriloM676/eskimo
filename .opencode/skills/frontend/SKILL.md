---
name: frontend
description: Build modern frontend applications using React, TypeScript, Tailwind CSS and shadcn/ui following clean architecture, accessibility and responsive design best practices.
compatibility: opencode
license: MIT
metadata:
  category: frontend
  framework: react
---

# Frontend Development Skill

## Purpose

Develop modern, maintainable, scalable frontend applications.

---

# Preferred Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui
- React Router
- TanStack Query
- React Hook Form
- Zod
- Axios

---

# Project Structure

```
src/
    components/
        ui/
        common/
        layout/

    pages/

    hooks/

    services/

    lib/

    types/

    contexts/

    assets/

    utils/
```

---

# Component Rules

- One responsibility per component.
- Prefer composition over inheritance.
- Keep components small.
- Extract reusable logic into hooks.
- Never duplicate code.

---

# Styling

Always use

- Tailwind CSS

Prefer

- utility classes
- responsive utilities
- CSS variables
- design tokens

Avoid

- inline styles
- !important
- duplicated classes

---

# Forms

Always use

- React Hook Form
- Zod validation

Show

- validation messages
- loading states
- disabled buttons during submit

---

# API

Use

- Axios
- TanStack Query

Always

- handle loading
- handle errors
- handle empty states
- retry when appropriate

---

# State Management

Prefer

- local state
- Context API

Use global state only when necessary.

---

# Accessibility

Always

- semantic HTML
- labels
- keyboard navigation
- aria-* attributes
- focus states

---

# Performance

Prefer

- lazy loading
- memoization only when necessary
- code splitting
- optimized images

---

# Quality

Before finishing

- no TypeScript errors
- no ESLint errors
- responsive layout
- dark mode compatible
- accessible