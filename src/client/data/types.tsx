export type AntData = {
  name: string;
  length: number;
  color: string;
  weight: number;
  winPercent?: number;
}

export type AntProps = AntData & {
  beginRace: boolean;
  index: number;
  setWinPercent: (idx: number, winPercent: number) => void;
}