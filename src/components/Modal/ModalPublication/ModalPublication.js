import React from "react";
import "./ModalPublication.scss";
import { Modal, Grid } from "semantic-ui-react";
import CommentForm from "./CommentForm";
import Comments from "./Comment";
import Actions from "./Actions";

export default function ModalPublication(props) {
  const { show, setShowModal, publication } = props;
  const onClose = () => setShowModal(false);

  return (
    <Modal
      open={show}
      onClose={onClose}
      className="modal-publication"
      closeIcon>
      <Grid>
        <Grid.Column
          className="modal-publication__left"
          width={10}
          style={{
            backgroundImage: `url(${publication.file})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        <Grid.Column className="modal-publication__right" width={6}>
          <Comments publication={publication} />
          <Actions publication={publication} />
          <CommentForm publication={publication} />
        </Grid.Column>
      </Grid>
    </Modal>
  );
}
