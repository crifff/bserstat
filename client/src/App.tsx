import React, { FC, useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import './index.css';
import './App.css';
import User from "./Components/User";
import Weapon from "./Components/Weapon";
import Armor from "./Components/Armor";
import { SupportedLocales, t } from "./Translate/translate";

import { Col, Layout, Menu, Radio, RadioChangeEvent, Row } from 'antd';
import axios from "axios";
import { BrowserRouter as Router, Link, Redirect, Route, Switch, useHistory } from "react-router-dom";

const {Content} = Layout;

interface Mode {
  category: string
  tier: string
  index: number

  key(): string,
}

interface IndexData {
  label: string
  updated: string
  period: string
}

const isJa = navigator.language.startsWith('ja');
const defaultLang: SupportedLocales = isJa ? 'ja' : 'en';

function App() {
  const initialMode: Mode = {
    category: "character",
    tier: "all",
    index: 0,
    key(): string {
      return this.category + "_" + this.tier
    }
  }
  const initialData: IndexData[] = [{
    "label": "20210215",
    "updated": "2021. 2. 15",
    "period": "2021. 2. 11 ~ 14"
  }, {
    "label": "20210208",
    "updated": "2021. 2. 8",
    "period": "2021. 2. 4 ~ 7"
  }, {
    "label": "20210201",
    "updated": "2021. 2. 8",
    "period": "2021. 1. 28 ~ 1. 31"
  }]

  const [current, setCurrent] = useState<Mode>(initialMode);
  const [lang, setLang] = useState<SupportedLocales>(defaultLang);
  const [data, setData] = useState<IndexData[]>(initialData);

  function fetchUserRankJson() {
    const url = "https://storage.googleapis.com/bserstat/data/index.json"
    axios.get<any>(url)
      .then((response: any) => {
        setData(response.data)
      })
      .catch((err: any) => {
        console.error(err)
      })
  }


  // useEffect(() => {
  //   // キャッシュが強烈に残るので一旦fetchで取らずininialDataに書く
  //   // fetchUserRankJson();
  // }, []);

  function handleMenuClick(e: any) {
    let [category, tier] = e.key.split("_")
    let mode: Mode = {
      category: category,
      tier: tier,
      index: current.index,
      key(): string {
        return this.category + "_" + this.tier
      }
    }
    setCurrent(mode)
  }

  function handleLangChange(e: RadioChangeEvent) {
    setLang(e.target.value)
    console.log("set to ", e.target.value);
  }

  let label = ""
  let period = ""
  let updated = ""
  let beforeLabel = ""
  if (data.length > 0) {
    label = data[current.index].label
    period = data[current.index].period
    updated = data[current.index].updated
  }
  if (data.length > current.index + 1) {
    beforeLabel = data[current.index + 1].label;
  }
  return <Router>
    <InnerComponent>
      <Layout>
        <Content>
          <Row wrap={false} align={"middle"} style={{backgroundColor: "#fff"}}>
            <Col flex="none">
              <Menu onClick={handleMenuClick} selectedKeys={[current.key()]} mode="horizontal">
                <Menu.Item key="character_all">
                  <Link to="/character/all">
                    {t('Character(All)', lang)}
                  </Link>
                </Menu.Item>
                <Menu.Item key="character_high">
              <Link to="/character/high">
                {t('Character(High Tier)', lang)}
              </Link>
            </Menu.Item>
            <Menu.Item key="weapon_all">
              <Link to="/weapon/all">
                {t('Weapon(All)', lang)}
              </Link>
            </Menu.Item>
            <Menu.Item key="weapon_high">
              <Link to="/weapon/high">
                {t('Weapon(High Tier)', lang)}
              </Link>
            </Menu.Item>
            <Menu.Item key="armor_all">
              <Link to="/armor/all">
                {t('Armor(All)', lang)}
              </Link>
            </Menu.Item>
            <Menu.Item key="armor_high">
              <Link to="/armor/high">
                {t('Armor(High Tier)', lang)}
              </Link>
            </Menu.Item>
          </Menu>
        </Col>
        <Col flex="auto" style={{textAlign: "right"}}>
          <Radio.Group value={lang} onChange={handleLangChange}>
            <Radio.Button value="ja">ja</Radio.Button>
            <Radio.Button value="en">en</Radio.Button>
          </Radio.Group>
        </Col>
      </Row>
      <Switch>
        <Route exact path="/">
          <Redirect to="/character/all"/>
        </Route>
        <Route path="/character/:tier(all|high)">
          <User label={label} period={period} lang={lang}
                updated={updated} before={beforeLabel}/>
        </Route>
        <Route path="/weapon/:tier(all|high)">
          <Weapon tier={current.tier} label={label} period={period} lang={lang}
                  updated={updated} before={beforeLabel}/>
        </Route>
        <Route path="/armor/:tier(all|high)">
          <Armor tier={current.tier} label={label} period={period} lang={lang}
                 updated={updated} before={beforeLabel}/>
        </Route>
      </Switch>
        </Content>
      </Layout>
    </InnerComponent>
  </Router>
    ;
}

const InnerComponent: FC = ({children}) => {
  const {listen} = useHistory()

  useEffect(() => {
    return listen((location) => {
      if (!window.gtag) return
      const trackingId = "G-79BB61VQB3"
      window.gtag('config', trackingId, {page_path: location.pathname})
    })
  }, [listen])


  return <>{children}</>
}

export default App