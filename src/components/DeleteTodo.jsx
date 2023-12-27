
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure,} from "@nextui-org/react";
import { TiDocumentDelete } from "react-icons/ti";
export default function DeleteTodo() {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  return (
    <>
      <Button variant="light"  onPress={onOpen} isIconOnly>     <TiDocumentDelete className="text-2xl text-red-400 cursor-pointer"/></Button>
      <Modal isDismissable={false} isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Delete Todo</ModalHeader>
              <ModalBody className="flex flex-col justify-center items-center">
              <h2 className="text-xl font-semibold text-red-500">Are you sure want to delete your Todo?</h2>
              <p className="text-slate-400 text-sm text-center">once you delete it can not be retrieved so be careful when you delete your todos</p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                No
                </Button>
                <Button color="primary" onPress={onClose}>
                 Yes
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
