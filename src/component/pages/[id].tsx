import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Divider,
  Flex,
  Input,
  Link,
  Text,
  Textarea,
} from "@chakra-ui/react";

interface Task {
  id: number;
  title: string;
  description: string;
  statusId: number;
}

const TaskDetails = () => {
  const [task, setTask] = useState<Task>({} as Task);
  const [open, setOpen] = useState(false);
  const params = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const redirect = useNavigate();
  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const handleDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  useEffect(() => {
    fetch(`http://localhost:3000/api/tasks/${params.id}`)
      .then((res) => res.json())
      .then((data) => setTask(data));
  }, []);

  const handleUpdate = () => {
    const task = { title, description };
    console.log(task);
    fetch(`http://localhost:3000/api/tasks/${params.id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(task),
    }).then((res) => res.json());
    setTitle("");
    setDescription("");
    setOpen(!open);
    redirect("/");
  };
  return (
    <>
      <Link href={"/"}>Retour</Link>
      <Flex w={"full"} m={5}>
        <Box
          textAlign={"center"}
          borderWidth={1}
          mr={5}
          rounded={"base"}
          minH={200}
          w={"full"}
        >
          {!open ? (
            <>
              <Text fontSize={"20px"} fontWeight={"bold"}>
                {task.title}
              </Text>
              <Divider />
              <Text mt={5}>{task.description}</Text>
            </>
          ) : (
            <>
              <Input
                placeholder={"entrer un nouveau titre"}
                value={title}
                onChange={handleTitle}
              ></Input>
              <Textarea
                placeholder={"entrer une nouvelle description"}
                maxHeight={150}
                mt={5}
                value={description}
                onChange={handleDescription}
              ></Textarea>
            </>
          )}
        </Box>
        {!open ? (
          <Button colorScheme={"orange"} mr={25} onClick={() => setOpen(!open)}>
            Editer
          </Button>
        ) : (
          <>
            <Button colorScheme={"green"} mr={25} onClick={handleUpdate}>
              Valider
            </Button>
            <Button mr={25} colorScheme={"red"} onClick={() => setOpen(!open)}>
              Annuler
            </Button>
          </>
        )}
      </Flex>
    </>
  );
};

export default TaskDetails;
