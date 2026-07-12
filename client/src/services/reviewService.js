const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

/**
 * Fetch all reviews from the backend (newest first).
 * @returns {Promise<Array>} array of review objects
 */
export async function fetchReviews() {
  const res = await fetch(`${API_BASE}/reviews`);
  if (!res.ok) {
    throw new Error(`Failed to fetch reviews (${res.status})`);
  }
  const json = await res.json();
  return json.data;
}

/**
 * Submit a new review.
 * @param {{ name: string, email: string, rating: number, message: string }} payload
 * @returns {Promise<Object>} the created review object
 * @throws {Object} { errors } on validation failure, or Error on network/server error
 */
export async function submitReview(payload) {
  const res = await fetch(`${API_BASE}/reviews`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const json = await res.json();

  if (res.status === 422) {
    // Field-level validation errors from backend
    const err = new Error('Validation failed');
    err.fieldErrors = json.errors;
    throw err;
  }

  if (!res.ok) {
    throw new Error(json.error || 'Failed to submit review. Please try again.');
  }

  return json.data;
}
