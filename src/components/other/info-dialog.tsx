import {Button, Dialog, Flex, Text, TextArea, TextField} from "@radix-ui/themes";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.tsx";
import {Calendar as CalendarIcon} from "lucide-react";
import {Calendar} from "@/components/ui/calendar.tsx";
import {useState} from "react";

function InfoDialog(dialogProps : {
  addItemToList : (taskName: string, taskDescription: string, taskDate: Date) => null,
  dialogDetails : {
    triggerButton : {
      text : string,

    }
  }
}, ) {
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskDate, setTaskDate] = useState<Date>(new Date());

  return (<>
    <Dialog.Root>
      <Dialog.Trigger>
        <Button>
          Add a task
        </Button>
      </Dialog.Trigger>

      <Dialog.Content>
        <Dialog.Title>Add Task</Dialog.Title>
        <Dialog.Description>
          Enter description of a task
        </Dialog.Description>

        <Flex direction="column" gap="3" my="2">
          <label>
            <Text>Task name</Text>
            <TextField.Root value={taskName} onChange={event => {setTaskName(event.target.value)}} placeholder="Your task name"></TextField.Root>
          </label>
          <label>
            <Text>Task description</Text>
            <TextArea placeholder={"Enter a description"}  value={taskDescription} onChange={event => {setTaskDescription(event.target.value)}}/>
          </label>
          <label>
            <Flex gap="2">
              <TextField.Root value={taskDate.toDateString()} disabled={true} size="2"/>
              <Popover>
                <PopoverTrigger>
                  <Button variant="ghost">
                    <CalendarIcon/>
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <Calendar
                    mode="single"
                    selected={taskDate}
                    onSelect={date => date ? setTaskDate(date) : null}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </Flex>
          </label>
        </Flex>

        <Flex mt="4" gap="2" justify="end">
          <Dialog.Close>
            <Button variant="soft">Close</Button>
          </Dialog.Close>
          <Dialog.Close>
            <Button onClick={() => {
              dialogProps.addItemToList(taskName, taskDescription, taskDate)
            }}>Add</Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  </>)
}

export default InfoDialog;
