import apiClient from "./api-client";

/**
 * Generic http service
 * @author Kevin Friedrichs
 */
class HttpService {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  /**
   * Get all entries from the server.
   * @param params optional params
   * @returns request, cancel()
   */
  getAll<T>(params?: object) {
    const controller = new AbortController();
    const request = apiClient.get<T[]>(this.endpoint, {
      params: params,
      signal: controller.signal
    });
    return { request, cancel: () => controller.abort() };
  }

  /**
   * Get a specific entry from the server.
   * @param id First ID
   * @param id2 Second ID (optional)
   * @param params optional params
   * @returns request, cancel()
   */
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

  /**
   * Send a POST request to the server.
   * @param data POST data
   * @returns request, cancel()
   */
  create(data: object) {
    const controller = new AbortController();
    const request = apiClient.post(this.endpoint, data, {
      signal: controller.signal
    });
    return { request, cancel: () => controller.abort() };
  }

  /**
   * Send a DELETE request to the server.
   * @param id First ID
   * @param id2 Second ID (optional)
   * @returns request, cancel()
   */
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

  /**
   * Send a PUT request to the server.
   * @param id ID of the entry that should be edited
   * @param data New data
   * @returns request, cancel()
   */
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