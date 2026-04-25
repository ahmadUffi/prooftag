# Shieldtag Platform Documentation

## Overview
Shieldtag is a "phygital" product identity and ownership platform. it bridges the gap between physical products and digital assets using QR/Hologram technology at the physical layer, supply chain tracking at the logistics layer, and Web3 tokens/NFTs at the ownership layer.

## Core Concepts
- **Consumable Model**: For products meant to be used once. Uses a "Mint-on-Scan" and "Burn-on-Claim" logic to prevent counterfeiting and reuse.
- **Durable Model**: For long-lasting goods. Uses NFTs to represent ownership, allowing for secure transfers and secondary market traceability.
- **Wallet Abstraction**: A seamless UX that provides users with a digital identity without requiring traditional Web3 wallet setup during the initial encounter.

---

## Page Components (`/src/pages`)

### 1. Landing Page (`Landing.tsx`)
The entry point of the platform. It features:
- **Hero Section**: Market positioning and primary value proposition.
- **Animated Flow**: A visual representation of the product journey (Manufacturer → Supply Chain → Consumer).
- **Product Model Comparison**: Explains the difference between Consumable and Durable verification models.
- **Feature Grid**: Highlights core technical advantages like Fraud Detection and Real-time Tracking.

### 2. Verification Page (`Verify.tsx`)
Accessible via `/verify/:id`. This is the user-facing interface when a QR code is scanned.
- **Product Identification**: Displays identity and origin.
- **AI Visual Scan**: Uses Google Gemini to analyze uploaded product photos for authenticity (detecting holograms, packaging integrity).
- **Ownership Claim**: Allows users to link the product to their digital identity.

### 3. Dashboard Layout (`dashboard/Layout.tsx`)
The structural shell for authenticated administrative views.
- **Collapsible Sidebar**: Navigation across all platform modules.
- **Header**: User profile and global status indicators.

### 4. Admin Dashboard Module
- **Overview (`Overview.tsx`)**: High-level KPIs (Total Scans, Active Products, Alerts) and activity trends.
- **Products (`Products.tsx`)**: Management of SKUs and Product Batches. Includes QR code generation and batch minting tools.
- **Tracking (`Tracking.tsx`)**: A logistics-focused view showing the geographic movement of goods on a map and lifecycle timelines.
- **Logs (`Logs.tsx`)**: An audit trail of every verification attempt, including successful claims and potential fraud alerts.
- **Ownership (`Ownership.tsx`)**: Blockchain-specific view monitoring smart contract health and recent NFT/Token transactions.
- **Analytics (`Analytics.tsx`)**: Deep-dive into regional scan data, product popularity, and demographic trends.
- **Settings (`Settings.tsx`)**: Platform configuration, including API keys, Blockchain network selection, and team management.

---

## Services & Utilities (`/src/lib`)

### 1. Web3 Service (`web3.ts`)
Handles the blockchain logic simulation.
- **Wallet Abstraction**: Manages local "wallets" for seamless user onboarding.
- **Minting & Burning**: Simulates the logic for generating NFTs (Durable) and one-time tokens (Consumable).
- **Transfers**: Handles ownership handover for durable goods.

### 2. AI Service (`gemini.ts`)
Integrates the **Google Gemini Pro Vision** model (`gemini-3-flash-preview`).
- **Product Analysis**: Analyzes real-world product photos to verify authenticity scores based on visual characteristics.

### 3. Database Service (`supabase.ts`)
The persistence layer for the platform.
- **Data Collections**: Manages tables for `products`, `batches`, `scans`, `ownership`, and `alerts`.
- **Mock Fallback**: Includes a robust mock mode for development and demonstrations when a live Supabase environment is pending.

### 4. Utils (`utils.ts`)
Standard helper functions, including `cn` for Tailwind CSS class merging.

---

## Technical Design
- **Framework**: React 19 / Vite.
- **Styling**: Tailwind CSS 4.0 with shadcn/ui.
- **Animations**: Motion (framer-motion).
- **Routing**: React Router DOM v7.
- **Icons**: Lucide React.
