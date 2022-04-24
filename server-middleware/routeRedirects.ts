export default function (req: any, res: any, next: () => void) {
  // AW-1494 Redirect capitalised characters in URLS
  if (req.originalUrl.match(/[A-Z]/)) {
    if (
      !req.originalUrl.match(/[?]/) &&
      !req.originalUrl.match(/[=]/) &&
      !req.originalUrl.match(/claim/gi) &&
      !req.originalUrl.match(/c/gi)
    ) {
      res.writeHead(301, {
        Location: 'https://' + req.headers.host + req.originalUrl.toLowerCase(),
      })
      res.end()
    }
  }

  // AW-1495 redirect url with trailing slash
  if (req.originalUrl.endsWith('/') && req.originalUrl.length > 1) {
    res.writeHead(301, {
      Location: 'https://' + req.headers.host + req.originalUrl.slice(0, -1),
    })
    res.end()
  }

  // AW-1493 www redirection
  if (req.headers.host.slice(0, 4) === 'www.') {
    const newHost = req.headers.host.replace('www.', '')
    res.writeHead(301, {
      Location: 'https://' + newHost + req.originalUrl,
    })
    res.end()
  }
  next()
}
