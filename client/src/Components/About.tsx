import { FC } from "react"
import { Col, Row, Typography } from "antd"

const { Title, Paragraph, Text, Link } = Typography
const About: FC = (prop) => {
  return (
    <Row>
      <Col span={24}>
        <Typography style={{ padding: "2rem" }}>
          <Title>BS:ER Statについて</Title>
          <Paragraph>
            BS:ER statはBS:ER公式サイト(
            <a href={"https://playeternalreturn.com/ja/stats/"}>https://playeternalreturn.com/ja/stats/</a>
            )で提供されている統計情報をより便利に閲覧できるビューワーです。
          </Paragraph>
          <Title level={2}>データについて</Title>
          <Paragraph>
            <ul>
              <li>統計情報は公式の英語版を元に、前回集計時の統計情報との差分を表示しています。</li>
              <li>公式のデータが更新されてからBS:ER statに反映されるまでに時間差があります。</li>
            </ul>
          </Paragraph>
          <Title level={2}>開発について</Title>P
          <Paragraph>
            開発はgithub(<a href="https://github.com/crifff/bserstat">https://github.com/crifff/bserstat</a>
            )上で行われています。
          </Paragraph>
        </Typography>
      </Col>
    </Row>
  )
}

export default About
