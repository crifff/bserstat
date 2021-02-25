import { dictionary_ja } from "./ja"

export type SupportedLocales = "ja" | "en"

export function t(key: string, lang: SupportedLocales): string {
  if (lang === "en") {
    return key
  }
  if (key === undefined) {
    return key
  }
  key = key.trim()
  const text = dictionary_ja.get(key)
  if (text !== undefined) {
    return text
  }

  console.warn(`text key: '${key}' not found`)
  return key
}
