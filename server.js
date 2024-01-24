const express = require("express");
const server = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require("path");
const PORT = process.env.PORT || 3500;
const cors = require("cors");
const http = require("http");
//const serverless = require("serverless-http")
const auth = require("./src/middlewares/auth.middleware");

//import all routes
const usersRoutes = require("./src/routes/user.route");
const consigneRoutes = require("./src/routes/consigne.route");
const professionRoutes = require("./src/routes/profession.routes");
const motifRoutes = require("./src/routes/motif.route");
const lieuRoutes = require("./src/routes/lieu.route");
const extLieuRoutes = require("./src/routes/extLieu.route");
const structureRoute = require("./src/routes/centre.routes");
const practitiensRoutes = require("./src/routes/practitioner.route");
const extPractitiensRoutes = require("./src/routes/extPraticiens.route");
const patientRoutes = require("./src/routes/patient.route");
const specialitiesRoutes = require("./src/routes/specialty.route");
const extSpecialitiesRoutes = require("./src/routes/extSpeciality.route");
const rightsRoutes = require("./src/routes/right.route");
const groupsRoutes = require("./src/routes/group.route");
const civilitiesRoutes = require("./src/routes/civility.route");
const appointmentRoutes = require("./src/routes/appointment.route");
const extUserToutes = require("./src/routes/extUser.route");
const notificationRoutes = require("./src/routes/notification.route");

const connectDB = require("./src/loaders/mongoose");
const { startServer } = require("./src/helpers");
const { verifyToken } = require("./src/routes/verifyToken");
const { disconnectUser } = require("./src/routes/disconnectUser");

const app = http.createServer(server, {
  cors: {
    origin: "*",
  },
});
const io = require("./socket").initialize(app);

io.on("connection", (socket) => {
  setTimeout(() => {
    socket.emit("connected", "user connected");
    console.log("event emitted");
  }, 2000);

  socket.on("setUserId", (userId) => {
    console.log("romm id: ", userId);
    socket.join(userId);
    socket.emit("saved", "user saved");
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

require("dotenv").config();

server.use(
  cors({
    origin: ["http://10.10.90.10:3000", "https://clinique-france-frontend.vercel.app", "http://10.10.90.60:3000", "http://10.10.90.5:3000", "http://10.10.90.16:3000", "http://10.10.90.60:3000", "http://10.10.90.11:3000", "http://10.10.90.60:3000", "http://10.10.90.17:3000","http://192.168.43.35:3000", "http://localhost:3000", "http://10.10.90.239:3000"],
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
    preflightContinue: true,
    allowedHeaders: ['Authorization', 'Content-Type', "Access-Control-Allow-Origin"],
    credentials: true,
  })
);
server.use(express.static("public"));
server.use(cookieParser());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});
server.use((req, res, next) => {
  req.io = io;
  next();
});

// routes
server.use("/users", usersRoutes);
server.use("/ext_users", extUserToutes);
server.use("/motif", motifRoutes);
server.use("/consignes", consigneRoutes);
server.use("/practitiens", practitiensRoutes);
server.use("/ext_practitiens", extPractitiensRoutes);
server.use("/ext_specialites", extSpecialitiesRoutes);
server.use("/specialites", specialitiesRoutes);
server.use("/patients", patientRoutes);
server.use("/structure", structureRoute);
server.use("/lieu", lieuRoutes);
server.use("/ext_lieu", extLieuRoutes);
server.use("/droits", rightsRoutes);
server.use("/groupes", groupsRoutes);
server.use("/civilites", civilitiesRoutes);
server.use("/profession", professionRoutes);
server.use("/appointments", appointmentRoutes);
server.use("/notifications", notificationRoutes);
server.post("/verifyToken", verifyToken);
server.post("/disconnect", disconnectUser);
server.get("/checkVersion", (req, res) => {
  res.send(new Date().toLocaleDateString());
});
startServer({ connectDB, server: app, startServer, PORT });


