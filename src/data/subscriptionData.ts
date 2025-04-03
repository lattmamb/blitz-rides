
import { SubscriptionPlan } from '../types';

export const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: 'flex-month',
    name: 'Flex Monthly',
    price: 149,
    priceUnit: '/mo',
    duration: 'Monthly',
    features: [
      'Monthly renewal',
      'Switch vehicles once a month',
      'Basic insurance included',
      'Maintenance included',
      'Up to 1,000 miles/month'
    ]
  },
  {
    id: 'standard',
    name: 'Standard',
    price: 129,
    priceUnit: '/mo',
    duration: '3 Months',
    features: [
      '3-month commitment',
      'Switch vehicles once a month',
      'Standard insurance included',
      'Maintenance included',
      'Up to 1,500 miles/month'
    ],
    recommended: true
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 109,
    priceUnit: '/mo',
    duration: '6 Months',
    features: [
      '6-month commitment',
      'Switch vehicles anytime',
      'Premium insurance included',
      'Maintenance included',
      'Up to 2,000 miles/month'
    ]
  }
];
