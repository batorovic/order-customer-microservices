import { ERROR_MESSAGES, ServiceClientException, deepObjectIdToString } from '@batuhan_kutluay-case/common';
import { HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Axios, { AxiosInstance, AxiosResponse, Method, RawAxiosRequestHeaders } from 'axios';
import { ClsService } from 'nestjs-cls';
import { PinoLogger } from 'nestjs-pino';

export abstract class BaseServiceClient {
  private readonly axiosClient: AxiosInstance;

  protected constructor(
    protected readonly microservice: string,
    protected readonly baseUrl: string,
    protected readonly configService: ConfigService,
    protected readonly logger: PinoLogger,
    protected readonly cls: ClsService,
  ) {
    this.axiosClient = Axios.create({
      baseURL: this.baseUrl,
      timeout: configService.get('services.timeout'),
    });
  }

  throwError(
    message: string,
    code: number,
    statusCode?: number,
    data?: unknown,
    isMicroservice?: boolean,
    responseConfig?: AxiosResponse['config'],
  ): ServiceClientException {
    throw new ServiceClientException(
      this.microservice,
      message,
      code,
      data,
      statusCode,
      isMicroservice,
      responseConfig,
    );
  }

  private getRequestId() {
    const requestId = this.cls.get('request-id');
    return requestId;
  }

  private addContextToHeader(headers: RawAxiosRequestHeaders): Partial<RawAxiosRequestHeaders> {
    return {
      ...headers,
      ['request-id']: this.getRequestId(),
    };
  }

  async request(
    method: Method,
    path: string,
    data = {},
    params = {},
    headers: Partial<RawAxiosRequestHeaders> = {},
    showResponseData = false,
  ): Promise<unknown> {
    const url = `${this.baseUrl}${path}`;

    let response: AxiosResponse;
    try {
      response = await this.axiosClient({
        url,
        method,
        data,
        params: deepObjectIdToString(params),
        headers: this.addContextToHeader(headers),
        validateStatus: () => true,
      });
    } catch (requestError: any) {
      return this.throwError(
        requestError.message,
        requestError.isMicroservice ? requestError.code : ERROR_MESSAGES.MICROSERVICE.code,
        undefined,
        requestError.data,
      );
    }

    if (response.status < 400) {
      this.logger.debug(
        {
          caller: {
            req: {
              url,
              method,
              data,
              params,
              headers,
            },
            res: {
              headers: response.headers,
              status: response.status,
              statusText: response.statusText,
              data: showResponseData ? response.data : undefined,
            },
          },
        },
        `${this.microservice} - ServiceClient`,
      );
      return response.data;
    }

    if (response.data?.code || response.data?.error || response.data?.message || response.data?.statusCode) {
      return this.throwError(
        response.data.message,
        response.data.code,
        response.status,
        response.data.data,
        true,
        response.config,
      );
    }

    const { message, code } = ERROR_MESSAGES.MICROSERVICE;
    const statusCode = response?.status;
    const responseData = response?.data;
    return this.throwError(
      message,
      code,
      statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
      responseData,
      true,
      response.config,
    );
  }
}
