import { defineConfig, type Plugin, type Connect } from 'vite'
import react from '@vitejs/plugin-react'

/** Port 5175 is reserved for the Korea journey. Bare `/` there should enter korea, not Chapter I. Port 5173 is unchanged. */
function koreaPortDefault(): Plugin {
  const middleware: Connect.NextHandleFunction = (req, res, next) => {
    const host = req.headers.host ?? ''
    if (!/:5175$/i.test(host)) {
      next()
      return
    }
    const url = new URL(req.url ?? '/', 'http://127.0.0.1')
    if (url.pathname !== '/' || url.searchParams.has('journey')) {
      next()
      return
    }
    url.searchParams.set('journey', 'korea')
    res.statusCode = 302
    res.setHeader('Location', `${url.pathname}${url.search}`)
    res.end()
  }
  return {
    name: 'korea-port-default',
    configureServer(server) {
      server.middlewares.use(middleware)
    },
  }
}

export default defineConfig({
  base: '/',
  plugins: [react(), koreaPortDefault()],
  server: {
    host: '127.0.0.1',
    port: 5173,
    strictPort: true,
  },
  preview: {
    host: '127.0.0.1',
    port: 5174,
    strictPort: true,
  },
})
