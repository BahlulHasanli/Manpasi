import { ManpasiResponse, define } from '@/core/index'
import { json } from '@/core/options'

export default define('GET', () => {
  return ManpasiResponse(json({
    message: 'about api'
  }), {
    status: 200
  })
})
