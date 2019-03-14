import request from 'superagent';

export class AdjustConfig {
  appToken: string;
  environment: string;
  deviceId: string;
  osName: string;

  static EnvironmentSandbox = 'sandbox';
  static EnvironmentProduction = 'production';

  constructor(
    appToken: string,
    environment: string,
    deviceId: string,
    osName: string
  ) {
    this.appToken = appToken;
    this.environment = environment;
    this.deviceId = deviceId;
    this.osName = osName;
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

  async trackSession() {
    const res = await request
      .get('https://app.adjust.com/session')
      .query({
        gps_adid: this.config.deviceId,
        app_token: this.config.appToken,
        environment: this.config.environment,
        os_name: this.config.osName,
      })
      .set('Client-SDK', 'mururu-adjust-sdk4.0.0')
      .end((err, res) => {});
  }

  async trackEvent(adjustEvent: AdjustEvent) {
    const res = await request
      .get('https://app.adjust.com/event')
      .query({
        gps_adid: this.config.deviceId,
        app_token: this.config.appToken,
        environment: this.config.environment,
        os_name: this.config.osName,
        event_token: adjustEvent.eventToken,
        callback_params: JSON.stringify(adjustEvent.callbackParams),
        partner_params: JSON.stringify(adjustEvent.partnerParams),
      })
      .set('Client-SDK', 'mururu-adjust-sdk4.0.0')
      .end(() => {});
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
