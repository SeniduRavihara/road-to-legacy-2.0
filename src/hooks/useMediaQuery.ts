import { useEffect, useState } from "react";

// Utility hook to detect mobile screen size
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);
    const updateMatch = () => setMatches(mediaQueryList.matches);
    updateMatch();
    mediaQueryList.addEventListener("change", updateMatch);

    return () => mediaQueryList.removeEventListener("change", updateMatch);
  }, [query]);

  return matches;
}
