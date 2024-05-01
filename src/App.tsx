import { useContext, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { ModalContext } from "./context/ModalContext";
import { useForm } from "react-hook-form";

function App() {
  const modalCtx = useContext(ModalContext);
  const [data, setData] = useState<string>("");
  const form = useForm({
    defaultValues: {
      searchValue: "",
    },
  });

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

  const MyForm = () => (
    <Form onSubmit={form.handleSubmit((data) => setData(JSON.stringify(data)))}>
      <Form.Group>
        <Form.Label>Label</Form.Label>
        <input {...form.register("searchValue")} />
        <Button type="submit">Search</Button>
      </Form.Group>
    </Form>
  );

  return (
    <div>
      <Button onClick={handleCreateModal}>Create Modal</Button>
      {data && <p>{data}</p>}
    </div>
  );
}

export default App;
