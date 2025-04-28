import {createClient} from "@/prismicio";
import {SliceZone} from "@prismicio/react";
import {components} from "@/slices";
import {Content} from "@prismicio/client";

export default async function Recipe({id}:{id: string}) {
  const client = createClient();
  const page = await client.getByID<Content.AllRecipesDocument>(id);
  return <SliceZone slices={page.data.slices} components={components} />;
}