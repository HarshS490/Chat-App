import React, { useEffect, useState } from "react";
import Modal from "../Modal";
import { Button } from "../ui/button";
import { X } from "lucide-react";
import { link } from "fs";

type Props = {
  isOpen?: boolean;
  handleClose: () => void;
  fileList?:File[];
  inputRef:React.RefObject<HTMLInputElement>
};

const ImagePreviewModal = ({ isOpen, handleClose,inputRef}: Props) => {
  const [fileList,setFileList] = useState<FileList>();

  useEffect(()=>{
    if(inputRef?.current){
      if(inputRef.current.files && inputRef.current.files.length>0 ){
        setFileList(inputRef.current.files);
      }
    }
  },[inputRef])
  return (
    <div>
      <Modal isOpen={isOpen} handleClose={handleClose}>
        <div className="w-96 bg-white rounded-xl p-3">
          <div className="flex justify-between items-center">
            <h1 className="text-lg font-medium">Send Image</h1>
            <Button type="button" variant={'ghost'} className="rounded-full" size={'icon'}>
              <X></X>
            </Button>
          </div>
          <div>

          </div>
          
        </div>
      </Modal>
    </div>
  );
};

export default ImagePreviewModal;
