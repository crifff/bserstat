import React, { FC, useContext, useMemo, useState } from "react";

import { t, SupportedLocales } from "./translate";

const isJa = navigator.language.startsWith("ja");
const defaultLang: SupportedLocales = isJa ? "ja" : "en";

type ContextState = {
  val: SupportedLocales;
  setter: (lang: SupportedLocales) => void;
};

const TContext = React.createContext<ContextState>(null as any);

export const useTranslate = () => {
  const { val, setter } = useContext(TContext);

  return {
    t: (key: string) => t(key, val),
    lang: val,
    setLang: setter,
  };
};

export const TranslationProvider: FC<unknown> = (props) => {
  const [locale, setLocale] = useState(defaultLang);
  // re-renderを抑えるため
  const ctx = useMemo(() => ({ val: locale, setter: setLocale }), [
    locale,
    setLocale,
  ]);
  return <TContext.Provider value={ctx}>{props.children}</TContext.Provider>;
};
