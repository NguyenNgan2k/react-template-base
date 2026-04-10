import clsx from "clsx";
import React from "react";
import ReactDOM from 'react-dom';
import { IoClose } from "react-icons/io5";
interface ModalProps {
  children: React.ReactNode;
  onClose: Function;
  title?: any;
  classContent?: string;
}

const ModalLayout: React.FC<ModalProps> = (props) => {
  const { children, onClose, title, classContent } = props
  return ReactDOM.createPortal(
    <div className="modal-overlay">
      <div className={clsx("modal-content", classContent)}>
        <div className="flex">
          <div className='text-base font-semibold w-full'>{title}</div>
          <IoClose className="w-6 h-6 ml-auto cursor-pointer" onClick={() => onClose()} />
        </div>
        {children}
      </div>
    </div>,
    document.getElementById('modal-root')!
  )
}

export default ModalLayout