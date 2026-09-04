import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Registered once per bundle. Guarded so this module is safe to import from
// server-rendered files too — ScrollTrigger touches `document`, so it must
// never register during SSR.
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };
