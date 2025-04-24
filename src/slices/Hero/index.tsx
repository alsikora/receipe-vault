import {FC} from "react";
import {Content} from "@prismicio/client";
import {PrismicRichText, SliceComponentProps} from "@prismicio/react";
import {PrismicNextLink} from "@prismicio/next";

/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>;

/**
 * Component for "Hero" Slices.
 */
const Hero: FC<HeroProps> = ({ slice }) => {
    return (
      <section
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        className="relative bg-gradient-to-br from-amber-50 to-amber-100 py-16 sm:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
      >
          <div className="max-w-7xl mx-auto">
              <div className="flex flex-col md:flex-row items-center gap-12">
                  <div className="md:w-1/2 z-10">
                      <div className="mb-6">
                          <PrismicRichText
                            field={slice.primary.heading}
                            components={{
                                heading1: ({ children }) => (
                                  <h1 className="text-4xl sm:text-5xl font-bold leading-tight text-gray-800">
                                      {children}
                                      <span className="text-amber-700">.</span>
                                  </h1>
                                ),
                            }}
                          />
                      </div>
                      <div className="prose prose-amber mb-8 max-w-xl">
                          <PrismicRichText
                            field={slice.primary.body}
                            components={{
                                paragraph: ({ children }) => (
                                  <p className="text-lg text-gray-600 mb-6">{children}</p>
                                ),
                            }}
                          />
                      </div>
                      <div>
                          <PrismicNextLink
                            field={slice.primary.button}
                            className="inline-block bg-amber-700 text-white font-medium px-6 py-3 rounded-lg shadow-md hover:bg-amber-800 hover:shadow-lg transition-all duration-200"
                          />
                      </div>
                  </div>
              </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute -top-16 -right-16 w-64 h-64 bg-amber-200 rounded-full opacity-20"></div>
          <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-amber-200 rounded-full opacity-20"></div>
      </section>
    );
};


export default Hero;
