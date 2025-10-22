// Export all services from a single entry point
export { default as api } from './api';
export { authService } from './auth.service';
export { consumptionService } from './consumption.service';
export { productionService } from './production.service';
export { userService } from './user.service';
export { clientsService } from './clients.service';
export { billingService } from './billing.service';

// You can import services like this:
// import { authService, userService } from '@/services';
// or
// import { authService } from '@/services/auth.service';