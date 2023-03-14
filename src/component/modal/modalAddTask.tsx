import React, { useState } from "react";
import {
  Button,
  Flex,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
} from "@chakra-ui/react";

interface IProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}
const AddTask = ({ open, setOpen }: IProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const handleDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  const handleClose = () => {
    setOpen(!open);
  };

  const handleSubmit = () => {
    const task = { title, description };
    fetch("http://localhost:3000/api/tasks", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(task),
    });
    setTitle("");
    setDescription("");
    setOpen(!open);
  };
  return (
    <Modal size={"lg"} isOpen={open} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Ajouter une tache</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormLabel>Titre</FormLabel>
          <Input value={title} onChange={handleTitle}></Input>
          <FormLabel>Description</FormLabel>
          <Textarea
            mb={15}
            minH={300}
            value={description}
            onChange={handleDescription}
          ></Textarea>
        </ModalBody>
        <ModalFooter w={"full"}>
          <Flex w={"full"} justifyContent={"space-between"}>
            <Button colorScheme={"red"} onClick={handleClose}>
              Annuler
            </Button>
            <Button colorScheme={"green"} onClick={handleSubmit}>
              Enregistrer
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddTask;
