import 'server-only'
import * as fs from 'node:fs'

export function publicFileExists(path: string) {
  const fullPath = `${process.cwd()}/public${path}`
  return fs.existsSync(fullPath)
}
