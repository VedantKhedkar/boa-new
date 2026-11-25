'use client';

import { useState, useEffect } from 'react';

const DEFAULT_PHRASES = [
  'Best IT Services of Amravati',
  'Best Restaurants & Cafes of Amravati',
  'Best Jewelry of Shop Sarafa Bazar',
  'Best Doctors & Hospitals of Amravati',
];

export function useTypewriterPlaceholder(
  phrases: string[] = DEFAULT_PHRASES,
  prefix: string = 'Search "'
): string {
  const [displayText, setDisplayText] = useState(phrases[0] || '');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(true);

  useEffect(() => {
    const currentPhrase = phrases[phraseIndex % phrases.length];
    let timer: NodeJS.Timeout;

    if (isPaused) {
      // Comfortable pause at full text before deleting
      timer = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, 2200);
      return () => clearTimeout(timer);
    }

    if (!isDeleting) {
      // Natural typing speed
      if (displayText.length < currentPhrase.length) {
        timer = setTimeout(() => {
          setDisplayText(currentPhrase.slice(0, displayText.length + 1));
        }, 65);
      } else {
        // Reached end of phrase, pause
        setIsPaused(true);
      }
    } else {
      // Smooth deleting backward
      if (displayText.length > 0) {
        timer = setTimeout(() => {
          setDisplayText(currentPhrase.slice(0, displayText.length - 1));
        }, 35);
      } else {
        // Reached empty, advance to next phrase
        setIsDeleting(false);
        setPhraseIndex((prev) => (prev + 1) % phrases.length);
      }
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, isPaused, phraseIndex, phrases]);

  return `${prefix}${displayText}"`;
}
