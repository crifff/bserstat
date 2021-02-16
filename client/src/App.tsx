import React, { FC, useEffect, useState } from 'react';
import './App.css';
import Character from "./Components/Character";
import Weapon from "./Components/Weapon";
import Armor from "./Components/Armor";

import { Col, Layout, Menu, Radio, RadioChangeEvent, Row } from 'antd';
import axios from "axios";
import { BrowserRouter as Router, Link, Redirect, Route, Switch, useHistory, useParams } from "react-router-dom";
import { useTranslate } from './Translate/hook';

const {Content} = Layout;

interface Mode {
  category: string
  tier: string
  index: number
}

interface IndexData {
  label: string
  updated: string
  period: string
}

function App() {
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

  const [data, setData] = useState<IndexData[]>(initialData);

  // function fetchUserRankJson() {
  //   const url = "https://storage.googleapis.com/bserstat/data/index.json"
  //   axios.get<any>(url)
  //     .then((response: any) => {
  //       setData(response.data)
  //     })
  //     .catch((err: any) => {
  //       console.error(err)
  //     })
  // }
  // useEffect(() => {
  //   // キャッシュが強烈に残るので一旦fetchで取らずinitialDataに書く
  //   // fetchUserRankJson();
  // }, []);
  
  const label = data[0].label
  const period = data[0].period
  const updated = data[0].updated
  const oldLabel = data[1].label;

  return <Router>
    <InnerComponent>
      <Layout>
        <Content>
          <Switch>
            <Route exact path="/">
              <Redirect to="/character/all"/>
            </Route>
            <Route path="/:category(character)/:tier(all|high)">
              <Header/>
              <Character label={label} period={period} updated={updated} old={oldLabel}/>
            </Route>
            <Route path="/:category(weapon)/:tier(all|high)">
              <Header/>
              <Weapon label={label} period={period} updated={updated} old={oldLabel}/>
            </Route>
            <Route path="/:category(armor)/:tier(all|high)">
              <Header/>
              <Armor label={label} period={period} updated={updated} old={oldLabel}/>
            </Route>
          </Switch>
        </Content>
      </Layout>
    </InnerComponent>
  </Router>
    ;
}

const Header: FC = (prop): any => {
  let {tier, category} = useParams<{
    category: string
    tier: string
  }>();
  console.log("tier:", useParams<{
    category: string
    tier: string
  }>())

  const {t, lang, setLang} = useTranslate();

  function handleLangChange(e: RadioChangeEvent) {
    setLang(e.target.value)
  }

  return <Row wrap={false} align={"middle"} className={"menu-row"}>
    <Col flex="none">

      <Menu selectedKeys={[`${category}_${tier}`]} mode="horizontal">
        <Menu.Item key="character_all">
          <Link to="/character/all">
            {t('Character(All)')}
          </Link>
        </Menu.Item>
        <Menu.Item key="character_high">
          <Link to="/character/high">
            {t('Character(High Tier)')}
          </Link>
        </Menu.Item>
        <Menu.Item key="weapon_all">
          <Link to="/weapon/all">
            {t('Weapon(All)')}
          </Link>
        </Menu.Item>
        <Menu.Item key="weapon_high">
          <Link to="/weapon/high">
            {t('Weapon(High Tier)')}
          </Link>
        </Menu.Item>
        <Menu.Item key="armor_all">
          <Link to="/armor/all">
            {t('Armor(All)')}
          </Link>
        </Menu.Item>
        <Menu.Item key="armor_high">
          <Link to="/armor/high">
            {t('Armor(High Tier)')}
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