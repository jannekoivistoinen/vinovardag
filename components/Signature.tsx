"use client";

import { motion, useScroll, useTransform, MotionValue } from "motion/react";
import { useRef, useId } from "react";

interface AnimatedSignatureProps {
  paths: string[]; // Array of SVG path data
  viewBox?: string;
  width?: number;
  height?: number;
  strokeWidth?: number;
  strokeColor?: string;
  fillColor?: string;
  duration?: number;
  delay?: number;
  stagger?: number;
  className?: string;
}

interface SignatureMaskPathProps {
  pathData: string;
  index: number;
  scrollYProgress: MotionValue<number>;
  totalDuration: number;
  delay: number;
  stagger: number;
  duration: number;
  strokeWidth: number;
}

function SignatureMaskPath({
  pathData,
  index,
  scrollYProgress,
  totalDuration,
  delay,
  stagger,
  duration,
  strokeWidth,
}: SignatureMaskPathProps) {
  const pathStart = (delay + index * stagger) / totalDuration;
  const pathEnd = pathStart + duration / totalDuration;
  const pathLength = useTransform(
    scrollYProgress,
    [pathStart, pathEnd],
    [0, 1]
  );

  const fadeStart = Math.max(0, pathStart - 0.05);
  const fadeEnd = pathStart + 0.05;
  const opacity = useTransform(scrollYProgress, [fadeStart, fadeEnd], [0, 1]);

  return (
    <motion.path
      d={pathData}
      stroke="white"
      strokeWidth={strokeWidth || 2}
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
      vectorEffect="non-scaling-stroke"
      style={{
        pathLength,
        opacity,
      }}
    />
  );
}

export function AnimatedSignature({
  paths,
  viewBox = "0 0 1869.17 491.02",
  width = 220,
  height = 60,
  strokeWidth = 0,
  strokeColor = "#f7f8f8",
  fillColor = "#f7f8f8",
  duration = 2.5,
  delay = 0,
  stagger = 0.2,
  className = "",
}: AnimatedSignatureProps) {
  const ref = useRef<HTMLDivElement>(null);
  const maskId = useId();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end start"],
  });

  const totalDuration = duration + delay + (paths.length - 1) * stagger;

  const opacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div ref={ref} className={className}>
      <motion.svg
        width={width}
        height={height}
        viewBox={viewBox}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          maxWidth: width,
          width: "100%",
          height: "auto",
          opacity,
        }}
      >
        <defs>
          <mask id={maskId}>
            <rect width="100%" height="100%" fill="black" />
            {paths.map((pathData, index) => (
              <SignatureMaskPath
                key={index}
                pathData={pathData}
                index={index}
                scrollYProgress={scrollYProgress}
                totalDuration={totalDuration}
                delay={delay}
                stagger={stagger}
                duration={duration}
                strokeWidth={strokeWidth}
              />
            ))}
          </mask>
        </defs>
        {paths.map((pathData, index) => (
          <path
            key={index}
            d={pathData}
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            fill={fillColor}
            vectorEffect="non-scaling-stroke"
            mask={`url(#${maskId})`}
          />
        ))}
      </motion.svg>
    </div>
  );
}
