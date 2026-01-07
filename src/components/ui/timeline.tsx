"use client";
import {
  useMotionValueEvent,
  useScroll,
  useTransform,
  motion,
} from "motion/react";
import React, { useEffect, useRef, useState } from "react";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
  image: string;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div
      className="w-fullfont-sans md:px-10 "
      ref={containerRef}
    >

      <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
        {data.map((item, index) => (
          <div
            key={index}
            className={`flex justify-between md:justify-start pt-10 md:pt-20 md:gap-10 md:px-20 ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
          >

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="hidden md:block relative pl-10 pr-10 w-full">
              <div className="overflow-hidden aspect-square group h-full flex items-center justify-center ">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start w-20">
              <div className="h-10 w-10 md:h-20 md:w-20 absolute md:-translate-x-1/2 left-3 md:left-1/2 rounded-full bg-primary flex items-center justify-center">
                <h3 className="text-sm md:text-md font-bold text-ivory">
                  {item.title}
                </h3>
              </div>
            </motion.div>

            <div
              className="relative pl-10 pr-10 w-full">
              <motion.h3
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="md:hidden block text-2xl text-left font-bold text-primary px-4">
                {item.title}
              </motion.h3>
              {item.content}{" "}
              {/* Image */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="md:hidden block w-full px-4">
                <div className="overflow-hidden aspect-auto group ">
                  <img
                    src={item.image}
                    alt={item.title}
                    decoding="async"
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        ))}
        <div
          style={{
            height: height + "px",
          }}
          className="absolute md:left-1/2 left-8 -translate-x-1/2 top-0 overflow-hidden w-2 
          bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] 
          from-transparent from-0% via-accent to-transparent to-99%
          mask-[linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] "
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-2 bg-linear-to-t from-accent via-primary to-transparent from-0% via-10% rounded-full"
          />
        </div>
      </div>
    </div>
  );
};
