"use client";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { ReactNode, useState, useRef } from "react";
import { KeenSliderInstance } from "keen-slider";

interface SliderProps {
  children: ReactNode;
  slidesPerView?:
    | {
        mobile?: number;
        tablet?: number;
        desktop?: number;
      }
    | number;
  spacing?: number;
  mobileSpacing?: number;
  showPagination?: boolean;
}

const WheelControls = (slider: KeenSliderInstance) => {
  let touchTimeout: NodeJS.Timeout;
  let position: { x: number; y: number };
  let wheelActive: boolean;
  const dispatch = (e: WheelEvent, name: string) => {
    position.x -= e.deltaX;
    position.y -= e.deltaY;
    slider.container.dispatchEvent(
      new CustomEvent(name, {
        detail: {
          x: position.x,
          y: position.y,
        },
      })
    );
  };
  const wheelStart = (e: WheelEvent) => {
    position = {
      x: e.pageX,
      y: e.pageY,
    };
    dispatch(e, "ksDragStart");
  };
  const wheel = (e: WheelEvent) => {
    dispatch(e, "ksDrag");
  };
  const wheelEnd = (e: WheelEvent) => {
    dispatch(e, "ksDragEnd");
  };
  const eventWheel = (e: WheelEvent) => {
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
      e.preventDefault();
      if (!wheelActive) {
        wheelStart(e);
        wheelActive = true;
      }
      wheel(e);
      clearTimeout(touchTimeout);
      touchTimeout = setTimeout(() => {
        wheelActive = false;
        wheelEnd(e);
      }, 50);
    }
  };
  slider.on("created", () => {
    slider.container.addEventListener("wheel", eventWheel, {
      passive: false,
    });
  });
};

export function Slider({
  children,
  slidesPerView = { mobile: 1, tablet: 1, desktop: 1 },
  spacing = 16,
  mobileSpacing = 12,
  showPagination = false,
}: SliderProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slidesCount, setSlidesCount] = useState(0);
  const sliderInstanceRef = useRef<KeenSliderInstance | null>(null);

  const defaultSlides =
    typeof slidesPerView === "number" ? slidesPerView : slidesPerView.desktop;
  const mobileSlides =
    typeof slidesPerView === "number"
      ? slidesPerView
      : slidesPerView.mobile ?? 1;
  const tabletSlides =
    typeof slidesPerView === "number"
      ? slidesPerView
      : slidesPerView.tablet ?? defaultSlides;

  const [sliderRef] = useKeenSlider(
    {
      slides: {
        perView: mobileSlides,
        spacing: mobileSpacing,
      },
      breakpoints: {
        "(min-width: 768px)": {
          slides: {
            perView: tabletSlides,
            spacing: spacing,
          },
        },
        "(min-width: 1024px)": {
          slides: {
            perView: defaultSlides,
            spacing: spacing,
          },
        },
      },
      dragSpeed: 1,
      rubberband: true,
      defaultAnimation: {
        duration: 500,
      },
      slideChanged(slider) {
        setCurrentSlide(slider.track.details.rel);
      },
      created(slider) {
        setIsLoaded(true);
        setSlidesCount(slider.track.details.slides.length);
        sliderInstanceRef.current = slider;
      },
    },
    [WheelControls]
  );

  return (
    <div className="relative">
      <div
        ref={sliderRef}
        className={`keen-slider !overflow-visible transition-opacity ${
          isLoaded ? "opacity-100 duration-1000" : "opacity-0"
        }`}
      >
        {Array.isArray(children) ? (
          children.map((child, index) => (
            <div key={index} className="keen-slider__slide">
              {child}
            </div>
          ))
        ) : (
          <div className="keen-slider__slide">{children}</div>
        )}
      </div>

      {showPagination && slidesCount > 1 && (
        <div className="flex justify-center mt-4 gap-2">
          {Array.from({ length: slidesCount }).map((_, idx) => (
            <span
              key={idx}
              className={`w-2 h-2 rounded-full transition-colors ${
                currentSlide === idx ? "bg-[#0a5778]" : "bg-[#ccc]"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
