import { Server } from 'socket.io';
import { updateUserSocketId } from './services/user.services.js';
import { updateCaptainSocketId, updateCaptainLocation, deleteCaptainLocation, findCaptainByEmail, findNearbyCaptains } from './services/captain.services.js';

let io;

export const initializeSocket = (server) => {
    io = new Server(server, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST'],
        }
    });

    io.on('connection', (socket) => {
        socket.on('join', async(data) => {
            const {userEmail, userType} = data;

            console.log(`User ${userEmail} joined as ${userType}`);
    
            if(userType === 'user') {
                await updateUserSocketId(userEmail, socket.id);
            } else if(userType === 'captain') {
                await updateCaptainSocketId(userEmail, socket.id);
            }
        });

        socket.on('captain-update-location', async(data) => {
            const {latitude, longitude, email} = data;
            if(!latitude || !longitude || !email) {
                return;
            }

            const captain = await findCaptainByEmail(email);
            if(!captain) {
                return;
            }

            await updateCaptainLocation(captain.id, latitude, longitude);
        });

        socket.on('captain-go-offline', async(email) => {
            if(!email) {
                return;
            }
            const captain = await findCaptainByEmail(email);
            await deleteCaptainLocation(captain.id);
        });

        socket.on('disconnect', () => {
            console.log('Client disconnected');
        });
    });
}

export const sendMessageToSocketId = (socketId, message) => {
    if(io) {       
        io.to(socketId).emit(`${message.type}`, message.payload);
    } else {
        console.log('Socket.io is not initialized.');
    }
}