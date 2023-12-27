import { MdEditDocument } from "react-icons/md";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input, Select, SelectItem, Tooltip} from "@nextui-org/react";

export default function EditTodo() {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const animals = [
    {label: "BackLog", value: "backLog"},
    {label: "Todo", value: "todo",},
    {label: "Doing", value: "doing",},
    {label: "Complete", value: "complete",},
  ]
  const prioritys = [
    {label: "Low", value: "low"},
    {label: "Medium", value: "medium",},
    {label: "High", value: "high",},
    
  ]
  return (
    <>
     <Tooltip content="Edit">
     <Button variant="light"  onPress={onOpen} isIconOnly><MdEditDocument className="text-xl text-green-600 cursor-pointer"/></Button>
    </Tooltip>
     
      <Modal className="max-w-3xl w-full" isDismissable={false} isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 ">Create Your Todo Here</ModalHeader>
              <ModalBody className="grid grid-cols-1 md:grid-cols-2 items-center gap-5 my-5">
              <Input variant="faded" size="sm" type="text" label="Add task" />
              <Input variant="faded" size="sm" type="text" label="Assigned to" />
              <Input variant="faded" size="sm" type="text" label='Assignee' />
              <Input variant="faded" labelPlacement="inside" size="sm" type="date" placeholder="Due Date" label='Due Date' />
           
              <Select 
        label="Set Priority" variant="faded"
        className="w-full" size="sm" 
      >
        {prioritys.map((animal) => (
          <SelectItem key={animal.value} value={animal.value}>
            {animal.label}
          </SelectItem>
        ))}
      </Select>
              <Select 
        label="Set Task As" variant="faded"
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
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button className="bg-green-600 text-white" onPress={onClose}>
                  Update Task
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
