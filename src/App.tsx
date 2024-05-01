import { useContext, useRef } from "react";
import { Button, Form } from "react-bootstrap";
import { ModalContext } from "./context/ModalContext";

function App() {
  const modalCtx = useContext(ModalContext);
  const searchInput = useRef<HTMLInputElement>(null);

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(searchInput.current?.value);
    /* 
    ! aqui deberias hacer la llamada a la Backend
    */
  };

  const handleCreateModal = () => {
    modalCtx!.createModal({
      title: "Modal Title",
      cancelButtonText: "Cancel",
      confirmButtonText: "Confirm",
      content: <MyForm />,
      handleConfirm: () => {
        console.log("Confirm");
        modalCtx?.handleClose();
      },
    });
    modalCtx!.handleOpen();
  };

  const MyForm = () => {
    return (
      <Form onSubmit={handleOnSubmit}>
        <Form.Group>
          <Form.Label>Label</Form.Label>
          <input ref={searchInput} />
          <Button type="submit">Search</Button>
        </Form.Group>
      </Form>
    );
  };

  return (
    <div>
      <Button onClick={handleCreateModal}>Create Modal</Button>
    </div>
  );
}

export default App;
