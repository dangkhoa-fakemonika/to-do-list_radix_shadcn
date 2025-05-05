import "@radix-ui/themes/styles.css";
// import * as React from "react"
import {useState} from "react";
import {
  Button,
  Checkbox,
  Dialog,
  Flex,
  ScrollArea,
  Separator,
  Theme,
  Text,
  TextField,
  TextArea,
  Box,
  Grid as GridLayout
} from "@radix-ui/themes";
import {Menu, Pencil, Trash} from "lucide-react";
import { Calendar as CalendarIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"


interface TaskItem{
  task_id : number,
  task_name : string,
  task_description : string,
  task_date : Date,
  task_status : boolean
}

function MainMenu () {
  const [myList, setMyList] = useState<TaskItem[]>([]);
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskDate, setTaskDate] = useState<Date>(new Date());

  const addItemToList = () => {
    const tempList : TaskItem[] = myList;
    tempList.push({
      task_id : tempList.length,
      task_name : taskName,
      task_description : taskDescription,
      task_date : taskDate,
      task_status : false
    })

    setMyList(tempList);
  }

  const removeItemFromList = (item_id : number) => {
    const tempList : TaskItem[] = myList
      .filter(item => item.task_id != item_id)
      .map(item => {
        if (item.task_id > item_id) return {...item, task_id : item.task_id - 1}
        else return item
      }
    );

    setMyList(tempList)
  }

  const updateItemContent = (item_id: number, update : {task_name : string | null, task_description : string | null, task_status : boolean | null}) => {
    const tempList : TaskItem[] = myList
      .map(item => {
          if (item.task_id == item_id) return {...item,
            task_name : update.task_name ? update.task_name : item.task_name,
            task_description : update.task_description ? update.task_description : item.task_description,
            task_status : update.task_status ? update.task_status : item.task_status,
          }
          else return item
        }
      );

    setMyList(tempList)
  }

  // const myExampleList = Array.from({ length: 10 }).map(
  //   (_, i, a) => `Item ${a.length - i}`
  // );

  return (
    <div>
      <Theme
        appearance="light"
        accentColor="sky"
        grayColor="gray"
        panelBackground="solid"
        scaling="100%"
        radius="full"
      >
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
                  addItemToList()
                  setTaskName("");
                  setTaskDescription("");
                  setTaskDate(new Date());
                }}>Add</Button>
              </Dialog.Close>
            </Flex>
          </Dialog.Content>
        </Dialog.Root>


        <div>
          <div className="p-4">
            <h2 className="font-medium">To-do List</h2>
            <ScrollArea className="h-1/2 w-80 rounded-md border">
              {myList.map(item => (
                <>
                  <div key={item.task_id} className="text-sm p-2">
                    <Flex gap="4" width="auto" justify="between" align="center">
                      <Checkbox/>

                      <Text>{item.task_name}</Text>
                      <Text>{item.task_date.toDateString()}</Text>

                      {item.task_status ? <Button color="green">Finished</Button> : <Button color="yellow">Pending</Button> }

                      <Flex gap="2">
                        <Dialog.Root>
                          <Dialog.Trigger>
                            <Button variant="ghost">
                              <Trash />
                            </Button>
                          </Dialog.Trigger>

                          <Dialog.Content>
                            <Dialog.Content>
                              <Dialog.Title>Delete this task?</Dialog.Title>
                              <Flex justify="end">
                                <Button variant="soft">Cancel</Button>
                                <Button color="red" onClick={() => {
                                  removeItemFromList(item.task_id);
                                }}>Confirm</Button>
                              </Flex>
                            </Dialog.Content>
                          </Dialog.Content>
                        </Dialog.Root>
                        <Pencil />
                      </Flex>

                    </Flex>
                  </div>
                  <Separator orientation="horizontal" size="4"/>
                </>
              ))}
              </ScrollArea>
          </div>
        </div>
      </Theme>


    </div>
  )
}

export default MainMenu
