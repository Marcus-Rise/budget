interface IHttpService {
  get<Response>(url: string, init?: RequestInit): Promise<Response>;

  delete(url: string, init?: RequestInit): Promise<void>;
}

export type { IHttpService };
