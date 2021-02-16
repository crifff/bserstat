import { Descriptions, PageHeader, Table } from "antd";
import React from "react";
import { useTranslate } from "../Translate/hook";

interface RankTableProp {
  title: string;
  updated: string;
  period: string;
  columns: any;
  data: any;
}

function RankTable(prop: RankTableProp) {
  const { t } = useTranslate();
  return (
    <>
      <PageHeader className="site-page-header" title={t(prop.title)}>
        <Descriptions size="small" column={3}>
          <Descriptions.Item label={t("updated")}>
            {prop.updated}
          </Descriptions.Item>
          <Descriptions.Item label={t("period")}>
            {prop.period}
          </Descriptions.Item>
        </Descriptions>
      </PageHeader>
      <Table
        columns={prop.columns}
        dataSource={prop.data}
        bordered
        pagination={{ pageSize: 1000, disabled: true, hideOnSinglePage: true }}
        size="small"
        rowClassName={(record: any, index: any): string => {
          if (
            record.characterName === "Base Win Rate" ||
            record.armorTypeName === "Base Win Rate"
          ) {
            return "row-base-win-rate";
          }
          return "";
        }}
      />
    </>
  );
}

export default RankTable;
