import Stripe from 'stripe-client';

import { STRIPE_PUBLISHABLE_KEY } from '~/config';


export default Stripe(STRIPE_PUBLISHABLE_KEY);
