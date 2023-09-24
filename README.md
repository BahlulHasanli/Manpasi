# Manpasi

<img src="https://github.com/BahlulHasanli/manpasi/assets/15572553/259f9f6f-f297-4a18-953b-b9ee9d170196" width="300" height="350">

Sweet and easy to use rest api writing library like its name written in Bun


## Write your own rest api by defining your route in /api/ folder

###  How to do it? Let's get started.

In the first step, let's define a /api/index.get.ts file and add this code block in it

```js
// /api/index.get.ts

import { ManpasiResponse, define } from '@/core/index'
import { json } from '@/core/options'

export default define(() => {
  return ManpasiResponse(json([{ name: 'Jett Madison' }, { name: 'Luther King' }]), {
    status: 200
  })
})
```

Then let's send http://localhost:3000/ get request via curl or Postman. That's it! You will get this as reponse output:
```json
[
    {
        "name": "Jett Madison."
    },
    {
        "name": "Luther King"
    }
]
```

Usage for POST

```js
// /api/user/index.post.ts

import { ManpasiResponse, define } from '@/core/index'
import { json } from '@/core/options'
import ManpasiHTTP from "@/types/http.type";

export default define((req: ManpasiHTTP.request) => {
  return ManpasiResponse(json(req.bodyData), {
    status: 200
  })
})
```

```json
{
    "name": "Jett Madison 2",
    "age": "33"
}
```




### It's not over yet mate, where are you going? :) 

You can continue api operations by creating a dynamic folder. This is actually very easy. You just create a /user/ folder in the /api/ folder and the process is over.

For example: `/api/user/index.get.ts` or `/api/user/index.post.ts`

Your filename does not have to be "index", you can put any name you want, but it `must have .get, .post, .update, .put, .delete, or .patch` at the end because these are our method names for our crud operations. For example: user.get.ts, user.post.ts, user.update.ts.

The library will be very nice with new updates.

## Developing
This repo uses [Bun](https://bun.sh). To initiate the project `bun index.ts`

## License
[MIT](https://github.com/BahlulHasanli/Manpasi/blob/main/LICENSE)
