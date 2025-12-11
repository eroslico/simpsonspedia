import { useState, useEffect, useCallback, useRef } from "react";

interface UseInfiniteScrollOptions {
  threshold?: number;
}

export function useInfiniteScroll(
  loadMore: () => void,
  hasMore: boolean,
  loading: boolean,
  options: UseInfiniteScrollOptions = {}
) {
  const { threshold = 200 } = options;
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;
      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasMore && !loading) {
            loadMore();
          }
        },
        { rootMargin: `${threshold}px` }
      );

      if (node) observerRef.current.observe(node);
    },
    [loading, hasMore, loadMore, threshold]
  );

  return { loadMoreRef };
}
