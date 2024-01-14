// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";
import data from "../../data/index.json";
import _ from "lodash";

import nextConnect from "next-connect";
import multer from "multer";

const DATA_FILE_PATH = path.join(path.resolve("data"), "index.json");
const DESTINATION_PATH = path.join(path.resolve("public"), "softwares");

const upload = multer({
    storage: multer.diskStorage({
        destination: DESTINATION_PATH,
        filename: (req, file, cb) =>
            cb(null, req.query.filename + path.extname(file.originalname)),
    }),
});

const apiRoute = nextConnect<NextApiRequest, NextApiResponse>({
    onError(error, req, res) {
        res.status(501).json({
            error: `Sorry something Happened! ${error.message}`,
        });
    },
    onNoMatch(req, res) {
        res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
    },
});

apiRoute.use(upload.single("img"));

apiRoute.post((req, res) => {
    const value = req.query.filename as string;
    data.softwares.push(value);
    data.softwares = _.uniq(data.softwares);
    fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(data));
    res.status(200).json({ data: "success" });
});

export default apiRoute;

export const config = {
    api: {
        bodyParser: false, // Disallow body parsing, consume as stream
    },
};
