import React from "react";

type Props = {
  text: string;
  speed?: number;
  startDelay?: number;
  className?: string;
  reserveClassName?: string;
  ariaLabel?: string;
};

export default function Typewriter({
  text,
  speed = 28,
  startDelay = 0,
  className = "",
  reserveClassName = "",
  ariaLabel,
}: Props) {
  const [out, setOut] = React.useState("");
  const [done, setDone] = React.useState(false);

  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  React.useEffect(() => {
    if (reduced) {
      setOut(text);
      setDone(true);
      return;
    }

    let t1: number | undefined;
    let t2: number | undefined;
    let i = 0;

    t1 = window.setTimeout(() => {
      t2 = window.setInterval(() => {
        i++;
        setOut(text.slice(0, i));
        if (i >= text.length) {
          window.clearInterval(t2);
          setDone(true);
        }
      }, speed);
    }, startDelay);

    return () => {
      if (t1) window.clearTimeout(t1);
      if (t2) window.clearInterval(t2);
    };
  }, [text, speed, startDelay, reduced]);

  return (
    <span className="relative block">
      <span aria-label={ariaLabel} className={className}>
        {out}
      </span>
      {!done && (
        <span
          aria-hidden="true"
          className={`${reserveClassName} invisible absolute inset-0`}
        >
          {text}
        </span>
      )}
    </span>
  );
}
