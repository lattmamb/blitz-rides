
import React from 'react';
import { Button } from '@/components/ui/button';

const ReviewsTab: React.FC = () => {
  return (
    <div className="glass-card p-6 text-center">
      <div className="py-8">
        <h3 className="text-lg font-bold mb-3">Customer Reviews</h3>
        <div className="flex justify-center items-center mb-3">
          {[...Array(5)].map((_, i) => (
            <svg 
              key={i} 
              xmlns="http://www.w3.org/2000/svg" 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill={i < 4 ? "#0A84FF" : "none"} 
              stroke="#0A84FF" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="mr-1"
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          ))}
          <span className="ml-2 font-medium">4.8/5</span>
        </div>
        <p className="text-white/70 mb-6">
          Based on 128 verified customer reviews
        </p>
        
        <div className="max-w-xl mx-auto">
          <Button className="bg-tesla-blue hover:bg-tesla-blue/90 text-white">
            View All Reviews
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReviewsTab;
