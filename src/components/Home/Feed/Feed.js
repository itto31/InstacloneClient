import React, { useState, useEffect } from "react";
import "./Feed.scss";
import { Image, Icon } from "semantic-ui-react";
import { map, size } from "lodash";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_PUBLICATIONS_FOLLOWEDS } from "../../../gql/publication";
import ImageNotFound from "../../../assets/png/avatar.png";
import Action from "../../Modal/ModalPublication/Actions";
import CommetForm from "../../Modal/ModalPublication/CommentForm";
import ModalPublication from "../../Modal/ModalPublication";
import SinFoto from "../../../assets/png/sin-fotos.png";
export default function Feed() {
  const { data, loading, startPolling, stopPolling } = useQuery(
    GET_PUBLICATIONS_FOLLOWEDS
  );
  const [showModal, setShowModal] = useState(false);
  const [publicationSelect, setPublicationSelect] = useState(null);

  const openPublication = (publication) => {
    setPublicationSelect(publication);
    setShowModal(true);
  };

  useEffect(() => {
    startPolling(1000);
    return () => {
      stopPolling();
    };
  }, [startPolling, stopPolling]);

  if (loading) return null;
  const { getPublicationFolloweds } = data;
  return (
    <>
      <div className="feed">
        {map(getPublicationFolloweds, (publication, index) => (
          <div key={index} className="feed__box">
            <Link to={`/${publication.idUser.username}`}>
              <div className="feed__box-user">
                <Image
                  src={publication.idUser.avatar || ImageNotFound}
                  avatar
                />
                <span>{publication.idUser.username}</span>
              </div>
            </Link>
            <div
              className="feed__box-photo"
              style={{ backgroundImage: `url("${publication.file}")` }}
            />
            <div className="feed__box-options">
              <div className="feed__box-options-action">
                <Action publication={publication} />
              </div>
              <div className="feed__box-options-comments">
                <Icon
                  name="comment outline"
                  onClick={() => openPublication(publication)}
                />
              </div>
            </div>
            <div className="feed__box-form">
              <CommetForm publication={publication} />
            </div>
          </div>
        ))}

        {!loading && size(getPublicationFolloweds) === 0 && (
          <div className="feed__not-found">
            <h3 className="feed__not-found__title ">No hay publicaciones</h3>
            <p>Sigue a personas para ver sus publicaciones en este momento.</p>
            <Image src={SinFoto} className="sinfoto" />
          </div>
        )}
      </div>
      {showModal && (
        <ModalPublication
          show={showModal}
          setShowModal={setShowModal}
          publication={publicationSelect}
        />
      )}
    </>
  );
}
