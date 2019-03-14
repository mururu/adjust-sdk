import request from 'superagent';

export class AdjustConfig {
  appToken: string;
  environment: string;

  static EnvironmentSandbox = 'sandbox';
  static EnvironmentProduction = 'production';

  constructor(appToken: string, environment: string, device_id: string) {
    this.appToken = appToken;
    this.environment = environment;
    this.device_id = device_id;
  }
}

export class Adjust {
  config: AdjustConfig;

  static create(config: AdjustConfig): Adjust {
    return new Adjust(config);
  }

  constructor(config: AdjustConfig) {
    this.config = config;
  }

  async trackEvent(adjustEvent: AdjustEvent) {
    const res = await request
      .get('https://app.adjust.com/session')
      .query({
        gps_adid: this.config.device_id,
        app_token: this.config.appToken,
        environment: this.config.environment,
        callbackParams: JSON.stringify(adjustEvent.callbackParams),
        partnerParams: JSON.stringify(adjustEvent.partnerParams),
      })
      .set('Client-SDK', 'test-sdk-mururu')
      .end(() => {});
  }

  async trackSession() {
    const res = await request
      .get('https://app.adjust.com/session')
      .query({
        gps_adid: this.config.device_id,
        app_token: this.config.appToken,
        environment: this.config.environment,
      })
      .set('Client-SDK', 'test-sdk-mururu')
      .end((err, res) => {});
  }
}

export class AdjustEvent {
  eventToken: string;
  callbackParameters: { string: string };
  partnerParameters: { string: string };

  constructor(eventToken: string) {
    this.eventToken = eventToken;
    this.callbackParameters = {};
    this.parterParameters = {};
  }

  addCallbackParameter(key: string, value: string) {
    this.callbackParameters[key] = value;
  }

  addPartnerParameter(key: string, value: string) {
    this.parterParameter[key] = string;
  }
}
