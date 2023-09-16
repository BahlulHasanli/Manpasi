import { json, flatList } from "@/core/options";
import type CRUD from '@/types/crud.type'
import type ManpasiResponse from "@/types/manpasiReponse.type";

export function Manpasi(defineRoutes: any) {
  return Bun.serve({
    fetch(req: any) {
      const url = new URL(req.url);

      const defineRouteObject: any = flatList(defineRoutes)
        .find((route: { name: string, method: any, dynamic: Boolean, file: Function }) => {
          if (url.pathname.endsWith("/")) {
            url.pathname = url.pathname.replace(/\/$/, "");
          }

          const queryParams = new URLSearchParams(url.search);

          if (route.method === req.method) {
            if (route.dynamic) {
              req.routeParam = url.pathname.split("/").pop();
              return true
            }

            req.queryParams = queryParams;

            return route.name == url.pathname
          }
        });

      if (defineRouteObject) {
        return defineRouteObject.file(req);
      }

      return ManpasiResponse(json({ message: 'Not found' }), {
        status: 404
      })
    },
  });
}

export function ManpasiResponse(data: any, { type = 'json', status = 200 }: ManpasiResponse) {
  return new Response(data, {
    headers: { 'content-type': type },
    status: status
  }) as Response;
}

export function define(option: CRUD = 'GET', cb: any) {
  return async (req: any) => {
    if (option === req.method) {
      if (req.body) {
        const bodyParser = await Bun.readableStreamToJSON(req.body);

        req.bodyData = bodyParser;
      }

      return cb(req)
    }

    return ManpasiResponse(json({ message: 'Method not allowed' }), {
      status: 405
    })
  }
}
