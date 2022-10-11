import React from 'react'
import { ApplicationError } from '../errors/ApplicationError'
import { HttpRequestError } from '../errors/HttpRequestError'
import { auth } from '../firebase/FirebaseAuth'
import { RoomApi } from '../networks/api/room-api'
/**
 * @return {[Room]}
 */
export default function useRooms() {
    /**
     * Set define variable room
     */
    const [rooms, setRooms] = React.useState()
    const [info, setInfo] = React.useState()


    // Update state
    const updateState = (state) => {
        setRooms(state.rooms)
        setInfo({
            roomEmpty: state.roomEmpty,
            roomUsed: state.roomUsed,
            maxFloor: state.maxFloor
        })
    }

    /**
     * Fetch(Effect) data all rooms with check in data
     */
    React.useEffect(async () => {
        // Fetch get Id token
        auth.currentUser.getIdToken().then((idToken) => {
            // Get all room with check in data
            RoomApi.getRoomWithCheckInData(idToken).then(async (response) => {
                if (response.ok) {
                    /**
                     * @type {[Room]}
                     */
                    const json = await response.json()
                    /**
                     * @type {Map<number, [Room]>}
                     */
                    const colRooms = new Map()
                    let roomEmpty = roomUsed = maxFloor = 0
                    json.forEach((room) => {
                        // Update maximum floor
                        if (room.atFloor > maxFloor) maxFloor = room.atFloor
                        // Check state room is available
                        if (room.isAvailable) { roomUsed++ } else { roomEmpty++ }
                        /**
                         * @type {[Room]}
                         */
                        if (!colRooms.get(room.atFloor)) colRooms.set(room.atFloor, [])
                        colRooms.get(room.atFloor).push(room)
                    })
                    updateState({ roomEmpty: roomEmpty, roomUsed: roomUsed, maxFloor: maxFloor, rooms: colRooms })
                } else {
                    /**
                     * Throw HttpRequestError
                     */
                    throw new HttpRequestError('Failure call api! HttpRequestError')
                }
            })
                .catch((error) => {
                    throw new ApplicationError(error.message)
                })
        })
            .catch((error) => {
                /**
                 * Throw new Application Error
                 */
                throw new ApplicationError(error.message)
            })
    }, [])
    return {
        rooms: rooms,
        info: info
    }
}
