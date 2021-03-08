import React, { useEffect } from "react"
import { SupportedLocales, t } from "../Translate/translate"

export function stringSort(a: string, b: string): number {
  if (a === null || a === undefined) {
    a = ""
  }
  if (b === null || b === undefined) {
    b = ""
  }
  // console.log(b)
  const nameA = a.toUpperCase() // 大文字と小文字を無視する
  const nameB = b.toUpperCase() // 大文字と小文字を無視する
  if (nameA < nameB) {
    return -1
  }
  if (nameA > nameB) {
    return 1
  }

  // names must be equal
  return 0
}

function plusColorClassName(reverse: boolean): string {
  return reverse ? "value-color-red" : "value-color-green"
}

function minusColorClassName(reverse: boolean): string {
  return reverse ? "value-color-green" : "value-color-red"
}

interface FilterSet {
  text: string
  value: string
}

export function Filter(list: string[], lang: SupportedLocales) {
  let uniqueList: FilterSet[] = []
  // console.log(list)
  list.forEach((item: any) => {
    if (item === "") {
      return
    }
    uniqueList.push({ text: t(item, lang), value: item })
  })
  return uniqueList
}

function alter(n: number): number {
  if (n <= -99999) {
    return 0
  }
  return n
}

export function valueRender(text: number, old: number | null, rawNumber: boolean, reverse: boolean) {
  const minimalFontSize = "11px"
  if (text === undefined) {
    text = 0
  }
  if (rawNumber) {
    return (
      <>
        {text <= -99999 ? "-" : text.toFixed(1)}
        {old !== null ? (
          (
            old <= -99999 ? (
              <div style={{ fontSize: minimalFontSize }} className={"value-color-zero"}>
                -
              </div>
            ) : (
              alter(text) - alter(old) === 0
            )
          ) ? (
            <div style={{ fontSize: minimalFontSize }} className={"value-color-zero"}>
              ±0.0
            </div>
          ) : alter(text) - alter(old) > 0 ? (
            <div style={{ fontSize: minimalFontSize }} className={plusColorClassName(reverse)}>
              +{(alter(text) - alter(old)).toFixed(1)}
            </div>
          ) : (
            <div style={{ fontSize: minimalFontSize }} className={minusColorClassName(reverse)}>
              {(alter(text) - alter(old)).toFixed(1)}
            </div>
          )
        ) : null}
      </>
    )
  }

  return (
    <>
      {text <= -99999 ? "-" : (text * 100).toFixed(1) + "%"}

      {old !== null ? (
        (
          old <= -99999 ? (
            <div style={{ fontSize: minimalFontSize }} className={"value-color-zero"}>
              -
            </div>
          ) : (
            alter(text) - alter(old) === 0
          )
        ) ? (
          <div style={{ fontSize: minimalFontSize }} className={"value-color-zero"}>
            ±0.0
          </div>
        ) : alter(text) - alter(old) > 0 ? (
          <div style={{ fontSize: minimalFontSize }} className={plusColorClassName(reverse)}>
            +{((alter(text) - alter(old)) * 100).toFixed(1) + "%"}
          </div>
        ) : (
          <div style={{ fontSize: minimalFontSize }} className={minusColorClassName(reverse)}>
            {((alter(text) - alter(old)) * 100).toFixed(1) + "%"}
          </div>
        )
      ) : null}
    </>
  )
}

type TitleOrGetter = string | (() => string)

export function useTitle(titleOrFn: TitleOrGetter, ...deps: React.DependencyList) {
  const title = typeof titleOrFn === "string" ? titleOrFn : titleOrFn()
  useEffect(() => {
    document.title = title
  }, [title, ...deps])
}

const imageNameMap: Map<string, string> = new Map([
  ["Thuận Thiên", "Thuan Thien"],
  ["Dáinsleif", "Dainsleif"],
])

export function imageName(name: string): string | undefined {
  if (name === undefined) {
    return name
  }
  let str = name.trim()
  if (imageNameMap.has(name)) {
    str = imageNameMap.get(name) as string
  }
  return str.replaceAll(/[ '&]/ig, "_").toLowerCase()
}
