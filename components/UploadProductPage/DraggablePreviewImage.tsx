import React, { useState } from "react";
import {
    DragDropContext,
    Droppable,
    Draggable,
    OnDragEndResponder,
} from "react-beautiful-dnd";
import { GetUploadProduct } from "../../context/UploadProductContext";
import CloseIcon from "../CustomSvg/CloseIcon";

type Item = {
    id: string;
    content: string;
};

// fake data generator
const getItems = (count: number) =>
    Array.from({ length: count }, (v, k) => k).map((k) => ({
        id: `item-${k}`,
        content: `item ${k}`,
    }));

// a little function to help us with reordering the result
const reorder = (list: Item[], startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
};

const grid = 8;

const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,

    // change background colour if dragging
    background: isDragging ? "lightgreen" : "grey",

    // styles we need to apply on draggables
    ...draggableStyle,
});

const getListStyle = (isDraggingOver: boolean) => ({
    background: isDraggingOver ? "lightblue" : "lightgrey",
    padding: grid,
    width: 250,
});

function DraggablePreviewImage() {
    const [state, dispatch] = GetUploadProduct();
    const files = state.files.images;
    const [items, setItem] = useState(getItems(10));

    const onDragEnd: OnDragEndResponder = (result) => {
        if (!result.destination) {
            return;
        }
        const startIndex = result.source.index;
        const endIndex = result.destination.index;
        const newFiles = files;
        const [removed] = newFiles.splice(startIndex, 1);
        newFiles.splice(endIndex, 0, removed);

        dispatch({
            type: "files.images",
            value: newFiles,
        });
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
                {(dProvided) => (
                    <div
                        {...dProvided.droppableProps}
                        className="flex flex-col gap-2"
                        ref={dProvided.innerRef}
                    >
                        {files.map((v, i) => (
                            <Draggable
                                key={"drag_" + i}
                                draggableId={`key-${i}`}
                                index={i}
                            >
                                {(provided) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        className="bg-white w-full flex items-center justify-between border p-[8px_16px] border-[#E5E7EB] rounded-md "
                                    >
                                        <div className="flex items-center w-[calc(100%-24px)] gap-4">
                                            <img
                                                className="w-6 h-6"
                                                src="/icon/lines.svg"
                                                alt=""
                                            />
                                            <img
                                                src={
                                                    typeof v === "string"
                                                        ? v
                                                        : URL.createObjectURL(v)
                                                }
                                                className="w-6 h-6 bg-[#F1F0FF]"
                                                alt=""
                                            />
                                            <div className="text-sm max-w-[calc(100%-80px)] truncate  leading-[22px] text-[#6B7280]">
                                                {typeof v === "string"
                                                    ? v
                                                    : v.name}
                                            </div>
                                        </div>
                                        <div
                                            className="cursor-pointer"
                                            onClick={() => {
                                                dispatch({
                                                    type: "files.images",
                                                    value: files.filter(
                                                        (_, index) =>
                                                            index !== i
                                                    ),
                                                });
                                            }}
                                        >
                                            <CloseIcon
                                                stroke="#6B7280"
                                                color="#6B7280"
                                            />
                                        </div>
                                    </div>

                                    // <div
                                    // ref={provided.innerRef}
                                    // {...provided.draggableProps}
                                    // {...provided.dragHandleProps}
                                    // style={getItemStyle(
                                    //     snapshot.isDragging,
                                    //     provided.draggableProps.style
                                    // )}
                                    // >
                                    //     {index}
                                    // </div>
                                )}
                            </Draggable>
                        ))}
                        {dProvided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
}

export default DraggablePreviewImage;
