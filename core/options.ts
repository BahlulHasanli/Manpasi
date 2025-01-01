import { ManpasiList } from "@/types/core.type";

export function json(data: any) {
  return JSON.stringify(data);
}

export function flatList(data: ManpasiList[]) {
  let routeList: any[] = [];

  function recursiveFlat(arr: any) {
    for (let el of arr) {
      if (Array.isArray(el)) {
        recursiveFlat(el);
      } else {
        routeList.push(el);
      }
    }
  }

  recursiveFlat(data);

  return routeList;
}

export function regexFolder(folder: any) {
  let dynamic = false;

  if (folder.startsWith("[")) {
    folder = folder.replace(/\[(.*?)\]/, "$1");
    dynamic = true;
  }

  const regex = /(\w+)\.(\w+)/;
  const match: any = folder.match(regex);

  return {
    match,
    name: match ? match[1] : "",
    dynamic: dynamic,
  };
}
