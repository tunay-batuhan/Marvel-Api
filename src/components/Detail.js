import { Modal } from "react-bootstrap";
import { useEffect, useState } from "react";
export default function Detail({ show, setShow, id }) {
  const [data, setData] = useState([]);
  const handleClose = () => setShow(false);
  var comicsList = [];
  useEffect(() => {
    if (!data) return false;
    const fetchData = async () => {
      if (!id) return false;
      const res = await fetch(
        `https://gateway.marvel.com:443/v1/public/characters/${id}?apikey=a2042f848e28769ed64271ba30efa0e3`
      );
      const data = await res.json();
      setData(data.data.results[0]);
    };
    fetchData();
  }, [id]);

  if (data.id) {
    comicsList = data.comics.items.sort((a, b) => {
      const getYearsNumber = (item) => {
        let text = item.name;
        let getIndex = text.indexOf("(");
        let years = text.substring(getIndex + 1, getIndex + 5);
        return parseInt(years);
      };
      return getYearsNumber(b) - getYearsNumber(a);
    });
  }
  return (
    <Modal show={show} onHide={handleClose} size="xl" centered>
      {data.id ? (
        <div className="primary-modal">
          <div className="modal-img">
            <img
              src={data.thumbnail.path + "/portrait_uncanny.jpg"}
              className="img-fluid"
            ></img>
          </div>
          <div className="modal-body">
            <h2 className="title">{data.name}</h2>
            <div className="comics-side">
              <h2 className="comics-title">Movies</h2>
              <ul className="comics-list">
                {comicsList.map((item, index) => {
                  if (index < 10) {
                    return (
                      <li className="comics-list-item" key={index}>
                        {index +
                          1 +
                          "-) " +
                          item.name.slice(0, item.name.indexOf(")") + 1)}
                      </li>
                    );
                  }
                })}
              </ul>
            </div>
          </div>
        </div>
      ) : (
        "loading"
      )}
    </Modal>
  );
}
