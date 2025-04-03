import React, { use, useEffect } from "react";
import PayPalButtonComponent from "./Paypal";

interface PayPalButtonProps {
  showModal: boolean;
  onSuccess: (details: any, data: any) => void;
  onFailure: () => void;
  amount: number;
}

const Modal: React.FC<PayPalButtonProps> = ({ showModal, onSuccess, onFailure, amount}) => {
  function setShowModal(value: boolean) {
    showModal = value;
    if (!value) {
      onFailure(); // Send failure back to the parent component
    }
  }

  function handleSuccess() {
    console.log("Success");
    onSuccess("Payment", amount); // Send success back to the parent component
  }
  
  function handleClose() {
    setShowModal(false);
  }

  useEffect(() => {
    setShowModal(showModal);
  }, [showModal]);
  return (
    <>
      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            onClick={() => setShowModal(false)}
          >
            <div className="relative w-full h-full flex items-center justify-center">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg w-full max-w-lg bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Payment</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={handleClose}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <div className="max-h-64 overflow-y-auto">
                    <PayPalButtonComponent amount={0.1} onSuccess={handleSuccess} />
                  </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={handleClose}
                  >
                    Cancel
                  </button>
                 
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};

export default Modal;