import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could Not be loaded ");
  }
  return data;
}

export async function createEditCabin(newCabin, id) {
  const hasImagepath = newCabin.image?.startsWith?.(supabaseUrl);
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );

  const imagePath = hasImagepath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
  // https://mwequdymbuaffcfuejya.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg

  //1. Create/edit cabin
  let query = supabase.from("cabins");

  // A. Create cabin
  if (!id) {
    query = query.insert([{ ...newCabin, image: imagePath }]);
  }

  // B. Edit Cabin
  if (id) {
    query = query
      .update({ ...newCabin, image: imagePath })
      .eq("id", id)
      .select();
  }

  const { data, error } = await query.select().single();

  // If there is any error this is for error handling
  if (error) {
    console.error(error);
    throw new error("Cabins could not be created");
  }
  //2. Upload IMAGE
  if (hasImagepath) return data;

  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  //3 Delete the cabin if there was an error uploading the corresponding image
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.error(storageError);
    throw new Error(
      "Cabin images could not be uploaded and the cabin was not created "
    );
  }
  return data;
}

export async function deleteCabin(id) {
  const { error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new error("Cabins could not be deleted");
  }
}
