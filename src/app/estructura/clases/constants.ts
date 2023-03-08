import { environment } from 'src/environments/environment';

export class constants {
  private static readonly URL_BASE: string = environment.apiBase;
  private static readonly PORT: string = environment.port;
  public static readonly URL_API: string = this.URL_BASE + this.PORT;
}
