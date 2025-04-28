import {FC} from "react";
import {Content} from "@prismicio/client";
import {PrismicRichText, SliceComponentProps} from "@prismicio/react";
import Recipe from "@/slices/RecipeGrid/Recipe";

/**
 * Props for `RecipeGrid`.
 */
export type RecipeGridProps = SliceComponentProps<Content.RecipeGridSlice>;

/**
 * Component for "RecipeGrid" Slices.
 */
const RecipeGrid: FC<RecipeGridProps> = ({slice}: RecipeGridProps) => {
  const recipes = slice.primary.recipes || [];

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-amber-50"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="mb-4">
            <PrismicRichText
              field={slice.primary.heading}
              components={{
                heading2: ({children}) => (
                  <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                    {children}
                    <span className="text-amber-700">.</span>
                  </h2>
                ),
              }}
            />
          </div>
        </div>

        {/* Recipe Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {recipes.map((item) => (
            <Recipe id={item.recipe.id} key={item.recipe.id}/>
          ))}
        </div>
      </div>
    </section>
  );

};

export default RecipeGrid;
