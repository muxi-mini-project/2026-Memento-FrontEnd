export type GuideTargetKey =
  | "dailyKeyword"
  | "publicBrowse"
  | "hintEntry"
  | "ruleHint";

export type GuideRect = {
  height: number;
  width: number;
  x: number;
  y: number;
};

export type GuideBubblePlacement = "top" | "bottom";
export type GuideBubbleAlign = "left" | "center" | "right";

export type GuideStep = {
  align?: GuideBubbleAlign;
  description: string;
  fallbackKey?: GuideTargetKey;
  key: GuideTargetKey;
  placement?: GuideBubblePlacement;
  title: string;
};
