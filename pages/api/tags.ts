// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";
import data from "../../data/index.json";
import _ from "lodash";

type Data = {
    message: string;
};

const DATA_FILE_PATH = path.join(path.resolve("data"), "index.json");

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    if (req.method === "POST") {
        const { value } = req.body;
        data.tags.push(value);
        data.tags = _.uniq(data.tags);
        fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(data));
        res.status(200).json({ message: "John Doe" });
    }
}
