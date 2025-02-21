import { WasteCategoryEnum } from "./waste-categories.enum";

export type Points = {
  id: number | string;
  [WasteCategoryEnum.MULTI_MATERIAL]: number;
  [WasteCategoryEnum.PAPER]: number;
  [WasteCategoryEnum.GLASS]: number;
  [WasteCategoryEnum.METAL]: number;
  [WasteCategoryEnum.PLASTIC]: number;
};

export const calculateTotalPoints = (points?: Points): number => {
  if (!points) return 0;

  return Object.values(WasteCategoryEnum).reduce(
    (total, category) => total + (points[category] || 0),
    0
  );
};
