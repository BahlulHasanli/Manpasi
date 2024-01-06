import { json, flatList } from '@/core/options';
import type ManpasiResponse from '@/types/manpasiReponse.type';
import ManpasiHTTP from '@/types/http.type';
import { ManpasiList } from '@/types/core.type';

export function Manpasi(defineRoutes: ManpasiList[]) {
  return Bun.serve({
    port: 3000,
    fetch(req: ManpasiHTTP.request) {
      const url = new URL(req.url);
      let pathname = url.pathname;

      if (pathname.endsWith('/')) {
        pathname = url.pathname.replace(/\/$/, '');
      }

      const queryParams = new URLSearchParams(url.search);
      req.queryParams = queryParams;

      const conditions: ((item: any) => boolean)[] = [
        (item: any) => item.name === url.pathname && item.method === req.method,
        (item: any) =>
          item.name !== item.pathname &&
          item.method === req.method &&
          item.dynamic.has &&
          item.parentFolder === url.pathname.split('/')[1],
        (item: any) => item.name === url.pathname && item.method !== req.method,
      ];

      for (const condition of conditions) {
        const routeMatch = flatList(defineRoutes).find(condition);

        if (routeMatch) {
          if (routeMatch.dynamic.has) {
            const dynamicPathname = routeMatch.dynamic.name;
            const dynamicPathnameParam = decodeURIComponent(
              pathname.split('/')[2]
            ).replaceAll(' ', '');

            req.param = {
              [dynamicPathname]: dynamicPathnameParam,
            };
          }

          if (condition === conditions[2]) {
            return ManpasiResponse(json({ message: 'Method not allowed' }), {
              status: 405,
            });
          }

          return routeMatch.file(req);
        }
      }

      return ManpasiResponse(json({ message: 'Not found!' }), {
        status: 404,
      });
    },
  });
}

export function ManpasiResponse(data: any, { type = 'json', status = 200 }) {
  return new Response(data, {
    headers: { 'content-type': type },
    status: status,
  }) satisfies ManpasiHTTP.response;
}

export function define(cb: any) {
  return async (req: ManpasiHTTP.request) => {
    if (req.body) {
      const bodyParser = await Bun.readableStreamToJSON(req.body);

      req.bodyData = bodyParser;
    } else {
      req.bodyData = {};
    }

    return cb(req);
  };
}
