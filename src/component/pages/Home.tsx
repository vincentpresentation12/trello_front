import React, { useEffect, useState } from "react";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import CardComponent from "../organisms/card";
import AddTask from "../modal/modalAddTask";
import { AisAdd } from "@akkurateio/icons";

const Home = () => {
  const [status, setStatus] = useState([]);
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [valider, setValider] = useState(false);
  const [idStatus, setIdStatus] = useState<number>();
  const [yes, setYes] = useState<boolean>(false);

  const handleStatus = (IdStatus: number, id: number) => {
    fetch(`http://localhost:3000/api/tasks/status/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        statusId: IdStatus,
      }),
    }).then((res) => setYes(!yes));
  };

  useEffect(() => {
    fetch("http://localhost:3000/api/statuses/tasks")
      .then((res) => res.json())
      .then((data) => setStatus(data));
  }, [yes, open, valider]);

  const handleDelete = (id: number) => {
    fetch(`http://localhost:3000/api/tasks/${id}`, {
      method: "DELETE",
    }).then((res) => setYes(!yes));
  };

  const handleDeleteStatus = (id: number) => {
    setOpenDelete(!openDelete);
    setIdStatus(id);
  };

  useEffect(() => {
    if (valider) {
      setOpenDelete(!openDelete);
      fetch(`http://localhost:3000/api/statuses/${idStatus}`, {
        method: "DELETE",
      }).then((res) => {
        setValider(!valider);
        setYes(!yes);
      });
    }
  }, [valider]);

  return (
    <Box>
      <Box textAlign={"right"} mr={5} mb={10}>
        <Button variant={"unstyled"} onClick={() => setOpen(!open)}>
          <AisAdd />
          Cree une tache
        </Button>
      </Box>
      <AddTask open={open} setOpen={setOpen} />
      <CardComponent
        status={status}
        handleDelete={handleDelete}
        handleChangeStatus={handleStatus}
        handleDeleteStatus={handleDeleteStatus}
      />
      <Modal isOpen={openDelete} onClose={() => setOpenDelete(!openDelete)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            Êtes-vous sur de vouloir supprimer cette colonne ?
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Alert status="warning">
              <AlertIcon />
              <AlertTitle mr={2}>Attention !</AlertTitle>
              <AlertDescription>
                Cette action est irréversible et supprimera toutes les tâches de
                cette colonne.
              </AlertDescription>
            </Alert>
          </ModalBody>
          <ModalFooter w={"full"}>
            <Flex w={"full"} justifyContent={"space-between"}>
              <Button
                colorScheme={"red"}
                onClick={() => setOpenDelete(!openDelete)}
              >
                Annuler
              </Button>
              <Button
                colorScheme={"green"}
                onClick={() => setValider(!valider)}
              >
                Continuer
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Home;
