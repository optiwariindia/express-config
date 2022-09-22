export function ssl(req, res, next) {
  let protocol = req.headers['x-forwarded-proto'] || req.protocol
  if (protocol == 'https') return next()
  if (req.host == 'localhost') return next()
  return res.status(301).redirect(`https://${req.headers['host']}${req.url}`)
}
export function www(req, res, next) {
  return !!req.hostname.match(/^www/gi)
    ? res.redirect(
        `https://${req.headers['host'].replace('www.', '')}${req.url}`,
      )
    : next()
}
