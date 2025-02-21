export enum WasteCategoryEnum {
  "MULTI_MATERIAL" = "category1",
  "PAPER" = "category2",
  "GLASS" = "category3",
  "METAL" = "category4",
  "PLASTIC" = "category5",
}

export const WasteCategoryLabels = {
  [WasteCategoryEnum.MULTI_MATERIAL]: "Multi-Material",
  [WasteCategoryEnum.PAPER]: "Paper",
  [WasteCategoryEnum.GLASS]: "Glass",
  [WasteCategoryEnum.METAL]: "Metal",
  [WasteCategoryEnum.PLASTIC]: "Plastic",
};
