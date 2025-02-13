import React, { useState, useMemo } from "react";
import { FaStar } from "react-icons/fa";

/**
 * ReviewsSection displays reviews and allows filtering by property.
 *
 * @param {Array} reviews - Array of review objects { id, productId, reviewerName, rate, comment }
 * @param {Array} properties - Array of property objects { id, title, ... }
 */
export default function ReviewsSection({ reviews = [], properties = [] }) {
  const [propertyFilter, setPropertyFilter] = useState("");

  // Helper to get property name from a review's productId.
  const getPropertyName = (propertyId) => {
    const prop = properties.find(
      (p) => p.id.toString() === propertyId.toString()
    );
    return prop ? prop.title : "Unknown Property";
  };

  // Filter reviews by the selected property (if any).
  const filteredReviews = useMemo(() => {
    if (!propertyFilter) return reviews;
    return reviews.filter(
      (review) => review.productId.toString() === propertyFilter.toString()
    );
  }, [reviews, propertyFilter]);

  // Calculate average rating for filtered reviews.
  const averageRating = useMemo(() => {
    if (filteredReviews.length === 0) return 0;
    const totalRating = filteredReviews.reduce(
      (acc, review) => acc + (Number(review.rate) || 0),
      0
    );
    return totalRating / filteredReviews.length;
  }, [filteredReviews]);

  return (
    <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Property Reviews</h2>

      {/* Average Rating Section */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-lg font-semibold text-gray-800">
          Average Rating: {averageRating.toFixed(1)} / 5
        </span>
        <div className="flex items-center">
          {Array.from({ length: 5 }, (_, i) => (
            <FaStar
              key={i}
              className={`h-5 w-5 ${
                i < Math.round(averageRating)
                  ? "text-yellow-500"
                  : "text-gray-300"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Property Filter Dropdown */}
      <div className="flex items-center gap-3 mb-4">
        <label className="text-sm font-medium text-gray-700">
          Filter by Property:
        </label>
        <select
          className="border border-gray-300 rounded px-2 py-1 text-sm"
          value={propertyFilter}
          onChange={(e) => setPropertyFilter(e.target.value)}
        >
          <option value="">All Properties</option>
          {properties.map((prop) => (
            <option key={prop.id} value={prop.id}>
              {prop.title}
            </option>
          ))}
        </select>
      </div>

      {filteredReviews.length > 0 ? (
        <div className="space-y-4">
          {filteredReviews.map((review) => (
            <div
              key={review.id}
              className="bg-white border border-gray-200 rounded-lg shadow p-4 hover:shadow-md transition-shadow"
            >
              {/* Header with Property Name and Star Rating */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-indigo-600">
                  {getPropertyName(review.productId)}
                </span>
                <div className="flex items-center">
                  {Array.from({ length: 5 }, (_, i) => (
                    <FaStar
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.round(Number(review.rate) || 0)
                          ? "text-yellow-500"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className="text-sm text-gray-700 mb-2">
                <strong>Reviewer:</strong> {review.reviewerName}
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                {review.comment}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-sm">
          No reviews found for the selected property.
        </p>
      )}
    </section>
  );
}
