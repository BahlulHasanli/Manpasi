import { ManpasiResponse, define } from '@/core/index'
import { json } from '@/core/options'
import ManpasiHTPP from '@/types/http.type'

export default define((req: ManpasiHTPP.request) => {

  // Example queries
  const query = req.queryParams.get('query')
  const mode = req.queryParams.get('mode')

  return ManpasiResponse(json({
    name: 'dynamic route',
    query: query,
    mode: mode
  }), {
    status: 200
  })
})
