
import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { X } from "lucide-react";

export default function ExpandableCardDemoStandard() {
  const [active, setActive] = useState<(typeof cards)[number] | boolean | null>(
    null
  );
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(false);
      }
    }

    if (active && typeof active === "object") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  return (
    <>
      <AnimatePresence>
        {active && typeof active === "object" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-tesla-dark-80 h-full w-full z-10"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active && typeof active === "object" ? (
          <div className="fixed inset-0 grid place-items-center z-[100]">
            <motion.button
              key={`button-${active.title}-${id}`}
              layout
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
                transition: {
                  duration: 0.05,
                },
              }}
              className="flex absolute top-2 right-2 lg:hidden items-center justify-center bg-glass-border rounded-full h-6 w-6"
              onClick={() => setActive(null)}
            >
              <X className="h-4 w-4 text-white" />
            </motion.button>
            <motion.div
              layoutId={`card-${active.title}-${id}`}
              ref={ref}
              className="w-full max-w-[500px] h-full md:h-fit md:max-h-[90%] flex flex-col glass-card overflow-hidden"
            >
              <motion.div layoutId={`image-${active.title}-${id}`}>
                <img
                  src={active.src}
                  alt={active.title}
                  className="w-full h-80 lg:h-80 sm:rounded-tr-lg sm:rounded-tl-lg object-cover object-top"
                />
              </motion.div>

              <div>
                <div className="flex justify-between items-start p-4">
                  <div className="">
                    <motion.h3
                      layoutId={`title-${active.title}-${id}`}
                      className="font-bold text-white"
                    >
                      {active.title}
                    </motion.h3>
                    <motion.p
                      layoutId={`description-${active.description}-${id}`}
                      className="text-white/70"
                    >
                      {active.description}
                    </motion.p>
                  </div>

                  <motion.a
                    layoutId={`button-${active.title}-${id}`}
                    href={active.ctaLink}
                    target="_blank"
                    className="px-4 py-3 text-sm rounded-full font-bold bg-tesla-blue text-white"
                  >
                    {active.ctaText}
                  </motion.a>
                </div>
                <div className="pt-4 relative px-4">
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-white/80 text-xs md:text-sm lg:text-base h-40 md:h-fit pb-10 flex flex-col items-start gap-4 overflow-auto [mask:linear-gradient(to_bottom,white,white,transparent)] [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch]"
                  >
                    {typeof active.content === "function"
                      ? active.content()
                      : active.content}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
      <ul className="max-w-2xl mx-auto w-full gap-4">
        {cards.map((card) => (
          <motion.div
            layoutId={`card-${card.title}-${id}`}
            key={`card-${card.title}-${id}`}
            onClick={() => setActive(card)}
            className="p-4 flex flex-col md:flex-row justify-between items-center glass-card hover:bg-glass-highlight rounded-xl cursor-pointer mb-4"
          >
            <div className="flex gap-4 flex-col md:flex-row">
              <motion.div layoutId={`image-${card.title}-${id}`}>
                <img
                  src={card.src}
                  alt={card.title}
                  className="h-40 w-40 md:h-14 md:w-14 rounded-lg object-cover object-top"
                />
              </motion.div>
              <div className="">
                <motion.h3
                  layoutId={`title-${card.title}-${id}`}
                  className="font-medium text-white text-center md:text-left"
                >
                  {card.title}
                </motion.h3>
                <motion.p
                  layoutId={`description-${card.description}-${id}`}
                  className="text-white/70 text-center md:text-left"
                >
                  {card.description}
                </motion.p>
              </div>
            </div>
            <motion.button
              layoutId={`button-${card.title}-${id}`}
              className="px-4 py-2 text-sm rounded-full font-bold bg-glass hover:bg-tesla-blue hover:text-white text-white/90 mt-4 md:mt-0"
            >
              {card.ctaText}
            </motion.button>
          </motion.div>
        ))}
      </ul>
    </>
  );
}

const cards = [
  {
    description: "Model S",
    title: "Luxury Sedan",
    src: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dGVzbGElMjBtb2RlbCUyMHN8ZW58MHx8MHx8fDA%3D",
    ctaText: "Explore",
    ctaLink: "https://www.tesla.com",
    content: () => {
      return (
        <p>
          The Tesla Model S is an all-electric luxury sedan renowned for its sleek design and exceptional performance. As Tesla's flagship vehicle, it offers impressive range, rapid acceleration, and cutting-edge technology features. The Model S has redefined the electric vehicle segment with its premium interior, minimalist design philosophy, and advanced Autopilot capabilities. With over-the-air updates continuously improving its functionality, the Model S represents Tesla's commitment to sustainable transportation without compromising on luxury or performance.
        </p>
      );
    },
  },
  {
    description: "Model 3",
    title: "Popular EV",
    src: "https://images.unsplash.com/photo-1532974297617-c0f05fe48bff?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHRlc2xhJTIwbW9kZWwlMjAzfGVufDB8fDB8fHww",
    ctaText: "Explore",
    ctaLink: "https://www.tesla.com",
    content: () => {
      return (
        <p>
          The Tesla Model 3 is a compact electric sedan that has become one of the world's best-selling electric vehicles. Designed to bring Tesla's innovative technology to a broader market, the Model 3 combines affordability with impressive performance and range. Its minimalist interior features a single central touchscreen that controls nearly all vehicle functions, creating a clean and futuristic cabin experience. With strong safety ratings, regular software updates, and access to Tesla's extensive Supercharger network, the Model 3 represents the company's mission to accelerate the world's transition to sustainable energy.
        </p>
      );
    },
  },
  {
    description: "Model X",
    title: "Premium SUV",
    src: "https://images.unsplash.com/photo-1566055909643-a51b4271d2bf?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dGVzbGElMjBtb2RlbCUyMHh8ZW58MHx8MHx8fDA%3D",
    ctaText: "Explore",
    ctaLink: "https://www.tesla.com",
    content: () => {
      return (
        <p>
          The Tesla Model X is a luxury all-electric SUV known for its distinctive falcon-wing doors and spacious interior. With seating for up to seven passengers, it combines family practicality with high-performance capabilities. The Model X features dual-motor all-wheel drive, impressive acceleration, and substantial towing capacity. Its large panoramic windshield offers exceptional visibility, while its advanced air filtration system provides hospital-grade air quality inside the cabin. With autonomous driving features and Tesla's innovative technology, the Model X stands as one of the most capable and distinctive electric SUVs on the market.
        </p>
      );
    },
  },
  {
    description: "Model Y",
    title: "Compact SUV",
    src: "https://images.unsplash.com/photo-1619726578880-3968591f35e5?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dGVzbGElMjBtb2RlbCUyMHl8ZW58MHx8MHx8fDA%3D",
    ctaText: "Explore",
    ctaLink: "https://www.tesla.com",
    content: () => {
      return (
        <p>
          The Tesla Model Y is a compact electric crossover SUV that blends the accessibility of the Model 3 with added utility. Sharing much of its design and components with the Model 3, the Model Y offers more interior space and cargo capacity while maintaining impressive range and performance. Its higher seating position provides better visibility, and the optional third-row seating allows for greater passenger capacity. The Model Y features Tesla's minimalist interior design philosophy, centered around a large touchscreen interface. As one of Tesla's more affordable SUV options, the Model Y has quickly become a popular choice for families seeking an electric vehicle with additional practicality.
        </p>
      );
    },
  },
  {
    description: "Cybertruck",
    title: "Electric Pickup",
    src: "https://images.unsplash.com/photo-1704348962216-45b3a38bb559?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dGVzbGElMjBjeWJlcnRydWNrfGVufDB8fDB8fHww",
    ctaText: "Explore",
    ctaLink: "https://www.tesla.com",
    content: () => {
      return (
        <p>
          The Tesla Cybertruck is a revolutionary electric pickup truck with a distinctive futuristic design unlike any conventional vehicle. Featuring an angular exoskeleton made from ultra-hard stainless steel and armored glass, the Cybertruck was designed to combine the utility of a truck with the performance of a sports car. It offers impressive towing capacity, adjustable air suspension, and a range that challenges traditional combustion-engine trucks. The bed, referred to as the "vault," includes a built-in cover and integrated ramp. With its radical departure from traditional automotive design and robust capabilities, the Cybertruck represents Tesla's vision for reimagining the pickup truck segment with sustainable electric technology.
        </p>
      );
    },
  },
];
