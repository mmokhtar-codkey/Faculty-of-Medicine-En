export interface MenuTab {
  id: number;
  title: string;
  icon?: string;
  target?: string;
  fragment?: string;
  isActive: boolean;
  type?: 'menu' | 'columns';
  childs?: MenuTab[];
}