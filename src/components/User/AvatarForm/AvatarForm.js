import React, { useCallback, useState } from "react";
import "./AvatarForm.scss";
import { Button } from "semantic-ui-react";
import { useDropzone } from "react-dropzone";
import { useMutation } from "@apollo/client";
import { UPDATE_AVATAR, GET_USER, DELETE_AVATAR } from "../../../gql/user";
import Swal from "sweetalert2";

export default function AvatarForm(props) {
  const { setShowModal, auth } = props;
  const [loading, setLoading] = useState(false);

  const [updateAvatar] = useMutation(UPDATE_AVATAR, {
    update(cache, { data: { updateAvatar } }) {
      const { getUser } = cache.readQuery({
        query: GET_USER,
        variables: { username: auth.username },
      });
      cache.writeQuery({
        query: GET_USER,
        variables: { username: auth.username },
        data: {
          getUser: { ...getUser, avatar: updateAvatar.urlAvatar },
        },
      });
    },
  });

  const [deleteAvatar] = useMutation(DELETE_AVATAR, {
    update(cache) {
      const { getUser } = cache.readQuery({
        query: GET_USER,
        variables: { username: auth.username },
      });
      cache.writeQuery({
        query: GET_USER,
        variables: { username: auth.username },
        data: {
          getUser: { ...getUser, avatar: "" },
        },
      });
    },
  });

  const onDrop = useCallback(
    async (acceptedfile) => {
      const file = acceptedfile[0];
      try {
        setLoading(true);
        const result = await updateAvatar({ variables: { file } });
        const { data } = result;
        if (!data.updateAvatar.status) {
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: data.updateAvatar.message,
            showConfirmButton: false,
            timer: 1500,
          });
          setLoading(false);
        } else {
          setLoading(false);
          setShowModal(false);
        }
      } catch (error) {
        console.log(error, "error");
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/jpeg, image/png",
    noKeyboard: true,
    multiple: false,
    onDrop,
  });

  const onDeleteAvatar = async () => {
    try {
      const result = await deleteAvatar();
      const { data } = result;

      if (!data.deleteAvatar) {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: data.deleteAvatar.message,
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        setShowModal(false);
      }
    } catch (error) {
      console.log(error, "error");
    }
  };

  return (
    <div className="avatar-form">
      <Button {...getRootProps()} loading={loading}>
        Cargar una foto
      </Button>
      <Button onClick={onDeleteAvatar}>Eliminar foto actual</Button>
      <Button onClick={() => setShowModal(false)}>Cancelar </Button>
      <input {...getInputProps()} />
    </div>
  );
}
