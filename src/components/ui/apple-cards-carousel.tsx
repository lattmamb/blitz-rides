
"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CardProps {
  card: {
    category: string;
    title: string;
    src: string;
    content: React.ReactNode;
  };
  index: number;
}

export const Card: React.FC<CardProps> = ({ card, index }) => {
  const [expanded, setExpanded] = useState(false);
  const [bodyHeight, setBodyHeight] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      setBodyHeight(expanded ? contentRef.current.scrollHeight : 0);
    }
  }, [expanded]);

  return (
    <motion.div
      layout
      className={cn(
        "w-full max-w-7xl mx-auto bg-black/5 dark:bg-white/5 rounded-3xl overflow-hidden",
        expanded ? "backdrop-blur-lg" : ""
      )}
      animate={{
        marginTop: expanded ? "40px" : "0px",
        marginBottom: expanded ? "40px" : "0px",
        zIndex: expanded ? 20 : 10 - index,
      }}
      transition={{ duration: 0.5 }}
      style={{
        backgroundImage: `url(${card.src})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        position: "relative",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60 backdrop-blur-[1px]" />

      <motion.div layout>
        <div
          onClick={() => setExpanded(!expanded)}
          className="relative p-8 md:p-12 cursor-pointer"
        >
          <motion.div layout>
            <p className="text-sm md:text-base font-medium text-white uppercase tracking-wider mb-2">
              {card.category}
            </p>
            <h2 className="text-xl md:text-4xl font-bold text-white mb-2">
              {card.title}
            </h2>

            {!expanded && (
              <motion.button
                className="text-white text-sm hover:underline mt-2 font-medium"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                Learn more
              </motion.button>
            )}

            {expanded && (
              <motion.div
                className="overflow-hidden mt-4"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  height: bodyHeight,
                }}
                style={{ height: bodyHeight }}
                transition={{ duration: 0.5 }}
              >
                <div ref={contentRef}>{card.content}</div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export const Carousel = ({
  items,
  gap = 32,
}: {
  items: React.ReactNode[];
  gap?: number;
}) => {
  const [element, setElement] = useState<HTMLDivElement | null>(null);
  const [expanded, setExpanded] = useState(false);
  const [viewportWidth, setViewportWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth !== viewportWidth) {
        setViewportWidth(window.innerWidth);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [viewportWidth]);

  useEffect(() => {
    if (element) {
      const observer = new MutationObserver(() => {
        const isExpanded = element.querySelector('[style*="margin-top: 40px"]');
        setExpanded(!!isExpanded);
      });

      observer.observe(element, {
        attributes: true,
        subtree: true,
        attributeFilter: ["style"],
      });

      return () => observer.disconnect();
    }
  }, [element]);

  return (
    <motion.div
      ref={setElement}
      className={cn(
        "custom-scrollbar p-4 !pb-8 flex gap-8 overflow-x-auto snap-x snap-mandatory max-w-7xl mx-auto",
        expanded ? "!overflow-hidden" : "overflow-x-auto"
      )}
      style={{
        WebkitOverflowScrolling: "touch",
        scrollbarWidth: "none",
        msOverflowStyle: "none",
        gap,
      }}
    >
      {React.Children.map(items, (item, index) => (
        <motion.div
          key={index}
          className={cn(
            "min-w-[85%] md:min-w-[500px] flex-shrink-0 snap-center",
            expanded ? "" : "snap-always"
          )}
        >
          {item}
        </motion.div>
      ))}
    </motion.div>
  );
};
