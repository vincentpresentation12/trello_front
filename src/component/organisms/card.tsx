import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardBody,
  Flex,
  Heading,
  Link,
  Select,
  Stack,
  Text,
} from "@chakra-ui/react";
import { AisTrash } from "@akkurateio/icons";
interface IProps {
  status: any;
  handleChangeStatus: any;
  handleDelete: any;
}

const CardComponent = ({
  status,
  handleChangeStatus,
  handleDelete,
}: IProps) => {
  const [idStatus, setIdStatus] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/api/statuses/")
      .then((res) => res.json())
      .then((data) => setIdStatus(data));
  }, []);

  return (
    <Flex>
      {status.map((etat: any, idx: number) => (
        <Card width={"full"} key={idx}>
          <CardBody>
            <Stack mt="2" spacing="3">
              <Heading textAlign={"center"} size="md">
                {etat.name}
              </Heading>
              {etat.tasks.map((task: any, idx: number) => (
                <Box key={idx}>
                  <Flex w={"full"} borderWidth={1} rounded={"base"}>
                    <Link
                      w={"full"}
                      cursor={"pointer"}
                      href={`/task/${task.id}`}
                    >
                      {etat.name === "FINISHED" ? (
                        <Text w={"full"} textDecoration={"line-through"}>
                          {task.title}
                        </Text>
                      ) : (
                        <Text w={"full"}>{task.title}</Text>
                      )}
                    </Link>
                    {etat.name === "FINISHED" ? (
                      <AisTrash
                        cursor={"pointer"}
                        onClick={() => handleDelete(task.id)}
                      />
                    ) : (
                      <Select placeholder={etat.name} key={idx}>
                        {idStatus.map((status: any, idx: number) => (
                          <option
                            key={idx}
                            value={status.id}
                            onClick={() =>
                              handleChangeStatus(status.id, task.id)
                            }
                          >
                            {status.name}
                          </option>
                        ))}
                      </Select>
                    )}
                  </Flex>
                </Box>
              ))}
            </Stack>
          </CardBody>
        </Card>
      ))}
    </Flex>
  );
};

export default CardComponent;
