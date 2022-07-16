import dotenv from 'dotenv';
import express from 'express';
dotenv.config();

import './core/db';

import { passport } from "./core/passport";
import users from "./routers/users";
import auth from "./routers/auth";
import members from "./routers/members";
import church from "./routers/church";
import post from "./routers/post";
import schedule from "./routers/schedule";
import prayer from "./routers/prayer";
import friends from "./routers/friends";
import upload from "./routers/upload";
import albums from "./routers/albums";
import comment from "./routers/comment";

const app = express();

app.use(express.json());
app.use(passport.initialize());

app.use('/auth', auth);
app.use('/users', users);
app.use('/members', members);
app.use('/churches', church);
app.use('/posts', post);
app.use('/schedules', schedule);
app.use('/prayers', prayer);
app.use('/friends', friends);
app.use('/upload', upload);
app.use('/albums', albums);
app.use('/comments', comment);

app.listen(process.env.PORT || 8080, (): void => {
  console.log(`SERVER RUNNING!`);
});
