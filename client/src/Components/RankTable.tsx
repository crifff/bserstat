import { Descriptions, PageHeader, Table } from "antd";
import { t } from "../Translate/translate";
import React from "react";

interface RankTableProp {
  title:string
  lang: string
  updated: string
  period: string
  columns:any
  data:any
}

function RankTable(prop:RankTableProp) {
  return <>
    <PageHeader
      className="site-page-header"
      title={t(prop.title, prop.lang)}
    >
      <Descriptions size="small" column={3}>
        <Descriptions.Item label={t("updated", prop.lang)}>{prop.updated}</Descriptions.Item>
        <Descriptions.Item label={t("period", prop.lang)}>{prop.period}
        </Descriptions.Item>
      </Descriptions>
    </PageHeader>
    <Table columns={prop.columns} dataSource={prop.data} bordered
           pagination={{pageSize: 1000, disabled: true, hideOnSinglePage: true}} size="small"
           rowClassName={(record: any, index: any): string => {
             if (record.characterName === "Base Win Rate"||record.armorTypeName === "Base Win Rate") {
               return "row-base-win-rate"
             }
             return ""
           }}
    /></>
}

export default RankTable