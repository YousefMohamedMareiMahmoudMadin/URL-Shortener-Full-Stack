# URL Shortener & QR Code Generator

A highly efficient, full-stack web application designed to compress long URLs into short,
unique aliases and instantly generate dynamic, downloadable QR codes. 
This project is built using a completely decoupled architecture, separating the client-side user experience from the robust backend RESTful API.

---

## 🚀 Key Features

* **Instant URL Shortening:** Generates highly secure, short identifiers using an optimized collisions-safe mechanism.
* **Dynamic QR Code Generation:** Instantly renders high-quality QR codes custom-colored for seamless styling, with native download capabilities.
* **Click Tracking:** Monitors the total number of visits per shortened link asynchronously upon every redirection.
* **URL Validation:** Server-side protocol enforcement using native URL parsing constructor to block invalid web formats.
* **Modern UI:** Built with React, Tailwind CSS, and DaisyUI, presenting an elegant, responsive interface with visual feedbacks like automatic clipboards copy indicators.

---

## 🛠️ Tech Stack & Architecture

### Frontend (Client)
* **Framework:** React.js (Vite)
* **Styling:** Tailwind CSS & DaisyUI
* **HTTP Client:** Axios
* **QR Engine:** QRCode (DataURL Renderer)

### Backend (API & Server)
* **Runtime Environment:** Node.js
* **Framework:** Express.js
* **Database Object Modeling:** Mongoose ORM
* **ID Generator:** Nanoid

### Database
* **Engine:** MongoDB (NoSQL Database)

---

## 📦 Database Schema Design

The system relies on a strictly typed Mongo Document structure, ensuring fast indexed queries and data consistency:

| Property | Type | Rules | Description |
| :--- | :--- | :--- | :--- |
| `originalUrl` | String | Required | The destination website URL |
| `shortId` | String | Required, Unique | The 7-character generated alias key |
| `clicks` | Number | Default: 0 | Total access counter |
| `timestamps` | Date | Automatic | Tracks creation and last update dates |

---

## 🗺️ API Endpoints Reference

### 1. Create Shortened URL
* **Endpoint:** `POST /shorten`
* **Payload:**
  ```json
  {
    "originalUrl": "[https://example.com/very-long-link-path](https://example.com/very-long-link-path)"
  }
