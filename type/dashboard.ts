export type DashboardType = {
  productsCount: number;
  addressCount: number;
  articlesCount: number;
  partnerCount: number;
  visitor: {
    week: string;
    startDateOfWeek: string;
    sum: number;
  }[];
};
