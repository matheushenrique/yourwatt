# Estrutura de Pastas do Frontend
frontend/
├── public/
│   ├── logo.svg
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Modal.tsx
│   │   │   └── Loading.tsx
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   └── Footer.tsx
│   │   ├── charts/
│   │   │   ├── ConsumptionChart.tsx
│   │   │   ├── ProductionChart.tsx
│   │   │   └── ComparativeChart.tsx
│   │   └── auth/
│   │       ├── LoginForm.tsx
│   │       └── GoogleLoginButton.tsx
│   ├── pages/
│   │   ├── auth/
│   │   │   └── Login.tsx
│   │   ├── user/
│   │   │   ├── Dashboard.tsx
│   │   │   ├── Consumption.tsx
│   │   │   └── Billing.tsx
│   │   └── admin/
│   │       ├── AdminDashboard.tsx
│   │       ├── Users.tsx
│   │       ├── Production.tsx
│   │       └── ClientsList.tsx
│   ├── services/
│   │   ├── api.ts
│   │   ├── auth.service.ts
│   │   ├── consumption.service.ts
│   │   ├── production.service.ts
│   │   └── export.service.ts
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   ├── useConsumption.ts
│   │   └── useProduction.ts
│   ├── context/
│   │   └── AuthContext.tsx
│   ├── types/
│   │   ├── user.types.ts
│   │   ├── consumption.types.ts
│   │   └── production.types.ts
│   ├── utils/
│   │   ├── formatters.ts
│   │   ├── validators.ts
│   │   └── constants.ts
│   ├── routes/
│   │   ├── AppRoutes.tsx
│   │   ├── PrivateRoute.tsx
│   │   └── AdminRoute.tsx
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── package.json
├── tsconfig.json
├── vite.config.ts
└── tailwind.config.js