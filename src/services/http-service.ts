import apiClient from "./api-client";

class HttpService {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getAll<T>(params?: object) {
    const controller = new AbortController();
    const request = apiClient.get<T[]>(this.endpoint, {
      params: params,
      signal: controller.signal
    });
    return { request, cancel: () => controller.abort() };
  }

  get<T>(id: string, id2?: string, params?: object) {
    const controller = new AbortController();
    let request = null;
    if (!id2) {
      request = apiClient.get<T>(this.endpoint + '/' + id, {
        params: params,
        signal: controller.signal
      });
    } else {
      request = apiClient.get<T>(this.endpoint + '/' + id + '/' + id2, {
        signal: controller.signal
      });
    }
    
    return { request, cancel: () => controller.abort() };
  }

  create(data: object) {
    const controller = new AbortController();
    const request = apiClient.post(this.endpoint, data, {
      signal: controller.signal
    });
    return { request, cancel: () => controller.abort() };
  }

  delete(id: string | number, id2?: string | number) {
    const controller = new AbortController();
    let request = null;
    if (!id2) {
      request = apiClient.delete(this.endpoint + '/' + id, {
        signal: controller.signal
      });
    } else {
      request = apiClient.delete(this.endpoint + '/' + id + '/' + id2, {
        signal: controller.signal
      });
    }
    return { request, cancel: () => controller.abort() };
  }

  update(id: string | number, data: object) {
    const controller = new AbortController();
    const request = apiClient.put(this.endpoint + '/' + id, data, {
      signal: controller.signal
    });
    return { request, cancel: () => controller.abort() };
  }

}

const create = (endpoint: string) => new HttpService(endpoint);

export default create;