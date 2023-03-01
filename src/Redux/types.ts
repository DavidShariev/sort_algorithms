
export type TArrayEl = {
  id: number,
  image: NodeRequire
}

export interface IState{
  status: "waiting" | "sorting" | "stoped" | "sorted",
  array: TArrayEl[]
}