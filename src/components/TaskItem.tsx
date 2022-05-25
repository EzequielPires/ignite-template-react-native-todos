import React, { useEffect, useRef, useState } from "react";
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Icon from 'react-native-vector-icons/Feather';
import trashIcon from '../assets/icons/trash/trash.png';
import editIcon from '../assets/icons/edit/edit.png';
import { Task } from "./TasksList";

type EditTaskArgs = {
    taskId: number;
    taskNewTitle: string;
}
interface TaskItemProps {
    task: Task;
    toggleTaskDone: (id: number) => void;
    removeTask: (id: number) => void;
    editTask: ({ taskId, taskNewTitle }: EditTaskArgs) => void;
}

export function TaskItem({ task, toggleTaskDone, removeTask, editTask }: TaskItemProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [taskNewTitleValue, setTaskNewTitleValue] = useState(task.title);
    const textInputRef = useRef<TextInput>(null);


    function handleStartEditing() {
        setIsEditing(true);
    }
    function handleCancelEditing() {
        setTaskNewTitleValue(task.title);
        setIsEditing(false);
    }
    function handleSubmitEditing() {
        editTask({ taskId: task.id, taskNewTitle: taskNewTitleValue });
        setIsEditing(false);
    }

    useEffect(() => {
        if (textInputRef.current) {
            if (isEditing) {
                textInputRef.current.focus();
            } else {
                textInputRef.current.blur();
            }
        }
    }, [isEditing]);

    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <View>
                <TouchableOpacity
                    activeOpacity={0.7}
                    style={styles.taskButton}
                    onPress={() => toggleTaskDone(task.id)}
                >
                    <View
                        style={!task.done ? styles.taskMarker : styles.taskMarkerDone}
                    >
                        {task.done && (
                            <Icon
                                name="check"
                                size={12}
                                color="#FFF"
                            />
                        )}
                    </View>

                    {/* <Text
                        style={!task.done ? styles.taskText : styles.taskTextDone}
                    >
                        {task.title}
                    </Text> */}

                    <TextInput
                        value={taskNewTitleValue}
                        onChangeText={setTaskNewTitleValue}
                        editable={isEditing}
                        onSubmitEditing={handleSubmitEditing}
                        style={!task.done ? styles.taskText : styles.taskTextDone}
                        ref={textInputRef}
                    />
                </TouchableOpacity>
            </View>
            <View style={{flexDirection: 'row'}}>
                {isEditing ? (
                    <TouchableOpacity
                        style={{ paddingHorizontal: 24 }}
                        onPress={handleCancelEditing}
                    >
                        <Icon
                            name="x"
                            size={24}
                            color="#b2b2b2"
                        />
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity
                        style={{ paddingHorizontal: 24 }}
                        onPress={handleStartEditing}
                    >
                        <Image source={editIcon} />
                    </TouchableOpacity>
                )}
                <View />
                <TouchableOpacity
                    style={{ paddingHorizontal: 24 }}
                    onPress={() => removeTask(task.id)}
                    disabled={isEditing}
                >
                    <Image source={trashIcon} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    taskButton: {
        flex: 1,
        paddingHorizontal: 24,
        paddingVertical: 15,
        marginBottom: 4,
        borderRadius: 4,
        flexDirection: 'row',
        alignItems: 'center'
    },
    taskMarker: {
        height: 16,
        width: 16,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#B2B2B2',
        marginRight: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    taskText: {
        color: '#666',
        fontFamily: 'Inter-Medium'
    },
    taskMarkerDone: {
        height: 16,
        width: 16,
        borderRadius: 4,
        backgroundColor: '#1DB863',
        marginRight: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    taskTextDone: {
        color: '#1DB863',
        textDecorationLine: 'line-through',
        fontFamily: 'Inter-Medium'
    }
})