# SpendWise - Personal Finance Management App

## Team

**Team Name:** Team TAG  
**Team Members:** Aila Choudhary, Tajwar Rahman, Golam Rabbani

---

## Objective

SpendWise is a **Personal Finance Management App** designed to help users manage their finances effortlessly. By integrating with users’ bank accounts via the **Plaid API**, the app automates transaction tracking, budgeting, subscription management, and financial insights. Our goal is to provide a seamless and ad-free platform to improve financial management for individuals and families.

---

## Features

- **Transaction Tracking:** Automatically import and categorize financial transactions.
- **Budgeting:** Set spending limits for various categories (e.g., groceries, rent, entertainment).
- **Expense Analysis:** Visualize spending trends and monitor adherence to budgeting goals.
- **Subscription Management:** Identify recurring payments and send reminders for due subscriptions.
- **Financial Insights:** Generate detailed reports for monthly, quarterly, or annual financial performance.

---

## Motivation

Managing personal finances can be challenging, especially with multiple bank accounts and credit cards. Existing apps like Mint or YNAB have limitations such as intrusive ads and costly subscriptions. SpendWise aims to address these issues by providing:

- An **ad-free experience**.
- Better **customization tools** for financial planning.
- Enhanced **subscription tracking** to help users reduce unnecessary expenses.

---

## Target Audience

- **Young Professionals:** Simplify the management of multiple bank accounts, track expenses, and achieve financial goals.
- **Families:** Improve budgeting skills and eliminate unnecessary recurring payments.
- **Freelancers/Gig Workers:** Manage irregular income and expenses more effectively.

---

## Market Need

Existing finance apps often have drawbacks like ads, inflexible budgeting tools, or expensive pricing models. SpendWise focuses on:

1. **User Control:** Fully customizable categories and budgeting goals.
2. **Subscription Tracking:** Help users reduce subscription fatigue by spotting recurring payments.

Our app provides a **modern, ad-free, and highly customizable solution** for personal finance management.

---

## Differentiation from Competitors

- **Mint:** Ad-supported, with limited customization options.
- **YNAB:** Paid subscription-based budgeting tools.

**How SpendWise Stands Out:**

1. **Ad-Free Experience:** Clean and distraction-free.
2. **Subscription Management:** Advanced tools to monitor and manage recurring payments.
3. **Customizable Features:** Users can personalize categories and goals.
4. **Real-Time Updates:** Seamless bank account integration using the **Plaid API**.

---

## Tech Stack

### Frontend:

- **Next.js**
- **TailwindCSS**

### Backend:

- **AWS Services:** DynamoDB and Cognito

### API Integration:

- **Plaid API:** Secure bank account and financial data synchronization.

---

## AWS Cognito Integration

The frontend integrates **AWS Cognito** for secure user authentication and session management. After a successful login:

- **Access Token**: Authorizes user requests to protected backend routes.
- **ID Token**: Provides user identity and claims for frontend usage.
- **Refresh Token**: Enables session renewal without re-authentication.

These tokens are stored securely and used to manage authenticated sessions.

---

## CI/CD Pipeline

We have implemented **CI/CD pipelines** using **GitHub Actions** to ensure code quality and automate the deployment process. The pipeline performs the following tasks:

1. **Dependency Installation**: Installs project dependencies.
2. **Testing**: Runs automated tests to verify code quality.
3. **Build Process**: Builds the production-ready Next.js project.

### Workflow Configuration:

```yaml
name: CI Pipeline - Frontend

on:
  push:
    branches: [master]
  pull_request:
    branches: [master]

jobs:
  ci:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Set up Node.js
        uses: actions/setup-node@v3
        with:
          node-version: "18"

      - name: Install dependencies
        run: npm install

      - name: Run tests
        run: npm test

      - name: Build project
        run: npm run build
```

---

## Future Enhancements

- Advanced reporting with AI insights.
- Mobile application for iOS and Android.
- Integration with investment platforms for holistic financial tracking.

---

## Project Setup Instructions

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-username/spendwise-frontend.git
   cd spendwise-frontend
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Set up environment variables**:

   Create a `.env.local` file in the root directory with the following variables:

   ```plaintext
   NEXT_PUBLIC_COGNITO_USER_POOL_ID=your-user-pool-id
   NEXT_PUBLIC_COGNITO_CLIENT_ID=your-client-id
   NEXT_PUBLIC_API_BASE_URL=https://your-backend-api-url
   ```

4. **Run the development server**:

   ```bash
   npm run dev
   ```

5. **Build the project for production**:

   ```bash
   npm run build
   ```

---

## Deployment

The frontend is deployed to **Vercel**. The CI/CD pipeline ensures:

- Code testing and validation before deployment.
- Automatic deployment on every push to the `master` branch.
