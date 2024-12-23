import stylef from './ImageModal.module.css';
import Modal from 'react-modal';
import { FcLike } from 'react-icons/fc';
import { MdPerson } from 'react-icons/md';
import { CiCalendarDate } from 'react-icons/ci';
import { ImageModalProps } from './ImageModal.types'

export default function ImageModal({ image, isOpen, onRequestClose, style }: ImageModalProps) {
  if (!image) return null;
  return (
    <Modal appElement={document.getElementById('root') as HTMLElement} isOpen={isOpen} onRequestClose={onRequestClose} style={style}>
      <div className={stylef.wrapper}>
        <div className={stylef.modal}>
          <img src={image.urls.regular} alt={image.alt_description || 'Image'} />
          <ul className={stylef.list}>
            <li>
              <p>
                <MdPerson /> Author: {image.user.name}
              </p>
            </li>
            <li>
              <p>
                <CiCalendarDate /> Added: {image.created_at.slice(0, 10)}
              </p>
            </li>
            <li>
              <p>
                <FcLike /> Likes: {image.likes}
              </p>
            </li>
          </ul>
        </div>
      </div>
    </Modal>
  );
}
