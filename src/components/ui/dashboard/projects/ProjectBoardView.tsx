"use client";

import React, { useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import { MoreVertical, Plus } from "lucide-react";
import { BoardState, ColumnId, Task } from "@/src/types/kanban";

// Mock data directly matching your uploaded UI screenshot design structure
const initialBoardData: BoardState = {
  columns: {
    todo: {
      id: "todo",
      title: "Todo",
      dotColor: "bg-neutral-500",
      tasks: [
        {
          id: "task-1",
          title: "Set up CI/CD pipeline",
          priority: "Medium",
          tags: ["DevOps"],
          assigneeInitials: "MR",
        },
        {
          id: "task-2",
          title: "Write unit tests for auth module",
          priority: "High",
          tags: ["Testing"],
          assigneeInitials: "SC",
        },
        {
          id: "task-3",
          title: "Create onboarding flow design",
          priority: "Low",
          tags: ["Design"],
          assigneeInitials: "AP",
        },
      ],
    },
    "in-progress": {
      id: "in-progress",
      title: "In Progress",
      dotColor: "bg-blue-500",
      tasks: [
        {
          id: "task-4",
          title: "Implement SSO integration",
          priority: "High",
          tags: ["Auth", "Backend"],
          assigneeInitials: "JD",
        },
        {
          id: "task-5",
          title: "Refactor database queries",
          priority: "Medium",
          tags: ["Performance"],
          assigneeInitials: "JL",
        },
      ],
    },
    done: {
      id: "done",
      title: "Done",
      dotColor: "bg-teal-500",
      tasks: [
        {
          id: "task-6",
          title: "API rate limiting",
          priority: "High",
          tags: ["Backend"],
          assigneeInitials: "MR",
        },
        {
          id: "task-7",
          title: "Fix auth redirect loop",
          priority: "Medium",
          tags: ["Bug"],
          assigneeInitials: "SC",
        },
        {
          id: "task-8",
          title: "Update design tokens",
          priority: "Low",
          tags: ["Design"],
          assigneeInitials: "AP",
        },
      ],
    },
  },
};

export default function KanbanBoard() {
  const [board, setBoard] = useState<BoardState>(initialBoardData);

  // ⚡ EMPTY TRIGGER FUNCTION EXECUTED UPON CROSS-COLUMN TRANSITIONS
  const onTaskMovedToNewColumn = (
    taskId: string,
    sourceColumn: ColumnId,
    destinationColumn: ColumnId,
  ) => {
    console.log(`🚀 Task Move Hook Triggered!`);
    console.log(
      `Task ID: ${taskId} shifted from [${sourceColumn}] over to [${destinationColumn}]`,
    );

    // Add your backend fetch API calls or state syncing triggers here!
  };

  const handleDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result;

    // Dropped outside a valid context container drop-zone
    if (!destination) return;

    // Dropped in the exact same position it started
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    const sourceColId = source.droppableId as ColumnId;
    const destColId = destination.droppableId as ColumnId;

    const sourceColumn = board.columns[sourceColId];
    const destColumn = board.columns[destColId];

    const sourceTasks = [...sourceColumn.tasks];
    const destTasks = [...destColumn.tasks];

    // Remove the task from its starting layout coordinates arrays list
    const [movedTask] = sourceTasks.splice(source.index, 1);

    if (sourceColId === destColId) {
      // 🔄 Rearranging items within the exact same list tier array
      sourceTasks.splice(destination.index, 0, movedTask);
      setBoard({
        ...board,
        columns: {
          ...board.columns,
          [sourceColId]: { ...sourceColumn, tasks: sourceTasks },
        },
      });
    } else {
      // 🔀 Shifting across distinct task container type rows columns
      destTasks.splice(destination.index, 0, movedTask);
      setBoard({
        ...board,
        columns: {
          ...board.columns,
          [sourceColId]: { ...sourceColumn, tasks: sourceTasks },
          [destColId]: { ...destColumn, tasks: destTasks },
        },
      });

      // Execute your specific business hook lifecycle logic functions array pipeline here!
      onTaskMovedToNewColumn(draggableId, sourceColId, destColId);
    }
  };

  // Helper utility tailwind styling maps to match your color profiles exactly
  const getPriorityStyles = (priority: Task["priority"]) => {
    switch (priority) {
      case "High":
        return "bg-red-500/10 text-red-500 border border-red-500/20";
      case "Medium":
        return "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20";
      case "Low":
        return "bg-neutral-500/20 text-neutral-400 border border-neutral-700/30";
    }
  };

  return (
    <div className="min-h-screen bg-[#05070B] text-neutral-200 mt-5 font-sans selection:bg-primary/30">
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto items-start">
          {(Object.keys(board.columns) as ColumnId[]).map((colKey) => {
            const column = board.columns[colKey];

            return (
              <div key={column.id} className="flex flex-col gap-y-4">
                {/* Column Headers Layout Element Grid Header Section */}
                <div className="flex items-center justify-between px-1 text-sm select-none">
                  <div className="flex items-center gap-x-2.5 font-semibold text-neutral-300">
                    <span
                      className={`w-2.5 h-2.5 rounded-full ${column.dotColor}`}
                    />
                    <span>{column.title}</span>
                    <span className="bg-neutral-800/80 text-neutral-400 font-medium px-2 py-0.5 rounded-full text-xs">
                      {column.tasks.length}
                    </span>
                  </div>
                  <div className="flex items-center gap-x-2 text-neutral-500">
                    <button className="hover:text-neutral-300 transition-colors cursor-pointer p-1 rounded-md hover:bg-neutral-900">
                      <Plus size={16} />
                    </button>
                  </div>
                </div>

                {/* Droppable Drop Container Shell Area Group Grid */}
                <Droppable droppableId={column.id}>
                  {(provided, snapshot) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className={`flex flex-col gap-y-3 p-2 rounded-xl min-h-[500px] transition-colors duration-200 
                        ${snapshot.isDraggingOver ? "bg-neutral-900/20 border border-dashed border-neutral-800/60" : "bg-transparent"}`}
                    >
                      {column.tasks.map((task, index) => (
                        /* Draggable Individual Task Elements Wrapper */
                        <Draggable
                          key={task.id}
                          draggableId={task.id}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={{ ...provided.draggableProps.style }}
                              className={`bg-[#0C1015]/90 border border-neutral-800/80 rounded-xl p-4 flex flex-col gap-y-3 group select-none transition-all duration-150
                                ${snapshot.isDragging ? "shadow-2xl border-neutral-700 bg-[#0C1015] scale-[1.02] ring-1 ring-neutral-700/50" : "hover:border-neutral-700"}`}
                            >
                              {/* Card Meta Row Block Items */}
                              <div className="flex items-center justify-between">
                                <span
                                  className={`text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider ${getPriorityStyles(task.priority)}`}
                                >
                                  {task.priority}
                                </span>
                                <button className="text-neutral-600 group-hover:text-neutral-400 transition-colors opacity-0 group-hover:opacity-100 p-0.5 rounded hover:bg-neutral-800">
                                  <MoreVertical size={14} />
                                </button>
                              </div>

                              {/* Task Primary Content Typography Block */}
                              <h3 className="text-[14px] font-medium text-neutral-200 tracking-wide leading-snug">
                                {task.title}
                              </h3>

                              {/* Footer Configuration Labels And Assignees Initial Elements Container Row */}
                              <div className="flex items-center justify-between pt-1">
                                <div className="flex flex-wrap gap-1.5">
                                  {task.tags.map((tag, i) => (
                                    <span
                                      key={i}
                                      className="bg-neutral-800/70 border border-neutral-800 text-neutral-400 px-2.5 py-0.5 rounded-lg text-[11px] font-medium"
                                    >
                                      {tag}
                                    </span>
                                  ))}
                                </div>
                                <div className="w-6 h-6 text-[10px] font-semibold rounded-full flex items-center justify-center text-primary bg-primary/10 border border-primary/20 select-none">
                                  {task.assigneeInitials}
                                </div>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            );
          })}
        </div>
      </DragDropContext>
    </div>
  );
}
