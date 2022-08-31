import type { IHttpService } from "./http.service.interface";
import { injectable } from "inversify";

@injectable()
class HttpService implements IHttpService {
  delete(url: string, init?: RequestInit): Promise<void> {
    return fetch(url, { ...init, method: "DELETE" }).then((res) => {
      if (!res.ok) {
        throw new Error();
      }

      return res.json();
    });
  }

  get<Response>(url: string, init?: RequestInit): Promise<Response> {
    return fetch(url, { ...init, method: "GET" }).then((res) => {
      if (!res.ok) {
        throw new Error();
      }

      return res.json();
    });
  }
}

export { HttpService };
