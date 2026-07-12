import { useState, useEffect, useCallback, useRef } from 'react';
import { fetchReviews, submitReview } from '../services/reviewService';

const PAGE_SIZE = 4;

/**
 * Manages the full review lifecycle:
 * - Initial fetch with loading/error states
 * - Optimistic UI append on submit
 * - Paginated "Show More" (4 per batch)
 */
export function useReviews() {
  const [allReviews, setAllReviews]   = useState([]);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [loading, setLoading]         = useState(true);
  const [fetchError, setFetchError]   = useState(null);

  const [submitting, setSubmitting]   = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});
  const [lastAddedId, setLastAddedId] = useState(null); // for highlight animation

  const newReviewRef = useRef(null);

  // ── Load reviews on mount ──────────────────────────────────────────
  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setFetchError(null);

    fetchReviews()
      .then((data) => {
        if (!cancelled) {
          setAllReviews(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setFetchError(err.message || 'Unable to load reviews.');
          setLoading(false);
        }
      });

    return () => { cancelled = true; };
  }, []);

  // ── Paginate ───────────────────────────────────────────────────────
  const visibleReviews = allReviews.slice(0, visibleCount);
  const hasMore        = visibleCount < allReviews.length;

  const loadMore = useCallback(() => {
    setVisibleCount((prev) => prev + PAGE_SIZE);
  }, []);

  // ── Submit a new review ────────────────────────────────────────────
  const addReview = useCallback(async (payload) => {
    setSubmitting(true);
    setSubmitError(null);
    setFieldErrors({});

    try {
      const created = await submitReview(payload);

      // Optimistic prepend: newest first
      setAllReviews((prev) => [created, ...prev]);
      // Always show the new one
      setVisibleCount((prev) => Math.max(prev, PAGE_SIZE));
      setLastAddedId(created._id);

      // Scroll to new review after short delay
      setTimeout(() => {
        newReviewRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 300);

      return { success: true };
    } catch (err) {
      if (err.fieldErrors) {
        setFieldErrors(err.fieldErrors);
      } else {
        setSubmitError(err.message || 'Something went wrong. Please try again.');
      }
      return { success: false };
    } finally {
      setSubmitting(false);
    }
  }, []);

  return {
    reviews: visibleReviews,
    totalCount: allReviews.length,
    loading,
    fetchError,
    hasMore,
    loadMore,
    addReview,
    submitting,
    submitError,
    fieldErrors,
    lastAddedId,
    newReviewRef,
  };
}
