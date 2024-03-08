import { AxiosResponse } from 'axios';
import { ERROR_MESSAGES } from '../constants';

const createMicroserviceErrorResponse = (exception: ServiceClientException) => {
  const { error } = ERROR_MESSAGES.MICROSERVICE;
  const { microservice, code, message, data } = exception;

  return {
    microservice,
    code,
    error,
    message,
    data: data ? data : undefined,
  };
};

export class ServiceClientException extends Error {
  constructor(
    public readonly microservice: string,
    public readonly message: string,
    public readonly code: number,
    public readonly data?: unknown,
    public readonly status?: number,
    public readonly isMicroservice: boolean = true,
    public readonly responseConfig?: AxiosResponse['config'],
    public readonly alertType?: 'Error' | 'Warning' | 'Info',
  ) {
    super(message);
    this.microservice = microservice;
    this.data = data;
    this.isMicroservice = isMicroservice;
    this.responseConfig = responseConfig;
    this.alertType = alertType;
    this.status = status;

    Object.setPrototypeOf(this, ServiceClientException.prototype);
  }

  public createErrorResponse() {
    return createMicroserviceErrorResponse(this);
  }
}
