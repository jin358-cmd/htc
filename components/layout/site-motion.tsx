"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const introKey = "htc-home-intro-seen";

export function SiteMotion() {
  const pathname = usePathname();
  const [previousPath, setPreviousPath] = useState(pathname);
  const [transitionCount, setTransitionCount] = useState(0);
  const [showIntro, setShowIntro] = useState(false);

  if (pathname !== previousPath) {
    setPreviousPath(pathname);
    setTransitionCount(transitionCount + 1);
    setShowIntro(false);
  }

  useEffect(() => {
    if (pathname !== "/" || window.location.hash) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const frame = window.requestAnimationFrame(() => {
      try {
        if (window.sessionStorage.getItem(introKey)) return;
        window.sessionStorage.setItem(introKey, "1");
      } catch {
        // The intro can still play when browser storage is unavailable.
      }
      setShowIntro(true);
    });

    return () => window.cancelAnimationFrame(frame);
  }, [pathname]);

  return (
    <div aria-hidden="true" className="site-motion">
      {transitionCount > 0 && (
        <div key={transitionCount} className="site-transition" />
      )}
      {pathname === "/" && showIntro && (
        <div className="site-intro" onAnimationEnd={(event) => {
          if (event.target === event.currentTarget) setShowIntro(false);
        }}>
          <div className="site-intro-frame">
            <span className="site-intro-brand">弘泰科技</span>
            <span className="site-intro-rule" />
            <span className="site-intro-tagline">讓生活，多一點選擇。</span>
          </div>
        </div>
      )}
    </div>
  );
}
