import { ManpasiResponse, define } from '@/core/index'
import { json } from '@/core/options'
import ManpasiHTTP from "@/types/http.type";

export default define((req: ManpasiHTTP.request) => {
  return ManpasiResponse(json(req.arrayBuffer), {
    status: 200
  })
})
