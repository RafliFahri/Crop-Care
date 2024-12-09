import Hapi from "@hapi/hapi";

(async () => {
    const server = Hapi.server({
        port: 80,
        host: '0.0.0.0', // Please edit to 0.0.0.0 before deploy
        routes: {
            cors: {
                origin: ["*"]
            } // Please edit to frontend app url before deploying
        }
    });
    server.route([
        {
            path: "/cassava",
            method: "POST",
            handler: (request, h) => {
                console.log("cassava")
            }
            // handler: cassavaController, // Please add some
            // options: {
            //     payload: {
            //         multipart: "allow",
            //         allow: "multipart/form-data"
            //     }
            // }
        }
    ]);

    await server.start();
    console.log(`Server start at ${server.info.uri}`);
})();
