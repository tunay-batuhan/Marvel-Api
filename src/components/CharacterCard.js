import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Detail from "./Detail";
export default function CharacterCard() {
  const [data, setData] = useState([]);
  const [dataLimit, setDataLimit] = useState(20);
  const [show, setShow] = useState(false);
  const [idValue, setIdValue] = useState();

  const baseUrl = "https://gateway.marvel.com:443/v1/public/";
  const apikey = "a2042f848e28769ed64271ba30efa0e3";

  const fetchMoreData = () => {
    setTimeout(() => {
      setDataLimit(dataLimit + 8);
    }, 500);
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `${baseUrl}characters?limit=${dataLimit}&apikey=${apikey}`
      );
      const data = await res.json();
      setData(data.data.results);
    };
    fetchData();
  }, [dataLimit]);

  const openModel = (e) => {
    setIdValue(e.target.id);
    setTimeout(() => {
      setShow(true);
    }, "200");
  };
  return (
    <div className="container section">
      <InfiniteScroll
        dataLength={dataLimit}
        next={fetchMoreData}
        hasMore="true"
        loader={<h4>Loading...</h4>}
      >
        <div className="row">
          {data.map((item, index) => {
            return (
              <div
                className="col-12 col-sm-6 col-md-4 col-lg-3 mb-5"
                key={index}
              >
                <div className="primary-card" onClick={openModel}>
                  <div className="card-img">
                    <img
                      className="img-fluid"
                      alt="character"
                      src={item.thumbnail.path + "/portrait_incredible.jpg"}
                      id={item.id}
                    ></img>
                  </div>
                  <div className="card-content">
                    <p className="title">{item.name}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </InfiniteScroll>
      <Detail show={show} setShow={setShow} id={idValue}></Detail>
    </div>
  );
}
