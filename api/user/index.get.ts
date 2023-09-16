import { ManpasiResponse, define } from '@/core/index'
import { json } from '@/core/options'

export default define('GET', () => {
  return ManpasiResponse(json({
    name: 'user api'
  }), {
    status: 200
  })
})
