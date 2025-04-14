
import { SubscriptionPlan } from '../types';

export const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: 'flex-month',
    name: 'Flex Monthly',
    price: 149,
    priceUnit: '/mo',
    duration: 'Monthly',
    features: [
      'Monthly renewal with no long-term commitment',
      'Switch vehicles once a month',
      'Basic insurance included ($1,000 deductible)',
      'Maintenance and roadside assistance',
      'Up to 1,000 miles/month ($.30/extra mile)',
      'Cancel anytime with 7-day notice'
    ]
  },
  {
    id: 'standard',
    name: 'Standard',
    price: 129,
    priceUnit: '/mo',
    duration: '3 Months',
    features: [
      '3-month commitment (save 13% vs. monthly)',
      'Switch vehicles once a month',
      'Standard insurance included ($500 deductible)',
      'Premium maintenance package',
      'Up to 1,500 miles/month ($.25/extra mile)',
      'Home charging adapter included'
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
      '6-month commitment (save 27% vs. monthly)',
      'Switch vehicles anytime with 48-hour notice',
      'Premium insurance included ($0 deductible)',
      'Priority maintenance and service',
      'Up to 2,000 miles/month ($.20/extra mile)',
      'Free Supercharging at Tesla network'
    ]
  },
  {
    id: 'corporate',
    name: 'Corporate Plan',
    price: 299,
    priceUnit: '/mo',
    duration: 'Business',
    features: [
      'Designed for business use with tax benefits',
      'Multiple driver authorization',
      'Commercial insurance included',
      'Dedicated account manager',
      'Unlimited mileage for business use',
      'Monthly detailed usage reports'
    ]
  },
  {
    id: 'ultimate',
    name: 'Ultimate Freedom',
    price: 399,
    priceUnit: '/mo',
    duration: 'Annual',
    features: [
      'Annual commitment (save 33% vs. monthly)',
      'Access to full Tesla fleet including premium models',
      'All-inclusive insurance package',
      'Unlimited vehicle switches',
      'Unlimited mileage',
      'Exclusive member events and experiences'
    ]
  }
];
