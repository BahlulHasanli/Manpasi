import { ManpasiResponse, define } from '@/core/index'
import { json } from '@/core/options'

export default define('GET', (req: any) => {

  const query = req.queryParams.get('query')
  const mode = req.queryParams.get('mode')

  return ManpasiResponse(json({
    name: req.routeParam,
    query: query,
    mode: mode
  }), {
    status: 200
  })
})
