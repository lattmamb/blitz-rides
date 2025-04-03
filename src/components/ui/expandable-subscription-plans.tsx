
import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { SubscriptionPlan } from "@/types";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";

interface ExpandableSubscriptionPlansProps {
  plans: SubscriptionPlan[];
  selectedPlan: string;
  setSelectedPlan: (planId: string) => void;
  vehicleAvailable: boolean;
}

export default function ExpandableSubscriptionPlans({ 
  plans, 
  selectedPlan, 
  setSelectedPlan,
  vehicleAvailable
}: ExpandableSubscriptionPlansProps) {
  const [active, setActive] = useState<SubscriptionPlan | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(null);
      }
    }

    if (active) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  const handlePlanSelection = (planId: string) => {
    setSelectedPlan(planId);
    setActive(null);
    
    if (vehicleAvailable) {
      // Scroll to top of page to make "Book This" button visible
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-tesla-dark-80 h-full w-full z-10"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active ? (
          <div className="fixed inset-0 grid place-items-center z-[100]">
            <motion.button
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex absolute top-4 right-4 items-center justify-center glass-effect rounded-full h-8 w-8"
              onClick={() => setActive(null)}
            >
              <X className="h-4 w-4 text-white" />
            </motion.button>
            <motion.div
              layoutId={`plan-card-${active.id}-${id}`}
              ref={ref}
              className="w-full max-w-[500px] h-full md:h-fit md:max-h-[90%] flex flex-col glass-card overflow-hidden"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <motion.h3
                      layoutId={`plan-title-${active.id}-${id}`}
                      className="text-2xl font-bold text-white mb-1"
                    >
                      {active.name}
                    </motion.h3>
                    <motion.p
                      layoutId={`plan-duration-${active.id}-${id}`}
                      className="text-white/70"
                    >
                      {active.duration}
                    </motion.p>
                  </div>

                  <div className="text-right">
                    <motion.p
                      layoutId={`plan-price-${active.id}-${id}`}
                      className="text-3xl font-bold text-white"
                    >
                      ${active.price}
                    </motion.p>
                    <span className="text-white/70 text-sm">{active.priceUnit}</span>
                  </div>
                </div>

                <div className="mb-8">
                  <h4 className="text-lg font-medium text-white mb-4">Plan Features</h4>
                  <ul className="space-y-3">
                    {active.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-3">
                        <div className="p-1.5 rounded-full bg-tesla-blue/20 text-tesla-blue">
                          <Check className="h-4 w-4" />
                        </div>
                        <span className="text-white/80">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {active.recommended && (
                  <div className="mb-6 glass-effect p-4 rounded-lg">
                    <h4 className="text-sm font-medium text-tesla-blue mb-2">Recommended</h4>
                    <p className="text-white/80 text-sm">
                      This plan offers the best balance of flexibility and value for most customers.
                    </p>
                  </div>
                )}

                <div className="mt-6">
                  <Button 
                    onClick={() => handlePlanSelection(active.id)}
                    className="w-full bg-tesla-blue hover:bg-tesla-blue/90 text-white py-6"
                  >
                    {selectedPlan === active.id ? 'Plan Selected' : 'Select This Plan'}
                  </Button>
                  
                  <p className="text-white/60 text-xs text-center mt-4">
                    You can change your subscription plan at any time through your account settings.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <motion.div
            layoutId={`plan-card-${plan.id}-${id}`}
            key={plan.id}
            onClick={() => setActive(plan)}
            className={`glass-card p-6 relative overflow-hidden cursor-pointer transition-all duration-300 ${
              selectedPlan === plan.id ? 'border-2 border-tesla-blue' : ''
            } ${plan.recommended ? 'ring-2 ring-tesla-blue' : ''}`}
          >
            {plan.recommended && (
              <div className="absolute top-0 right-0 bg-tesla-blue text-white text-xs px-3 py-1">
                RECOMMENDED
              </div>
            )}
            
            <motion.h3
              layoutId={`plan-title-${plan.id}-${id}`}
              className="text-xl font-bold text-white mb-1"
            >
              {plan.name}
            </motion.h3>
            
            <motion.div 
              layoutId={`plan-duration-${plan.id}-${id}`} 
              className="text-white/70 text-sm mb-4"
            >
              {plan.duration}
            </motion.div>
            
            <motion.div 
              layoutId={`plan-price-${plan.id}-${id}`} 
              className="mb-6"
            >
              <span className="text-3xl font-bold text-white">${plan.price}</span>
              <span className="text-white/70 text-sm">{plan.priceUnit}</span>
            </motion.div>
            
            <ul className="space-y-3 mb-6">
              {plan.features.slice(0, 3).map((feature, index) => (
                <li key={index} className="flex items-center gap-2 text-sm">
                  <div className="p-1 rounded-full bg-tesla-blue/20 text-tesla-blue">
                    <Check className="h-3 w-3" />
                  </div>
                  <span className="text-white/80">{feature}</span>
                </li>
              ))}
              {plan.features.length > 3 && (
                <li className="text-white/60 text-sm text-center italic">
                  + {plan.features.length - 3} more features
                </li>
              )}
            </ul>
            
            <Button 
              onClick={(e) => {
                e.stopPropagation(); // Prevent opening modal when clicking button
                handlePlanSelection(plan.id);
              }}
              className={
                selectedPlan === plan.id
                  ? "w-full bg-tesla-blue hover:bg-tesla-blue/90 text-white"
                  : "w-full bg-glass hover:bg-glass-highlight text-white"
              }
            >
              {selectedPlan === plan.id ? 'Selected' : 'Select Plan'}
            </Button>
          </motion.div>
        ))}
      </div>
    </>
  );
}
