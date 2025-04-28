import {FC} from "react";
import {Content} from "@prismicio/client";
import {SliceComponentProps} from "@prismicio/react";
import {PrismicNextImage} from "@prismicio/next";

/**
 * Props for `RecipeCard`.
 */
export type RecipeCardProps = SliceComponentProps<Content.RecipeCardSlice>;

/**
 * Component for "RecipeCard" Slices.
 */
const RecipeCard: FC<RecipeCardProps> = ({slice}) => {
  return (
    <div
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="group overflow-hidden rounded-lg bg-white shadow-md transition-all duration-300 hover:shadow-lg hover:translate-y-[-4px]"
    >
      {/* Recipe image */}
      <div className="relative h-52 overflow-hidden bg-amber-100">
        <PrismicNextImage
          field={slice.primary.main_image}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Favorite badge if applicable */}
        {slice.primary.is_favorited && (
          <div className="absolute top-4 right-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-amber-600 shadow-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-5 w-5"
              >
                <path
                  d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z"
                />
              </svg>
            </div>
          </div>
        )}

        {/* Cuisine tag if available */}
        {slice.primary.cuisine && (
          <div
            className="absolute bottom-4 left-4 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-amber-800 shadow-sm">
            {slice.primary.cuisine}
          </div>
        )}
      </div>

      {/* Recipe content */}
      <div className="p-5">
        {/* Title */}
        <h3 className="mb-3 text-xl font-bold text-gray-900 line-clamp-2">
          {slice.primary.title}
        </h3>

        {/* Rating display */}
        {(slice.primary.rating_value || slice.primary.rating_count) && (
          <div className="mb-4 flex items-center">
            {/* Star rating */}
            {slice.primary.rating_value && (
              <div className="flex items-center">
                <div className="flex mr-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill={star <= Math.round(Number(slice.primary.rating_value)) ? "currentColor" : "none"}
                      stroke="currentColor"
                      className={`h-4 w-4 ${
                        star <= Math.round(Number(slice.primary.rating_value))
                          ? "text-amber-500"
                          : "text-gray-300"
                      }`}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={star <= Math.round(Number(slice.primary.rating_value)) ? 0 : 1.5}
                        d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                      />
                    </svg>
                  ))}
                </div>
                <span className="text-sm font-medium text-gray-700">
                  {slice.primary.rating_value}
                </span>
              </div>
            )}

            {/* Review count */}
            {slice.primary.rating_count && (
              <span className="ml-2 text-xs text-gray-500">
                ({slice.primary.rating_count} {Number(slice.primary.rating_count) === 1 ? 'review' : 'reviews'})
              </span>
            )}
          </div>
        )}

        {/* Action link - assuming you might want to add a link in the future */}
        <div className="mt-4 flex justify-end">
          <button className="inline-flex items-center text-sm font-medium text-amber-700 hover:text-amber-800">
            View Recipe
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="ml-1 h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};


export default RecipeCard;
