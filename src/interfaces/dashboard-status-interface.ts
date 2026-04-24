export interface DashboardStat {
  label: string;
  value: number | string;
  unit: string;
  trend: string;
  isPositive: boolean;
}