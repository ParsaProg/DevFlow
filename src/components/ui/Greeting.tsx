"use client";

import { useEffect, useMemo, useState } from "react";

type TimeSlot = {
  range: [number, number]; // hours in 24h format
  greetings: string[];
  emoji: string;
};

const TIME_SLOTS: TimeSlot[] = [
  {
    range: [5, 8],
    greetings: [
      "Rise and shine",
      "Early bird",
      "Good morning",
      "Morning",
      "Wakey wakey",
    ],
    emoji: "🌅",
  },
  {
    range: [8, 12],
    greetings: [
      "Good morning",
      "Morning",
      "Hope your day's off to a great start",
      "Ready to crush it?",
      "Let's make today count",
    ],
    emoji: "☀️",
  },
  {
    range: [12, 13],
    greetings: [
      "Happy lunch hour",
      "Take a breather",
      "Midday check-in",
      "Good afternoon",
    ],
    emoji: "🥗",
  },
  {
    range: [13, 17],
    greetings: [
      "Good afternoon",
      "Afternoon",
      "Keeping the momentum going?",
      "Hope your afternoon's smooth",
      "Halfway through",
    ],
    emoji: "⛅",
  },
  {
    range: [17, 20],
    greetings: [
      "Good evening",
      "Evening",
      "Wrapping up for the day?",
      "Hope it's been a good one",
      "Golden hour",
    ],
    emoji: "🌇",
  },
  {
    range: [20, 23],
    greetings: [
      "Good night",
      "Evening",
      "Burning the midnight oil?",
      "Winding down?",
      "Still at it?",
    ],
    emoji: "🌙",
  },
  {
    range: [23, 29], // 23–05 (29 = 24+5 for wrap-around)
    greetings: [
      "Burning the midnight oil",
      "Night owl mode",
      "Late night hustle",
      "Still going?",
      "You're dedicated",
    ],
    emoji: "🦉",
  },
];

function getGreeting(name: string): { text: string; emoji: string } {
  const hour = new Date().getHours();

  const slot =
    TIME_SLOTS.find(({ range: [start, end] }) => {
      if (end > 24) {
        // wrap-around (e.g. 23–05)
        return hour >= start || hour < end - 24;
      }
      return hour >= start && hour < end;
    }) ?? TIME_SLOTS[1]; // fallback to morning

  const phrase =
    slot.greetings[Math.floor(Math.random() * slot.greetings.length)];

  return {
    text: `${phrase}, ${name}`,
    emoji: slot.emoji,
  };
}

type GreetingProps = {
  name: string;
  className?: string;
  showEmoji?: boolean;
};

export default function Greeting({
  name,
  className = "",
  showEmoji = true,
}: GreetingProps) {
  const [mount, setMount] = useState<boolean>(false);
  useEffect(() => {
    setMount(true);
  }, []);
  // useMemo so the greeting is stable across re-renders within the same session
  const { text, emoji } = useMemo(() => getGreeting(name), [name]);

  if (!mount) return null;
  return (
    <h1 className={`text-white font-bold text-2xl ${className}`}>
      {showEmoji && <span className="mr-2">{emoji}</span>}
      {text}
    </h1>
  );
}
