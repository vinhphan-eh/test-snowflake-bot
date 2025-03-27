export interface SWAGDashboardTile {
  priority: number;
  id: string;
  component: () => JSX.Element;
}
