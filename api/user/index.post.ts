import { ManpasiResponse, define } from '@/core/index'
import { json } from '@/core/options'

export default define('POST', (req: any) => {
  return ManpasiResponse(json(req.bodyData), {
    status: 200
  })
})
