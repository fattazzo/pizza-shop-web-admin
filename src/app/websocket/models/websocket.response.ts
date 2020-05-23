export class SocketResponse {
  type: SocketResponseType;
  data: any;
}

export enum SocketResponseType {
  ERROR, SUCCESS
}
