import Category from "../typedefs/categories";

export const getCategoryEmojiFromName = (name: string) => {
  const category = Object.values(Category).find(value => value.name === name);
  return category ? category.emoji : "";
};
