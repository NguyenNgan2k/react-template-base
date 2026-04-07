import { AnimatePresence, motion } from "framer-motion";
import Modal from "react-modal";
import Button from "../common/Button";

const customStyles = {
  content: {
    top: "50%",
    transform: "translateY(-50%)",
    bottom: "auto",
    left: "calc( 50% - 250px )",
    height: "auto",
    width: "500px",
    padding: "0",
    borderWidth: "0px",
    overflow: "inherit",
    borderRadius: "16px",
    background: "transparent",
  },
};

export default function AnnounceModal({
  handleConfirm,
  isOpen,
  title,
  content,
  type,
}: {
  handleConfirm: () => void;
  isOpen: boolean;
  title: string;
  content: string;
  type?: string;
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <Modal
          isOpen={isOpen}
          contentLabel="Thông báo"
          ariaHideApp={false}
          style={customStyles}
          closeTimeoutMS={25} // phải trùng với thời gian transition
          overlayClassName="ReactModal__Overlay"
          className="ReactModal__Content"
        >
          <motion.div
            key="announce-modal"
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.1, ease: "easeOut" }}
            className="flex flex-col gap-4 bg-cover bg-no-repeat bg-center rounded-xl"
          >
            <div className="flex flex-col gap-4 p-4 rounded-xl border border-border w-full bg-background-primary">
              <div className="p-6 rounded-xl shadow-md text-center">
                <h2
                  className={`text-lg font-semibold mb-4 ${type === "success" ? "text-green-500" : "text-red-500"
                    } `}
                >
                  {title}
                </h2>
                <p className="text-sm mb-6 text-text-base">{content}</p>
                <Button onClick={handleConfirm} variant="primary" fullWidth>
                  Xác nhận
                </Button>
              </div>
            </div>
          </motion.div>
        </Modal>
      )}
    </AnimatePresence>
  );
}
