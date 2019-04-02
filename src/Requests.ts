const headers = new Headers();
headers.append('Accept', 'application/json');


export default class Requests {
  static BASE_URL = process.env.VUE_APP_SERVER_LOCATION || 'http://localhost:3000'

  static MetadataRequest(baseUrl: string) {
    return new Request(`${baseUrl}/metadata`, {
      method: 'GET',
      headers,
    });
  }

  static TurnRequest(baseUrl: string) {
    return new Request(`${baseUrl}/turn`, {
      method: 'GET',
      headers,
    });
  }

  static InfoRequest(baseUrl: string, x: number, y: number) {
    return new Request(`${baseUrl}/info?col=${x}&row=${y}`, {
      method: 'GET',
      headers,
    });
  }

  static AllInfoRequest(baseUrl: string) {
    return new Request(`${baseUrl}/allinfo`, {
      method: 'GET',
      headers,
    });
  }

  static StatsRequest(baseUrl: string) {
    return new Request(`${baseUrl}/stats`, {
      method: 'GET',
      headers,
    });
  }

  static DetailsRequest(baseUrl: string, stat: string) {
    return new Request(`${baseUrl}/details?stat=${stat}`, {
      method: 'GET',
      headers,
    });
  }
}
