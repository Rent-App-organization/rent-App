import React, { useState, useMemo } from "react";
import { FaStar } from "react-icons/fa";

/**
 * @param {Array} reviews - An array of review objects:
 *   { id, propertyId, reviewerName, rating, comment }
 * @param {Array} properties - An array of properties:
 *   { id, title, ... }
 */
export default function ReviewsSection({ reviews = [], properties = [] }) {
  const [propertyFilter, setPropertyFilter] = useState("");

  // A helper to get property name from propertyId
  const getPropertyName = (propertyId) => {
    const prop = properties.find((p) => p.id === propertyId);
    return prop ? prop.title : "Unknown Property";
  };

  // Filter reviews by the selected property (if any)
  const filteredReviews = reviews.filter((review) => {
    if (!propertyFilter) return true;
    // Only show reviews matching selected property
    return review.propertyId === parseInt(propertyFilter, 10);
  });

  // Calculate average rating for all reviews
  const averageRating = useMemo(() => {
    if (reviews.length === 0) return 0;
    const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
    return (totalRating / reviews.length).toFixed(1);
  }, [reviews]);

  return (
    <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Property Reviews</h2>

      {/* Average Rating Section */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-lg font-semibold text-gray-800">
          Average Rating: {averageRating} / 5
        </span>
        <div className="flex items-center">
          {Array.from({ length: 5 }, (_, i) => (
            <FaStar
              key={i}
              className={`${
                i < averageRating ? "text-yellow-500" : "text-gray-300"
              } h-5 w-5`}
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
              {/* Property Name */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-indigo-600">
                  {getPropertyName(review.propertyId)}
                </span>
                {/* Star rating */}
                <div className="flex items-center">
                  {Array.from({ length: 5 }, (_, i) => (
                    <FaStar
                      key={i}
                      className={`${
                        i < review.rating ? "text-yellow-500" : "text-gray-300"
                      } h-4 w-4`}
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
        <p className="text-gray-500 text-sm">No reviews found for the selected property.</p>
      )}
    </section>
  );
}
