import { Engine } from "@thirdweb-dev/engine";
import { NextApiRequest, NextApiResponse } from "next";
import { TOKEN_CONTRACT_ADDRESS } from "../../constants/constants";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if(req.method !== 'POST') {
        return res.status(405).json({message: 'Method not allowed'});
    }

    const {
        TW_ENGINE_URL,
        TW_ACCESS_TOKEN,
        TW_BACKEND_WALLET,
    } = process.env;

    try {
        if(
            !TW_ENGINE_URL ||
            !TW_ACCESS_TOKEN ||
            !TW_BACKEND_WALLET
        ) {
            throw new Error('Missing environment variables');
        }

        const { address } = req.body;

        const engine = new Engine({
            url: TW_ENGINE_URL as string,
            accessToken: TW_ACCESS_TOKEN as string,
        });

        const response = await engine.erc20.transfer(
            "mumbai",
            TOKEN_CONTRACT_ADDRESS,
            TW_BACKEND_WALLET as string,
            {
                toAddress: address,
                amount: "1",
            }
        );

        res.status(200).json(response);

    } catch (error: any) {
        res.status(500).json({message: error.message});
    }
};

export default handler;