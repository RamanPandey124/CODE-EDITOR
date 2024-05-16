// src/mocks/handlers.js
import { http, HttpResponse } from 'msw';
const url = "http://localhost:1100"
let teamData = {
    success: true,
    msg: 'Team data!',
    team: {
        _id: '661ba24e9e14e01a163ac3cb',
        TeamName: 'webs',
        users: [
            { _id: '6618e4944c2f76e98eff72cb', name: 'raman pandey' },
            { _id: '6618f99ace88b3353e00d6b5', name: 'harsh' },
            { _id: '661d302c3a7665bb5c5c769f', name: 'ankit' }

        ],
        code: ''
    },
    user: {
        _id: '6618e4944c2f76e98eff72cb',
        name: 'raman pandey',
        email: 'raman@gmail.com',
        password: '$2b$10$My1sT7yJcaRW2CLz8flboe0kdUy2jtMpnhxCmf9MCDJunqggP8GKC',
        __v: 0,
        teams: [
            '661ba24e9e14e01a163ac3cb', '661ba2899e14e01a163ac3d0', '66308e993fe5a76b867bae90',
            '66308ecd3fe5a76b867baea8', '6630e73bce450098f5190b63'

        ]
    }
}
let containerData = {
    success: true,
    msg: 'task Contain',
    containers: [
        {
            _id: '662b3f2f4cb9d0a784020502',
            user: 'raman pandey',
            tasks: [
                {
                    _id: '66433cad502e89a2d28849da',
                    title: 'taskB',
                    index: 0,
                    createdAt: '2024-05-14T10:27:57.958Z',
                    updatedAt: '2024-05-16T06:57:59.699Z',
                    __v: 0

                }

            ]
        },
        {
            _id: '662b3f2f4cb9d0a784020506',
            user: 'harsh',
            tasks: [
                {
                    _id: '66433cac502e89a2d28849d6',
                    title: 'task C',
                    index: 0,
                    createdAt: '2024-05-14T10:27:56.070Z',
                    updatedAt: '2024-05-16T06:57:57.923Z',
                    __v: 0

                },
                {
                    _id: '66433cb0502e89a2d28849de',
                    title: 'task A',
                    index: 0,
                    createdAt: '2024-05-14T10:28:00.116Z',
                    updatedAt: '2024-05-16T06:57:57.912Z',
                    __v: 0

                }

            ]
        },
        {
            _id: '662b3f2f4cb9d0a78402050a',
            user: 'ankit',
            tasks: [
                {
                    _id: '66433cb1502e89a2d28849e2',
                    title: 'task D',
                    index: 1,
                    createdAt: '2024-05-14T10:28:01.843Z',
                    updatedAt: '2024-05-14T12:06:03.497Z',
                    __v: 0

                }

            ]
        }
    ]
}

export const handlers = [
    http.get(`${url}/socket.io/*`, () => {
        return HttpResponse.json({ success: true });
    }),
    http.get(`${url}/team/get-team`, () => {
        return HttpResponse.json(teamData);
    }),
    http.post(`${url}/team/get-taskContainer`, () => {
        return HttpResponse.json(containerData);
    }),
];






