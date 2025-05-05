import "@radix-ui/themes/styles.css";
// import * as React from "react"
import {useEffect, useState} from "react";
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
  Grid as GridLayout, Tooltip
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
  task_status : boolean,
  task_checked : boolean
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
      task_status : false,
      task_checked : false,
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

  const updateItemContent = (item_id: number, update : {task_name? : string, task_description? : string, task_status? : boolean, task_checked? : boolean}) => {
    const tempList : TaskItem[] = myList
      .map(item => {
          if (item.task_id == item_id) return {...item,
            task_name : update.task_name ? update.task_name : item.task_name,
            task_description : update.task_description ? update.task_description : item.task_description,
            task_status : update.task_status != null ? update.task_status : item.task_status,
            task_checked: update.task_checked!= null ? update.task_checked : item.task_checked
          }
          else return item
        }
      );

    setMyList(tempList)
  }

  const selectAllItem = () => {
    const tempList : TaskItem[] = myList
      .map(item => {
        return {...item,
            task_checked: true
        }}
      );

    setMyList(tempList)
  }

  const unselectAllItem = () => {
    const tempList : TaskItem[] = myList
      .map(item => {
        return {...item,
          task_checked: false
        }}
      );

    setMyList(tempList)
  }

  const deleteAllSelectedItems = () => {
    let index : number = 0;
    const newList : TaskItem[] = [];
    for (let i = 0; i < myList.length; i++){
      if (!myList[i].task_checked){
        newList.push({
          ...myList[i],
          task_id : index
        });
        index++;
      }
    }
    setMyList(newList);
  }

  const doneAllItem = () => {
    const tempList : TaskItem[] = myList
      .map(item => { return {...item,
            task_status : item.task_checked
          }
        }
      );

    setMyList(tempList)
  }

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

        <h2 className="font-medium">To-do List</h2>
        <Flex gap="2" mx="5">
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

          <Button onClick={() => {selectAllItem()}} disabled={myList.filter(item => !item.task_checked).length == 0}>
            Select all
          </Button>

          <Button onClick={() => {unselectAllItem()}} disabled={myList.filter(item => item.task_checked).length == 0}>
            Deselect all
          </Button>

          <Button onClick={() => {doneAllItem()}} disabled={myList.filter(item => item.task_checked).length == 0}>
            Mark all selected as Done
          </Button>


          <Dialog.Root>
            <Dialog.Trigger>
              <Button disabled={myList.filter(item => item.task_checked).length == 0}>
                Delete all selected
              </Button>
            </Dialog.Trigger>

            <Dialog.Content>
              <Dialog.Content>
                <Dialog.Title>Delete all selected task?</Dialog.Title>
                <Flex justify="end">
                  <Dialog.Close>
                    <Button variant="soft">Cancel</Button>
                  </Dialog.Close>
                  <Dialog.Close>
                    <Button color="red" onClick={() => {
                      deleteAllSelectedItems()
                    }}>Confirm</Button>
                  </Dialog.Close>
                </Flex>
              </Dialog.Content>
            </Dialog.Content>
          </Dialog.Root>

        </Flex>


        <div>
          <div className="p-4">
            <ScrollArea className="h-1/2 w-80 rounded-md border">
              {myList.map(item => (
                <>
                  <div key={item.task_id} className="text-sm p-2">
                    <Flex gap="4" width="auto" justify="between" align="center" >
                      <Checkbox size="3" checked={item.task_checked} onClick={() => {updateItemContent(item.task_id, {task_checked: !item.task_checked})}}/>
                      <Tooltip content={item.task_description}>
                        <Box width="200px">
                            <Text>{item.task_name}</Text>
                        </Box>
                      </Tooltip>
                      <Box width="200px">
                        <Text>{item.task_date.toDateString()}</Text>
                      </Box>

                      <Box width="200px">
                        {item.task_status
                          ? <Button color="green" onClick={() => {updateItemContent(item.task_id, {task_status: false})}}>Finished</Button>
                          : <Button color="yellow" onClick={() => {updateItemContent(item.task_id, {task_status: true})}}>Pending</Button> }
                      </Box>

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

                        <Dialog.Root>
                          <Dialog.Trigger>
                            <Button variant="ghost" onClick={() => {
                              setTaskName(item.task_name);
                              setTaskDescription(item.task_description);
                            }}>
                              <Pencil/>
                            </Button>
                          </Dialog.Trigger>

                          <Dialog.Content>
                            <Dialog.Title>Edit Task</Dialog.Title>
                            <Dialog.Description>
                              Edit details of task
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
                            </Flex>

                            <Flex mt="4" gap="2" justify="end">
                              <Dialog.Close>
                                <Button variant="soft">Close</Button>
                              </Dialog.Close>
                              <Dialog.Close>
                                <Button onClick={() => {
                                  updateItemContent(item.task_id, {task_name: taskName, task_description: taskDescription});
                                  setTaskName("");
                                  setTaskDescription("");
                                }}>Save</Button>
                              </Dialog.Close>
                            </Flex>
                          </Dialog.Content>
                        </Dialog.Root>
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
