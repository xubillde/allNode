export default function createApiBody(apiParams) {
  const query = (apiParams.query || []).map(d => `'${d.key}'`).filter(a => !!a)
  const pathData = (apiParams.path || []).map(d => `'${d.key}'`).filter(a => !!a)
  const noneBody = query.concat(pathData) // ['user_id', 'type']
  if (!noneBody.length) return null
  return `[${noneBody.join(`, `)}]`
}
