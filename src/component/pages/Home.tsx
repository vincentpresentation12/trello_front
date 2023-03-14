import React, { useEffect, useState } from "react";
import { Box, Button, Input, Textarea } from "@chakra-ui/react";
import CardComponent from "../organisms/card";

const Home = () => {
  const [status, setStatus] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [yes, setYes] = useState<boolean>(false);

  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const handleDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

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
  }, [yes]);
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
  };
  const handleDelete = (id: number) => {
    fetch(`http://localhost:3000/api/tasks/${id}`, {
      method: "DELETE",
    }).then((res) => setYes(!yes));
  };

  return (
    <Box>
      <h1>hello</h1>
      <Input value={title} onChange={handleTitle}></Input>
      <Textarea value={description} onChange={handleDescription}></Textarea>
      <Button onClick={handleSubmit}>Submit</Button>
      <CardComponent
        status={status}
        handleDelete={handleDelete}
        handleChangeStatus={handleStatus}
      />
    </Box>
  );
};

export default Home;
