# E-commerce Landing Page Project
**Project Group: 09
Group Members:
S. M. Shahinul Karim (21701023)
Sahib Abbas Bahar Chawdhury (21701022)
Misbahul Haque Arafat (21701033)**

A full-stack E-commerce landing page built with Next.js, Prisma, and Next.js API Routes. This project includes product browsing, filtering, ordering, and an admin panel for managing products.

---

## Features

- Responsive landing page
- Product filtering and detailed view
- Order placement system
- Admin login panel
- Admin features: Add, update, and delete products

---

## Tech Stack

- Frontend: Next.js, React, Tailwind CSS
- Backend: Next.js API Routes
- Database: PostgreSQL (via Prisma ORM)
- Authentication: Admin-only login
- ORM: Prisma

---

## Installation & Setup

1. Clone the repository
   ```bash
   git clone https://github.com/ShahinulRafi/ecomLanding.git
   cd ecomLanding
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory using the following template:
   ```env
   DATABASE_URL="file:./dev.db"
   ```

4. Generate Prisma client and run migrations
   ```bash
   npx prisma generate
   npx prisma migrate dev --name init
   ```

5. Start the development server
   ```bash
   npm run dev
   ```

6. Access the application
   - Client: http://localhost:3000
   - Admin Panel: http://localhost:3000/admin

---

## Demo Admin Credentials

```
Email: admin
Password: admin123
```

---

## Project Structure

```
/pages
  /api
    /admin        - Admin API routes
    /products     - Product-related API routes
  /admin          - Admin login panel
  /product        - Product details page
  index.tsx       - Landing page

/prisma
  schema.prisma   - Prisma schema

/components       - Reusable UI components
/public           - Static assets
```

---

## Notes

- Ensure that a PostgreSQL or compatible database is running and accessible.
- If deploying (e.g., on Vercel), set the correct environment variables in the hosting dashboard.
- Prisma must be properly configured with `schema.prisma` and initial migration applied.

---

