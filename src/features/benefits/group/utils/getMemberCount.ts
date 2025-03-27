const thresholds: { value: number; format: (v: number) => string }[] = [
  { value: 10, format: v => v.toString() },
  { value: 100, format: v => `${Math.floor(v / 10) * 10}` },
  { value: 1000, format: v => `${Math.floor(v / 100) * 100}` },
  { value: 1000000, format: v => `${(v / 1000).toFixed(0)}K` },
  { value: 10000000, format: v => `${(v / 1000000).toFixed(1)}M` },
  { value: 1000000000, format: v => `${(v / 1000000).toFixed(0)}M` },
  { value: 10000000000, format: v => `${(v / 1000000000).toFixed(1)}B` },
];

export const getMemberCount = (memberCount: number) => {
  for (let i = 0; i < thresholds.length; i += 1) {
    const { format, value } = thresholds[i];
    if (memberCount < value) {
      return format(memberCount);
    }
  }

  return `${(memberCount / 1000000000).toFixed(0)}B`;
};
