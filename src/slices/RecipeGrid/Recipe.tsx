import {createClient} from "@/prismicio";
import {SliceZone} from "@prismicio/react";
import {components} from "@/slices";

// @ts-expect-error todo fix types
export default async function Recipe({recipe}) {
  const client = createClient();
  const page = await client.getByID(recipe.id);
  // @ts-expect-error todo fix types
  return <SliceZone slices={page.data.slices} components={components}/>;
}