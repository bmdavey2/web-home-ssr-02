import some from 'lodash/some'

export default function (req: { originalUrl: string }, res: { spa: boolean }, next: () => void) {
  const paths = [
    '/a',
    '/b',
    '/p',
    '/u',
    '/businesses',
    '/mentors',
    '/about',
    '/faq',
    '/contact',
    '/privacy-policy',
    '/terms-conditions',
    '/trending',
    '/marketplace',
    '/medals',
    '/',
  ]
  res.spa = !some(paths, (x) => req.originalUrl.startsWith(x))
  next()
}
