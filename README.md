# Building docker image

> After every push to main, we need to update the docker image

`docker build -t ghcr.io/contentql/pin-hcms:latest . --platform linux/amd64`
`docker push ghcr.io/contentql/pin-hcms:latest`

# Testing Docker Production version

`sudo docker pull ghcr.io/contentql/pin-hcms:latest`
`sudo docker run --network="host" -e DATABASE_URI=mongodb://127.0.0.1/pin-hcms ghcr.io/contentql/pin-hcms:latest`

# Getting Started

1. `pnpm pull`
2. `pnpm i`
3. `pnpm generate:types`
4. `pnpm dev`

# Basic Idea

Both the collections we create should have the idea of:

1. Blocks in every page and blog
2. Dynamic Generation using the render which we already use in `pin-contentql`
3. Clear documentation on how to create blocks in frontend and backend.

# Exceptions

`NEXT_PUBLIC_PUBLIC_URL` env variable should not have `/` at the ends

---

# 🏢 Multi-Tenancy with Next.js + Payload CMS

This project implements a **multi-tenant website platform** using **Next.js**
and **Payload CMS**.  
It supports **subdomain-based tenant isolation**, where each tenant has its own
admin panel, pages, and content, while a global admin can manage all tenants.

---

## 🔑 Core Concepts

### **Main Domain**

The primary domain (`MAIN_DOMAIN`) is used for **sign-up, login, and admin
access**.  
Example: `myapp.com`

### **Tenants**

Each tenant is identified by a **slug** (e.g. `acme`). A tenant can be accessed
in the following ways:

- **Preferred: Subdomain Access**  
  `acme.myapp.com` → All tenant content is served from the subdomain.

- **Path Prefix (temporary entry only)**  
  `myapp.com/acme` → **Immediately redirected** by middleware to:

This ensures tenant websites always live under a **subdomain (or custom
domain)**, not under the main domain path.

### **Roles**

- **Admin (first user)** → Full access to all tenants.
- **User (created on signup)** → Manages only their tenant.

### **Custom Domains**

Tenants can link a **custom hostname** (e.g. `acme.com`), which is mapped in the
`customDomains` collection.  
Requests to the custom domain are rewritten internally to the tenant’s slug.

---

## 🌍 Request Flow

### **1. Reserved Paths**

Certain paths always belong to the **main domain** and are never treated as
tenants:

### **2. Main Domain Routing**

- `/` → Landing page (main domain).
- `/tenant-slug/...` → Redirect → `tenant-slug.myapp.com/...`

### **3. Subdomain Routing**

- `tenant.myapp.com/...` → Rewritten internally to `/tenant/...`
- Example:

### **4. Custom Domain Routing**

- If hostname matches a record in `customDomains`, the request is rewritten to
  the tenant’s slug:

---

## ⚙️ Middleware Logic

The middleware is responsible for tenant resolution:

1. Get `hostname` + `path` from the request.
2. If path is reserved or static → allow request.
3. If `hostname === MAIN_DOMAIN`:

- `/` → allow request (main landing).
- `/:tenant` → **redirect** to tenant subdomain.

4. If hostname is a **subdomain**:

- Rewrite to `/{tenant-slug}/...`.

5. If hostname matches a record in `customDomains`:

- Rewrite to `/{tenant-slug}/...`.

6. Otherwise → continue normally.

---

## 🗂 Example Scenarios

| Request                | Result                                  |
| ---------------------- | --------------------------------------- |
| `myapp.com/`           | Main domain landing page                |
| `myapp.com/acme`       | Redirect → `acme.myapp.com`             |
| `acme.myapp.com/about` | Rewritten → `/acme/about`               |
| `myapp.com/admin`      | Admin panel (global access)             |
| `acme.myapp.com/admin` | Tenant admin panel (isolated to `acme`) |
| `acme.com/about`       | Custom domain → `/acme/about`           |

---

## 📖 Summary

- **Main domain** → Admin + onboarding.
- **Tenant subdomains** → Primary access point for tenants.
- **Custom domains** → Supported via `customDomains`.
- **Middleware** → Handles routing, enforces tenant isolation.
