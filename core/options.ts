export function json(data: any) {
  return JSON.stringify(data);
}

export function flatList(dizi: Array<[]>) {
  let routeList: any[] = [];

  function recursiveFlat(arr: any) {
    for (let eleman of arr) {
      if (Array.isArray(eleman)) {
        recursiveFlat(eleman);
      } else {
        routeList.push(eleman);
      }
    }
  }

  recursiveFlat(dizi);

  return routeList;
}


export function regexFolder(folder: any) {
  let dynamic = false;

  if (folder.startsWith('[')) {
    folder = folder.replace(/\[(.*?)\]/, "$1")
    dynamic = true
  }

  const regex = /(\w+)\.(\w+)/;
  const match: any = folder.match(regex);

  return {
    match,
    dynamic: dynamic
  }
}
