import { Inject, Injectable } from '@angular/core';
import * as URITemplate from 'uri-templates';
import { ENV_CONFIG } from '../config/env.config';

@Injectable({
  providedIn: 'root',
})
export class UriBuilder {
  private readonly baseUrlConfig: string;

  private static fillUrl(url: string, urlParams?: any): string {
    const uri = urlParams ? URITemplate(url).fill(urlParams) : url;
    if (uri.lastIndexOf('/') === uri.length - 1) {
      return uri.substring(0, uri.length - 1);
    }
    return uri;
  }

  constructor(@Inject(ENV_CONFIG) private envConfig: any) {
    this.baseUrlConfig = this.envConfig.config.wsBaseUrl;
  }

  public buildUrl(url: string, urlParams?: any) {
    return this.baseUrlConfig + UriBuilder.fillUrl(url, urlParams);
  }
}
