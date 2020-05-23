import { InjectableRxStompConfig } from '@stomp/ng2-stompjs';

// https://github.com/stomp-js/rx-stomp/issues/207
export class FixedStompConfig extends InjectableRxStompConfig {
  constructor() {
    super();
  }
  beforeConnect?: () => void | Promise<void>;
}
