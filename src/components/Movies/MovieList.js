import React, { useState, useEffect } from "react";
import { Row, Pagination, Input, Spin } from "antd";
import MovieCard from "./MovieCard";
import axios from "axios";
const baseUrl = `https://www.omdbapi.com/?`;
const OMDbAPI = `http://www.omdbapi.com/?i=tt3896198&apikey=13aa1db5`;
const { Search } = Input;


const MoviesList = () => {
const [movies, setMovies] = useState([]);
const [totalPage, setTotalPage] = useState();
const [currentPage, setCurrentPage] = useState(1);
const [loading, setLoading] = useState(false);
const [searchText, setSearchText] = useState("fast");


const fetchMoviesList = (page, searchValue) => {
setLoading(true);
axios
.get(`${baseUrl}s=${searchValue}&apikey=13aa1db5&page=${page}`)
.then((response) => {
setMovies(response?.data?.Search || []);
setTotalPage(response?.data?.totalResults);
})
.catch((error) => {
console.log(error, "error");
})
.then(() => {
setLoading(false);
});
};
console.log("Here I am");

const handlePageChange = (value) => {
setCurrentPage(value);
};
const onSearch = (Value) => {
setSearchText(Value);
};


useEffect(() => {
fetchMoviesList(currentPage, searchText);
}, [currentPage, searchText]);


return (
<Spin spinning={loading} delay={200}>


<Row>
<Pagination
defaultCurrent={currentPage}
total={totalPage}
onChange={handlePageChange}
showSizeChanger = {false}
/>


<Search
placeholder = "input search text"
onSearch={onSearch}
defaultvalue={searchText}
enterButton
style={{ width: "400px", marginLeft: "200px"}}
/>
</Row>
<Row>
{movies &&
movies?.length &&
movies.map((movie) => (<div key={movie?.imdbID}>
<MovieCard movie={movie} />
</div>
))}
</Row> 
</Spin>


);
};
export default MoviesList;



