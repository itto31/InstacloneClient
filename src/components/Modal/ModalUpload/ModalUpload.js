import React,{useCallback, useState} from 'react'
import "./ModalUpload.scss"
import {Modal, Icon, Button, Dimmer, Loader} from 'semantic-ui-react'
import {useDropzone} from "react-dropzone"
import {useMutation} from "@apollo/client"
import {PUBLISH} from "../../../gql/publication"
import swat from "sweetalert2" 



export default function ModalUpload(props) {
    const {show, setShow} = props
    const [fileUpload, setFileUpload] = useState(null);
    const [isLoading, setIsLoading] = useState(false)
    const [publish] = useMutation(PUBLISH);
    


    const onDrop = useCallback((acceptefile) => {
        const file = acceptefile[0]
        setFileUpload({
            type:"image",
            file,
            preview: URL.createObjectURL(file)
        })
       
    });

    const{getInputProps, getRootProps} = useDropzone({
        accept: "image/jpeg, image/png",
        noKeyboard: true,
        multiple: false,
        onDrop,
    });
    
    const onClose= ()=>{
        setIsLoading(false);
        setFileUpload(null);
        setShow(false);
        
    }
    
    const onPublish= async () =>{
       try {
        setIsLoading(true);
        const result = await  publish({
            variables: {
                file: fileUpload.file
            },
        });
        const {data} = result;
        if(!data.publish.status){
            swat({
                title: "Error",
                text: data.publish.message,
                icon: "error",
                button: "Aceptar",
            })
        isLoading(false);
        }else {
            onClose();
        }
       } catch (error) {
           console.log(error)
       }
    }
  return (
    <Modal size='small' open={show} onClose={onClose} className='modal-upload'>
        <div {...getRootProps()} className='dropzone' style={fileUpload && {border:0}}>
            
            {!fileUpload && (
            <> 
            <Icon name='cloud upload'/>
            <p>Arrastra tu foto que quieras publicar</p>
            </>
            )} 
            <input {...getInputProps()}/>
        </div>

        {fileUpload?.type === "image" &&(
            <div className='image' style={{backgroundImage: `url("${fileUpload.preview}")`}}></div>
        )}

        {fileUpload && (
            <Button className='btn-upload btn-action' onClick={onPublish}>
                Publicar
            </Button>
        )}
        {isLoading && (
            <Dimmer active className="publishing">
                <Loader/>
                <p>Publicando</p>
            </Dimmer>
        )}
    </Modal>
  )
}
