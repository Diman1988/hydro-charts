export interface IElement {
  name: string;
  value: number;
}

export interface IData {
    id: number;
    name: string;
    owner: string;
    chartData: IElement[],
}
