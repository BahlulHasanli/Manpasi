import { ManpasiResponse, define } from '@/core/index';
import { json } from '@/core/options';
import ManpasiHTPP from '@/types/http.type';

export default define((req: ManpasiHTPP.request) => {
  // Example queries
  const query = req.queryParams.get('query');

  // Example params
  const id = req.param.id;

  return ManpasiResponse(
    json({
      data: id,
      query: query,
    }),
    {
      status: 200,
    }
  );
});
