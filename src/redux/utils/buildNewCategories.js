const buildNewCategories = (prev_categories, new_category) => {
  const updated_categories = [];

  if (!new_category?.parentId) return [...prev_categories, new_category];

  for (let cg of prev_categories) {
    if (cg._id === new_category.parentId) {
      updated_categories.push({
        ...cg,
        children: buildNewCategories(
          [...cg.children, new_category],
          new_category
        ),
      });
    } else {
      updated_categories.push({
        ...cg,
        children: buildNewCategories(cg.children, new_category),
      });
    }
  }

  return updated_categories;
};

export default buildNewCategories;
