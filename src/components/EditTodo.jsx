
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input, Select, SelectItem} from "@nextui-org/react";

import { LuFileEdit } from "react-icons/lu";
export default function EditTodo() {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const animals = [
    {label: "BackLog", value: "backLog"},
    {label: "Todo", value: "todo",},
    {label: "Doing", value: "doing",},
    {label: "Complete", value: "complete",},
  ]
  return (
    <>
      <Button variant="light"  onPress={onOpen} isIconOnly>     <LuFileEdit className="text-xl text-green-500 cursor-pointer"/></Button>
      <Modal isDismissable={false} isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Edit Your Todo Here</ModalHeader>
              <ModalBody className="grid grid-cols-1 items-center gap-4 my-5">
              <Input variant="faded" size="sm" type="text" label="Edit Todos" />
              <Select 
        label="Set Todo As" variant="faded"
        className="w-full" size="sm" 
      >
        {animals.map((animal) => (
          <SelectItem key={animal.value} value={animal.value}>
            {animal.label}
          </SelectItem>
        ))}
      </Select>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button className="bg-green-600 text-white" onPress={onClose}>
                  Add Todo
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
