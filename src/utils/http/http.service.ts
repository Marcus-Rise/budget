import type { IHttpService } from "./http.service.interface";
import { injectable } from "inversify";

@injectable()
class HttpService implements IHttpService {
  delete(url: string, { headers, ...init }: RequestInit = { headers: {} }) {
    return fetch(url, {
      headers: {
        Accept: "application/json",
        ...headers,
      },
      ...init,
      method: "DELETE",
    }).then((res) => {
      if (!res.ok) {
        throw new Error();
      }

      return res;
    });
  }

  get(url: string, { headers, ...init }: RequestInit = { headers: {} }) {
    return fetch(url, {
      headers: {
        Accept: "application/json",
        ...headers,
      },
      ...init,
      method: "GET",
    }).then((res) => {
      if (!res.ok) {
        throw new Error();
      }

      return res;
    });
  }

  post(url: string, { headers, ...init }: RequestInit = { headers: {} }) {
    return fetch(url, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        ...headers,
      },
      ...init,
      method: "POST",
    }).then((res) => {
      if (!res.ok) {
        throw new Error();
      }

      return res;
    });
  }
}

export { HttpService };
