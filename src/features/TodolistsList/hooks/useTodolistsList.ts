import { useAppDispatch, useAppSelector } from '../../../App/store'
import { useCallback, useEffect } from 'react'
import { addTaskTC, deleteTaskTC, updateTaskTC } from '../tasks-reducer'
import {
	addTodolistTC,
	changeTodolistFilterAC,
	changeTodolistTitleTC,
	deleteTodolistTC,
	fetchTodolistsTC,
	FilterValuesType
} from '../todolists-reducer'
import { TaskStatuses } from '../../../todolists-api'

export const useTodolistsList = (demo: boolean = false) => {
	const todolists = useAppSelector((state) => state.todolists)
	const tasks = useAppSelector((state) => state.tasks)
	const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
	const dispatch = useAppDispatch()

	useEffect(() => {
		if (demo || !isLoggedIn) {
			return
		}
		dispatch(fetchTodolistsTC())
	}, [])

	const removeTask = useCallback(
		(taskId: string, todolistId: string) => {
			dispatch(deleteTaskTC(todolistId, taskId))
		},
		[dispatch]
	)

	const addTask = useCallback(
		(title: string, todolistId: string) => {
			dispatch(addTaskTC(todolistId, title))
		},
		[dispatch]
	)

	const changeTaskStatus = useCallback(
		(taskId: string, status: TaskStatuses, todolistId: string) => {
			dispatch(updateTaskTC(todolistId, taskId, { status }))
		},
		[dispatch]
	)

	const changeTaskTitle = useCallback(
		(taskId: string, title: string, todolistId: string) => {
			dispatch(updateTaskTC(todolistId, taskId, { title }))
		},
		[dispatch]
	)

	const changeFilter = useCallback(
		(value: FilterValuesType, todolistId: string) => {
			dispatch(changeTodolistFilterAC(todolistId, value))
		},
		[dispatch]
	)

	const removeTodolist = useCallback(
		(todolistId: string) => {
			dispatch(deleteTodolistTC(todolistId))
		},
		[dispatch]
	)

	const changeTodolistTitle = useCallback(
		(todolistId: string, title: string) => {
			dispatch(changeTodolistTitleTC(todolistId, title))
		},
		[dispatch]
	)

	const addTodolist = useCallback(
		(title: string) => {
			dispatch(addTodolistTC(title))
		},
		[dispatch]
	)

	return {
		todolists,
		tasks,
		removeTask,
		changeFilter,
		addTask,
		changeTaskStatus,
		removeTodolist,
		changeTaskTitle,
		changeTodolistTitle,
		addTodolist,
		isLoggedIn
	}
}
