import { useLocation } from "react-router-dom";
import { SEARCH_PAGES } from "../content/searchPages";
import { SearchPage, NotFound } from "./SearchPage";

/**
 * Every service, industry, market, guide and story page, plus the 404, behind
 * one lazy route. The page copy in searchPages.ts is the largest thing on the
 * site (over 100 KB) and grows with every article, so it loads only when one
 * of these pages is opened, not on every visit. The prerender still writes
 * each page's complete HTML, so search engines see exactly what they did.
 */
export default function SearchRoute() {
  const path = useLocation().pathname.replace(/\/+$/, "") || "/";
  const page = SEARCH_PAGES.find((p) => p.path === path);
  return page ? <SearchPage page={page} /> : <NotFound />;
}
