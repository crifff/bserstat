import React, { useEffect } from "react";
import { SupportedLocales, t } from "../Translate/translate";

export function stringSort(a: string, b: string): number {
  if (a === null || a === undefined) {
    a = ""
  }
  if (b === null || b === undefined) {
    b = ""
  }
  // console.log(b)
  const nameA = a.toUpperCase(); // 大文字と小文字を無視する
  const nameB = b.toUpperCase(); // 大文字と小文字を無視する
  if (nameA < nameB) {
    return - 1;
  }
  if (nameA > nameB) {
    return 1;
  }

  // names must be equal
  return 0;
}


export function plusColor(reverse: boolean): string {
  return reverse ? "#ff4d4f" : "#52c41a"
}

export function minusColor(reverse: boolean): string {
  return reverse ? "#52c41a" : "#ff4d4f"
}


interface FilterSet {
  text: string;
  value: string
}


export function Filter(list: string[], lang: SupportedLocales) {
  let uniqueList: FilterSet[] = []
  // console.log(list)
  list.forEach((item: any) => {
    if (item === "") {
      return
    }
    uniqueList.push({text: t(item, lang), value: item})
  })
  return uniqueList;
}

function characterFilter(list: { Name: string }[], lang: SupportedLocales) {
  let uniqueCharaList: FilterSet[] = []

  // console.log(data)
  list.forEach((chara: any) => {
    if (chara.Name === "") {
      return
    }
    uniqueCharaList.push({text: t(chara.Name, lang), value: chara.Name})
  })
  return uniqueCharaList;
}


export function valueRender(text: number, before: any, rawNumber: boolean, reverse: boolean) {
  const minimalFontSize = "11px"
  if (rawNumber) {
    return <>
      {(text === 0) ? "-" : text.toFixed(1)}
      {(before !== null) ?

        ((text - before) === 0) ?
          <div style={{color: "#999", fontSize: minimalFontSize}}>±0.0</div> : ((text - before) > 0 ?
            <div style={{color: plusColor(reverse), fontSize: minimalFontSize}}>
              +{((text - before).toFixed(1))}
            </div> :
            <div style={{color: minusColor(reverse), fontSize: minimalFontSize}}>
              {((text - before).toFixed(1))}
            </div>
          )
        : null}
    </>;
  }
  return <>
    {(text === 0.0) ? "-" : (text * 100).toFixed(1) + "%"}

    {(before !== null) ?
      ((text - before) === 0) ?
        <div style={{color: "#999", fontSize: minimalFontSize}}>±0.0</div> : ((text - before) > 0 ?
          <div style={{color: plusColor(reverse), fontSize: minimalFontSize}}>
            +{((text - before) * 100).toFixed(1) + "%"}
          </div> :
          <div style={{color: minusColor(reverse), fontSize: minimalFontSize}}>
            {((text - before) * 100).toFixed(1) + "%"}
          </div>
        )
      : null}
  </>;
}

type TitleOrGetter = string | (() => string);

export function useTitle(titleOrFn: TitleOrGetter, ...deps: React.DependencyList) {
  const title = typeof titleOrFn === 'string' ? titleOrFn : titleOrFn();
  useEffect(
    () => {
      document.title = title;
    },
    [title, ...deps]
  );
}
