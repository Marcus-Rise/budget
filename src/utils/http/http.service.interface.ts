interface IHttpService {
  get(url: string, init?: RequestInit): Promise<Response>;

  post(url: string, init?: RequestInit): Promise<Response>;

  delete(url: string, init?: RequestInit): Promise<Response>;
}

export type { IHttpService };
