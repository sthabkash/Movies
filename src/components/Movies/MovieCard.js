import React from "react";
import {Card, Tag, Modal, Row, Col, Rate, Statistic } from "antd";
import {useState } from "react";
import {LikeOutlined} from '@ant-design/icons';
import axios from "axios";
const baseUrl = `http://www.omdbapi.com/?`;

const {Meta} = Card;

const MovieCard = (props) => {
 const {movie} = props;

 const [modalVisible, setModalVisible] = useState(false);
 const [movieDetail, setMovieDetail] = useState({});

 const handleMovieClick = (id) => {
   fetchMovieDetailById(id).then(() => {
    setModalVisible(!modalVisible);
   });
 };

 const handleOk = () => setModalVisible(!modalVisible);
 const handleCancel = () => setModalVisible(!modalVisible);

  const description = (
    <>
    <Tag color="magenta">{movie?.Year}</Tag>
    <Tag color="blue">{movie?.Type}</Tag>
    </>
  );

const fetchMovieDetailById = (id) => {
  return axios
  .get(`${baseUrl}i=${id}&apikey=13aa1db5`)
  .then((response) => {
    setMovieDetail(response?.data);
    return response;
  })
  .catch((error) => {
    console.log(error?.response);
    return error?.response;
  });
};

  const handleMovierating = () => {
    const rate = +movieDetail?.imdbRating;
    return Math.round((rate / 2) * 10)/ 10;
  };
  console.log(handleMovierating(), "handle");
    
  
  
  return (
      <>
<Card
    hoverable
    style={{ width: 240, margin: "20px"}}
    cover={<img alt="example" src={movie?.Poster} />}
    onClick={() => {
      handleMovieClick(movie?.imdbID);
    }}
  >
    <Meta title={movie?.Title} description={description} />
  </Card>
  <Modal
  title={movieDetail?.Ttile}
  visible={modalVisible}
  onOk={handleOk}
  onCancel={handleCancel}
  style={{width: '500px'}}
  footer={[]}
>
  <Row>
    <Col span ={8}>
      <Card cover={<img alt="example"
      src={movieDetail?.Poster}/>}/>
    </Col>

    <Col span={16}>
      <div>
        <div style ={{textAlign: "center"}}>
          <strong>Detail Information</strong>
        </div>
        <Row style={{margin: 20}}>
          <Col>Rating:</Col>
          <Col><Rate allowHalf defaultValue = {handleMovierating()} 
          style ={{
            fontSize: 16,
            justifyContent: "center",
          }}
          />
          </Col>
            
        </Row>
        <Row style={{ margin: 20}}>
          <Col>Director:</Col>
          <Col>
          {" "} 
          <strong>{movieDetail?.Director}</strong>{" "} 
          </Col>
        </Row>
        <Row style={{ margin: 20 }}>
          <Col> Writer:</Col>
          <Col>
          {" "} 
          <strong>{movieDetail?.Writer}</strong>{" "} </Col>
        </Row>
        
        <Row style={{ margin: 20 }}>
          <Col> Cast and Crew:</Col>
          <Col>
          {" "} 
          <strong>{movieDetail?.Actors}</strong>{" "} </Col>
        </Row>
        <Row style ={{ margin: 20}}>
          <Col span={12}>
            <Statistic
            title="Likes"
            value={movieDetail?.imdbVotes}
            prefix={<LikeOutlined/>}
            />
            </Col>
            <Col span={12}>
            <Statistic
            title="BoxOffice"
            value={movieDetail?.BoxOffice}
        
            />
            </Col>
        </Row>
      </div>
    </Col>
  </Row>
</Modal>
</>
 );
};
export default MovieCard;

