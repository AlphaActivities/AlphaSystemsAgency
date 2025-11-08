import React, {createContext, useContext, useEffect, useMemo, useState} from "react";
import {useLocation} from "react-router-dom";

type Tone = "default" | "insights" | "work" | "team" | "case" | "contact";
const ToneCtx = createContext<{tone: Tone; setTone: (t: Tone)=>void}>({tone:"default", setTone: ()=>{}});
export const useTone = ()=>useContext(ToneCtx);

const routeToTone = (pathname: string): Tone => {
  if (pathname.startsWith("/insights")) return "insights";
  if (pathname.startsWith("/work")) return "work";
  if (pathname.startsWith("/team")) return "team";
  if (pathname.startsWith("/contact")) return "contact";
  if (pathname.startsWith("/case")) return "case";
  return "default";
};

export default function ToneProvider({children}:{children:React.ReactNode}) {
  const {pathname} = useLocation();
  const [tone, setTone] = useState<Tone>("default");

  useEffect(()=>{ setTone(routeToTone(pathname)); }, [pathname]);

  const css = useMemo(()=>({
    "--tone-hue": ({
      default: 265,
      insights: 305,
      work: 245,
      team: 260,
      case: 275,
      contact: 265
    } as Record<Tone, number>)[tone].toString(),
    "--tone-accent": ({
      default: "#F5D76E",
      insights: "#F06CF0",
      work: "#7FB5FF",
      team: "#C3A6FF",
      case: "#B08CFF",
      contact: "#F5D76E"
    } as Record<Tone, string>)[tone]
  }), [tone]);

  return <ToneCtx.Provider value={{tone, setTone}}>
    <div style={css as React.CSSProperties} className="tone-smooth">{children}</div>
  </ToneCtx.Provider>;
}
