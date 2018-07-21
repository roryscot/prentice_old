import React from 'react';

import {
  Card,
  CardTitle,
  CardBody,
  CardImg,
  CardImgOverlay,
  CardText,
  CardLink,
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Button,
} from 'reactstrap';

import { Line } from 'react-chartjs-2';

import { overlayCards, bgCards, gradientCards } from 'demos/cardPage';

import { getStackLineChart, stackLineChartOptions } from 'demos/chartjs';

import Page from 'components/Page';
import { UserCard } from 'components/Card';

import ProfileBackgroundImage from 'assets/img/bg/bookshelf.jpg';

import bn from 'utils/bemnames';

import bioImage from 'assets/img/bg/bio.jpg';
import charts from 'assets/img/bg/charts.jpg';
import bg11Image from 'assets/img/bg/background_1920-11.jpg';
import bg18Image from 'assets/img/bg/background_1920-18.jpg';
import user1Image from 'assets/img/users/100_1.jpg';

const bem = bn.create('sidebar');
const homePageBackground = {
  backgroundImage: `url("${ProfileBackgroundImage}")`,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
};


const DemoProfilePage = () => {
  return (
    <Page
      title="Profile"
      breadcrumbs={[{ name: 'Profile', active: true }]}
      id="Profile"
      data-image={ProfileBackgroundImage}
    >
      <Row className={bem.e('content')+ " center"}>
       <div className={bem.e('background') + " image-blurred-primary-color back"} style={homePageBackground} />
       <Col md={7}
          className="center"
          >
          <UserCard
            avatar={user1Image}
            title="User Name"
            subtitle="Institution"
            text="Rating"
            style={{
              height: 300,
            }}
          />
        </Col>
      </Row>
      {/* <Row>

      </Row> */}
      <Row>
        <Col md={6} sm={6} xs={12} className="mb-3">
          <Card>
            <CardImg top src={bioImage} />
            <CardBody>
              <CardTitle>Bio</CardTitle>
              <CardText>
                {"Likes to learn about global events and struggles with math. Wants to know more!"}
              </CardText>
            </CardBody>
          </Card>
        </Col>

        <Col md={6} sm={6} xs={12} className="mb-3">
          <Card>
          <Line
              data={getStackLineChart({
                labels: [
                  'January',
                  'February',
                  'March',
                  'April',
                  'May',
                  'June',
                  'July',
                ],
                data: [0, 13000, 5000, 24000, 16000, 25000, 10000],
              })}
              options={stackLineChartOptions}
            />
            <CardBody>
              <CardTitle>Activities</CardTitle>
            </CardBody>
            <ListGroup flush>
              <ListGroupItem>Strongest Area: <em>Science</em></ListGroupItem>
              <ListGroupItem>Needs Practice: <em>Math</em></ListGroupItem>
              <ListGroupItem>5 day streak!</ListGroupItem>
            </ListGroup>
            <CardBody>
              <CardLink tag="a" href="#">
                Go to details
              </CardLink>
              <CardLink tag="a" href="#">
                More
              </CardLink>
            </CardBody>
          </Card>
        </Col>
      </Row>

      {/* <Row>
        {overlayCards.map(({ imgUrl }) => {
          return (
            <Col md={6} sm={6} xs={12}>
              <Card inverse className="text-center">
                <CardImg width="100%" src={imgUrl} alt="Card image cap" />
                <CardImgOverlay>
                  <CardTitle>Card Title</CardTitle>
                  <CardText>inversed card</CardText>
                  <CardText>
                    <small className="text-muted">
                      Last updated 3 mins ago
                    </small>
                  </CardText>
                </CardImgOverlay>
              </Card>
            </Col>
          );
        })}
      </Row> */}
    </Page>
  );
};

export default DemoProfilePage;
