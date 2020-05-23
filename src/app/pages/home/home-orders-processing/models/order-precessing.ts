import { OrderSearchResult } from 'src/app/open-api';

export class OrderProcessing {

  id: number;
  timeRef: Date;
  order?: OrderSearchResult;
}
