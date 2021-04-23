export interface Props {
  /** tooltip 的文案内容 */
  title: string;
  /** 对齐的位置，默认为 center */
  position?: 'left' | 'right' | 'center';
  /** 距离顶部的距离 */
  distanceFromTop?: number;
  /** left 新增的距离 */
  distanceAddonLeft?: number;
}
