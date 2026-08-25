/**
 * ScrollFloat — vendored from React Bits (reactbits.dev), TS + Tailwind variant.
 *
 * LOCAL ADAPTATIONS:
 *   1. The effect now cleans up (gsap.context + revert). The original creates a
 *      ScrollTrigger and never kills it, so unmounting leaks triggers.
 *   2. cn() for class overrides, and prefers-reduced-motion renders plain text.
 *   3. Characters are grouped into words. The original makes every character an
 *      independent inline-block, so the browser is free to break a line in the
 *      middle of a word — "It didn't kn / ow your b / usiness." Each word is now
 *      a nowrap wrapper holding its own characters, which animates identically
 *      and wraps like real text.
 */
import React, { useEffect, useMemo, useRef, type ReactNode, type RefObject } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '../ui';
import { useReducedMotion } from '../../lib/motion';

gsap.registerPlugin(ScrollTrigger);

interface ScrollFloatProps {
  children: ReactNode;
  scrollContainerRef?: RefObject<HTMLElement>;
  containerClassName?: string;
  textClassName?: string;
  animationDuration?: number;
  ease?: string;
  scrollStart?: string;
  scrollEnd?: string;
  stagger?: number;
}

const ScrollFloat: React.FC<ScrollFloatProps> = ({
  children,
  scrollContainerRef,
  containerClassName = '',
  textClassName = '',
  animationDuration = 1,
  ease = 'back.inOut(2)',
  scrollStart = 'center bottom+=50%',
  scrollEnd = 'bottom bottom-=40%',
  stagger = 0.03
}) => {
  const containerRef = useRef<HTMLHeadingElement>(null);
  const reduced = useReducedMotion();

  const splitText = useMemo(() => {
    const text = typeof children === 'string' ? children : '';
    let charIndex = 0;

    // Split on whitespace but keep it, so spacing survives the round trip.
    return text.split(/(\s+)/).map((chunk, wordIndex) => {
      if (/^\s+$/.test(chunk)) {
        return (
          <span className="sf-char inline-block" key={`space-${wordIndex}`}>
            {'\u00A0'}
          </span>
        );
      }
      return (
        <span className="inline-block whitespace-nowrap" key={`word-${wordIndex}`}>
          {chunk.split('').map(char => (
            <span className="sf-char inline-block" key={`char-${charIndex++}`}>
              {char}
            </span>
          ))}
        </span>
      );
    });
  }, [children]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || reduced) return;

    const scroller = scrollContainerRef && scrollContainerRef.current ? scrollContainerRef.current : window;

    const charElements = el.querySelectorAll('.sf-char');

    const ctx = gsap.context(() => {
      gsap.fromTo(
      charElements,
      {
        willChange: 'opacity, transform',
        opacity: 0,
        yPercent: 120,
        scaleY: 2.3,
        scaleX: 0.7,
        transformOrigin: '50% 0%'
      },
      {
        duration: animationDuration,
        ease: ease,
        opacity: 1,
        yPercent: 0,
        scaleY: 1,
        scaleX: 1,
        stagger: stagger,
        scrollTrigger: {
          trigger: el,
          scroller,
          start: scrollStart,
          end: scrollEnd,
          scrub: true
        }
      }
      );
    }, el);

    return () => ctx.revert();
  }, [scrollContainerRef, animationDuration, ease, scrollStart, scrollEnd, stagger, reduced]);

  return (
    <h2 ref={containerRef} className={cn('my-5 overflow-hidden', containerClassName)}>
      <span className={cn('inline-block text-[clamp(1.6rem,4vw,3rem)] leading-[1.5]', textClassName)}>
        {splitText}
      </span>
    </h2>
  );
};

export default ScrollFloat;
