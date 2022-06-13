import React, { useState } from 'react'
import "./PreviewPublication.scss"
import {Image} from 'semantic-ui-react'
import ModalPublication from '../../Modal/ModalPublication';

export default function PreviewPublication(props) {
    const {publication} = props;
    const [showModal, setShowModal] = useState(false)
    return (
    <>
    <div className='preview-publication' onClick={() => setShowModal(true)}>
        <Image className='preview-publication__image' src={publication.file}/>
    </div>
    <ModalPublication publication={publication} show={showModal} setShowModal={setShowModal}/>
    </>
  )
}
