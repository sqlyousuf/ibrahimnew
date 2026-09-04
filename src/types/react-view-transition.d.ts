// @types/react (19.2.18) predates React's <ViewTransition> and the
// viewTransitionName style property, both shipped in the React 19.2 canary
// that Next.js 16's app router bundles internally (see
// node_modules/next/dist/compiled/react — `exports.ViewTransition` is
// present there even though it's absent from node_modules/react and
// @types/react). This augments the types only; the runtime export already
// exists via Next's bundler aliasing.
import "react";

declare module "react" {
  interface ViewTransitionProps {
    children?: React.ReactNode;
    name?: string;
    default?: string | Record<string, string>;
    share?: string | Record<string, string>;
    enter?: string | Record<string, string>;
    exit?: string | Record<string, string>;
    update?: string | Record<string, string>;
  }

  export const ViewTransition: React.ComponentType<ViewTransitionProps>;

  interface CSSProperties {
    viewTransitionName?: string;
    viewTransitionClass?: string;
  }
}
