declare namespace ManpasiHTPP {
  export interface request extends Request {
    bodyData?: string | {},
    queryParams: URLSearchParams;
  }

  export interface response extends Response {
    type: any
    status: number
  }
}

export default ManpasiHTPP
