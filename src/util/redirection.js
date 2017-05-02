export default (basePath, id) =>
  location.assign(`${basePath}/${encodeURIComponent(id)}`)
