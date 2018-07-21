import React from 'react';

import { getColor } from 'utils/colors';
import { randomNum } from 'utils/demos';

import { Row, Col, Card, CardHeader, CardBody } from 'reactstrap';

import { Line, Pie, Doughnut, Bar, Radar, Polar } from 'react-chartjs-2';

import Page from 'components/Page';

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

const genLineData = (moreData = {}, moreData2 = {}) => {
  return {
    labels: MONTHS,
    datasets: [
      {
        label: 'Diagnostic Scores',
        backgroundColor: getColor('primary'),
        borderColor: getColor('primary'),
        borderWidth: 1,
        data: [
          randomNum(),
          randomNum(),
          randomNum(),
          randomNum(),
          randomNum(),
          randomNum(),
          randomNum(),
        ],
        ...moreData,
      },
      {
        label: 'Latest Test',
        backgroundColor: getColor('secondary'),
        borderColor: getColor('secondary'),
        borderWidth: 1,
        data: [
          randomNum(),
          randomNum(),
          randomNum(),
          randomNum(),
          randomNum(),
          randomNum(),
          randomNum(),
        ],
        ...moreData2,
      },
    ],
  };
};

const genPieData = (title, names) => {
    return {
      datasets: [
        {
          data: [randomNum(), randomNum(), randomNum(), randomNum(), randomNum()],
          backgroundColor: [
            getColor('primary'),
            getColor('secondary'),
            getColor('success'),
            getColor('info'),
            getColor('danger'),
          ],
          label: title,
        },
      ],
      labels: names,
    };
  };

const ChartPage = () => {
  return (
    <Page title="Statistics" breadcrumbs={[{ name: 'Statistics', active: true }]}>
      <Row>
        <Col xl={6} lg={12} md={12}>
          <Card>
            <CardHeader>Scores</CardHeader>
            <CardBody>
              <Bar data={genLineData()} />
            </CardBody>
          </Card>
        </Col>

        <Col xl={6} lg={12} md={12}>
          <Card>
            <CardHeader>Trouble Area</CardHeader>
            <CardBody>
              <Bar data={genLineData({ type: 'line', fill: false })} />
            </CardBody>
          </Card>
        </Col>
      </Row>


      <Row>
        <Col xl={6} lg={12} md={12}>
          <Card>
            <CardHeader>Mathematics</CardHeader>
            <CardBody>
              <Pie data={genPieData("Mathematics", ['Trigenometry', 'Word Problems', 'Geometry', 'Algebra', 'Logic'])} />
            </CardBody>
          </Card>
        </Col>

        <Col xl={6} lg={12} md={12}>
          <Card>
            <CardHeader>English</CardHeader>
            <CardBody>
              <Doughnut data={genPieData("English (Grammar)", ['Parallel Structure', 'Appositives', 'Participles', 'Commas', 'Paragraph Correction'])} />
            </CardBody>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col xl={6} lg={12} md={12}>
          <Card>
            <CardHeader>Sections</CardHeader>
            <CardBody>
              <Polar data={genPieData("Sections", ["English", "Math", "Reading", "Science"])} />
            </CardBody>
          </Card>
        </Col>

        <Col xl={6} lg={12} md={12}>
          <Card>
            <CardHeader>Goals</CardHeader>
            <CardBody>
              <Radar data={genLineData()} />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Page>
  );
};

export default ChartPage;
